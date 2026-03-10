import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

type CsvRow = {
  title?: string;
  link?: string;
  link_type?: string;
  icons?: string;
  description?: string;
  description_short?: string;
  project_type?: string;
  variant?: string;
  minecraft?: string;
  recent?: string;
  tags?: string;
};

type ImportProject = {
  name: string;
  description: string;
  link: string;
  linkType: "github" | "website";
  recent: boolean;
  categorySlug: string;
  tags: string[];
  icons: string[];
  variant: "Short" | "Long";
  featured: boolean;
  descriptionShort: string;
  sortOrder: number;
};

const importProjectsRef = makeFunctionReference<
  "mutation",
  { adminKey: string; projects: ImportProject[]; clearExisting?: boolean },
  { inserted: number; deleted: number }
>("projects:importProjects");

function truthy(value: string | undefined) {
  return ["true", "1", "yes", "y"].includes((value ?? "").trim().toLowerCase());
}

function toCategorySlug(raw: string | undefined): "general" | "web" | "game" {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "web" || value === "game" || value === "general") {
    return value;
  }
  return "general";
}

function toVariant(raw: string | undefined): "Short" | "Long" {
  return (raw ?? "").trim().toLowerCase() === "long" ? "Long" : "Short";
}

function toLinkType(raw: string | undefined): "github" | "website" {
  return (raw ?? "").trim().toLowerCase() === "website" ? "website" : "github";
}

function splitField(raw: string | undefined, separator: ";" | ",") {
  return (raw ?? "")
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeMobileTag(tag: string) {
  if (tag.toLowerCase() === "mobile") {
    return "Mobile";
  }
  return tag;
}

function dedupe(items: string[]) {
  return [...new Set(items)];
}

function mapRow(row: CsvRow, sortOrder: number): ImportProject | null {
  const name = (row.title ?? "").trim();
  const link = (row.link ?? "").trim();
  if (!name || !link) {
    return null;
  }

  const recent = truthy(row.recent);
  const tags = splitField(row.tags, ";").map(normalizeMobileTag);
  if (truthy(row.minecraft) && !tags.includes("Minecraft")) {
    tags.push("Minecraft");
  }

  const description = (row.description ?? "").trim();

  return {
    name,
    link,
    linkType: toLinkType(row.link_type),
    icons: splitField(row.icons, ";"),
    description,
    descriptionShort: (row.description_short ?? "").trim() || description,
    categorySlug: toCategorySlug(row.project_type),
    variant: toVariant(row.variant),
    recent,
    featured: recent,
    tags: dedupe(tags),
    sortOrder,
  };
}

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const adminKey = process.env.ADMIN_SESSION_SECRET;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set in environment.");
  }
  if (!adminKey) {
    throw new Error("ADMIN_SESSION_SECRET is not set in environment.");
  }

  const csvPath = resolve(process.cwd(), "data.csv");
  const csv = readFileSync(csvPath, "utf8");
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];

  const projects = rows
    .map((row, index) => mapRow(row, index))
    .filter((row): row is ImportProject => row !== null);
  if (projects.length === 0) {
    throw new Error("No valid rows found in data.csv.");
  }

  const client = new ConvexHttpClient(convexUrl);
  const result = await client.mutation(importProjectsRef, {
    adminKey,
    projects,
    clearExisting: true,
  });

  console.log(`Imported ${result.inserted} projects (deleted ${result.deleted}).`);
}

await main();
