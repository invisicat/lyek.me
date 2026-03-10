import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { assertAdminKey } from "./admin";

const projectTypeValue = v.union(v.literal("general"), v.literal("web"), v.literal("game"));
const linkTypeValue = v.union(v.literal("github"), v.literal("website"));
const variantValue = v.union(v.literal("Short"), v.literal("Long"));

const projectInputValue = v.object({
  name: v.string(),
  description: v.string(),
  link: v.string(),
  linkType: linkTypeValue,
  recent: v.boolean(),
  categorySlug: v.string(),
  tags: v.array(v.string()),
  icons: v.array(v.string()),
  variant: variantValue,
  featured: v.boolean(),
  descriptionShort: v.string(),
  sortOrder: v.number(),
});

const projectPatchValue = v.object({
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  link: v.optional(v.string()),
  linkType: v.optional(linkTypeValue),
  recent: v.optional(v.boolean()),
  categorySlug: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  icons: v.optional(v.array(v.string())),
  variant: v.optional(variantValue),
  featured: v.optional(v.boolean()),
  descriptionShort: v.optional(v.string()),
  sortOrder: v.optional(v.number()),
});

function normalizeCategorySlug(project: { categorySlug?: string; projectType?: "general" | "web" | "game" }) {
  return project.categorySlug ?? project.projectType ?? "general";
}

export const listProjects = queryGeneric({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("projects"),
      name: v.string(),
      description: v.string(),
      link: v.string(),
      linkType: linkTypeValue,
      recent: v.boolean(),
      categorySlug: v.string(),
      tags: v.array(v.string()),
      icons: v.array(v.string()),
      variant: variantValue,
      featured: v.boolean(),
      descriptionShort: v.string(),
      sortOrder: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects
      .map((project) => ({
        _id: project._id,
        name: project.name,
        description: project.description,
        link: project.link,
        linkType: project.linkType,
        recent: project.recent,
        categorySlug: normalizeCategorySlug(project),
        tags: project.tags,
        icons: project.icons,
        variant: project.variant,
        featured: project.featured,
        descriptionShort: project.descriptionShort,
        sortOrder: project.sortOrder ?? 9999,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder || Number(b.recent) - Number(a.recent));
  },
});

export const createProject = mutationGeneric({
  args: {
    adminKey: v.string(),
    project: projectInputValue,
  },
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    return await ctx.db.insert("projects", args.project);
  },
});

export const updateProject = mutationGeneric({
  args: {
    adminKey: v.string(),
    id: v.id("projects"),
    patch: projectPatchValue,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Project not found.");
    }
    await ctx.db.patch(args.id, args.patch);
    return null;
  },
});

export const deleteProject = mutationGeneric({
  args: {
    adminKey: v.string(),
    id: v.id("projects"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderProjects = mutationGeneric({
  args: {
    adminKey: v.string(),
    orders: v.array(v.object({ id: v.id("projects"), sortOrder: v.number() })),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    await Promise.all(args.orders.map(({ id, sortOrder }) => ctx.db.patch(id, { sortOrder })));
    return null;
  },
});

export const importProjects = mutationGeneric({
  args: {
    adminKey: v.string(),
    projects: v.array(
      v.object({
        name: v.string(),
        description: v.string(),
        link: v.string(),
        linkType: linkTypeValue,
        recent: v.boolean(),
        projectType: v.optional(projectTypeValue),
        categorySlug: v.optional(v.string()),
        tags: v.array(v.string()),
        icons: v.array(v.string()),
        variant: variantValue,
        featured: v.boolean(),
        descriptionShort: v.string(),
        sortOrder: v.optional(v.number()),
      }),
    ),
    clearExisting: v.optional(v.boolean()),
  },
  returns: v.object({
    inserted: v.number(),
    deleted: v.number(),
  }),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    let deleted = 0;
    if (args.clearExisting) {
      const existing = await ctx.db.query("projects").collect();
      deleted = existing.length;
      await Promise.all(existing.map((doc) => ctx.db.delete(doc._id)));
    }

    for (const [index, project] of args.projects.entries()) {
      await ctx.db.insert("projects", {
        ...project,
        categorySlug: normalizeCategorySlug(project),
        sortOrder: project.sortOrder ?? index,
      });
    }

    return {
      inserted: args.projects.length,
      deleted,
    };
  },
});
