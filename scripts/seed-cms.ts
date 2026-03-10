import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { DEFAULT_CATEGORIES, SITE_CONTENT_DEFAULTS } from "../lib/cmsDefaults";
import type { Project, ProjectCategory, WipProject } from "../lib/types";

const listCategoriesRef = makeFunctionReference<"query", Record<string, never>, ProjectCategory[]>(
  "categories:listCategories",
);
const createCategoryRef = makeFunctionReference<"mutation">("categories:createCategory");
const bulkUpsertContentRef = makeFunctionReference<"mutation">("siteContent:bulkUpsertSiteContent");
const listProjectsRef = makeFunctionReference<"query", Record<string, never>, Project[]>(
  "projects:listProjects",
);
const updateProjectRef = makeFunctionReference<"mutation">("projects:updateProject");
const listWipRef = makeFunctionReference<"query", Record<string, never>, WipProject[]>(
  "wip:listWipProjects",
);
const updateWipRef = makeFunctionReference<"mutation">("wip:updateWipProject");

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const adminKey = process.env.ADMIN_SESSION_SECRET;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set.");
  }
  if (!adminKey) {
    throw new Error("ADMIN_SESSION_SECRET is not set.");
  }

  const client = new ConvexHttpClient(convexUrl);

  const existingCategories = await client.query(listCategoriesRef, {});
  if (existingCategories.length === 0) {
    for (const category of DEFAULT_CATEGORIES) {
      await client.mutation(createCategoryRef, {
        adminKey,
        category,
      });
    }
    console.log(`Created ${DEFAULT_CATEGORIES.length} default categories.`);
  } else {
    console.log(`Categories already exist (${existingCategories.length}), skipping category seed.`);
  }

  const entries = Object.entries(SITE_CONTENT_DEFAULTS).map(([key, value]) => ({ key, value }));
  await client.mutation(bulkUpsertContentRef, {
    adminKey,
    entries,
  });
  console.log(`Upserted ${entries.length} site content keys.`);

  const projects = await client.query(listProjectsRef, {});
  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
  for (const [index, project] of sortedProjects.entries()) {
    if (!project._id) {
      continue;
    }
    await client.mutation(updateProjectRef, {
      adminKey,
      id: project._id,
      patch: {
        categorySlug: project.categorySlug || "general",
        sortOrder: index,
      },
    });
  }
  console.log(`Normalized ${sortedProjects.length} project sort orders.`);

  const wip = await client.query(listWipRef, {});
  const sortedWip = [...wip].sort((a, b) => a.sortOrder - b.sortOrder);
  for (const [index, item] of sortedWip.entries()) {
    if (!item._id) {
      continue;
    }
    await client.mutation(updateWipRef, {
      adminKey,
      id: item._id,
      patch: {
        sortOrder: index,
      },
    });
  }
  console.log(`Normalized ${sortedWip.length} WIP sort orders.`);
}

await main();
