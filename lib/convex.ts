import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import type { Project, ProjectCategory, SiteContentEntry, WipProject } from "@/lib/types";

const listProjectsRef = makeFunctionReference<"query", Record<string, never>, Project[]>(
  "projects:listProjects",
);
const listWipProjectsRef = makeFunctionReference<"query", Record<string, never>, WipProject[]>(
  "wip:listWipProjects",
);
const listCategoriesRef = makeFunctionReference<"query", Record<string, never>, ProjectCategory[]>(
  "categories:listCategories",
);
const listSiteContentRef = makeFunctionReference<"query", Record<string, never>, SiteContentEntry[]>(
  "siteContent:listSiteContent",
);

function getClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    return null;
  }
  return new ConvexHttpClient(url);
}

export async function getProjects() {
  try {
    const client = getClient();
    if (!client) {
      return [];
    }
    return await client.query(listProjectsRef, {});
  } catch (error) {
    console.error("Failed to fetch projects from Convex", error);
    return [];
  }
}

export async function getWipProjects() {
  try {
    const client = getClient();
    if (!client) {
      return [];
    }
    return await client.query(listWipProjectsRef, {});
  } catch (error) {
    console.error("Failed to fetch WIP projects from Convex", error);
    return [];
  }
}

export async function getProjectCategories() {
  try {
    const client = getClient();
    if (!client) {
      return [];
    }
    return await client.query(listCategoriesRef, {});
  } catch (error) {
    console.error("Failed to fetch categories from Convex", error);
    return [];
  }
}

export async function getSiteContentEntries() {
  try {
    const client = getClient();
    if (!client) {
      return [];
    }
    return await client.query(listSiteContentRef, {});
  } catch (error) {
    console.error("Failed to fetch site content from Convex", error);
    return [];
  }
}
