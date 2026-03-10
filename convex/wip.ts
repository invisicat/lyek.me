import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { assertAdminKey } from "./admin";

const wipInputValue = v.object({
  name: v.string(),
  description: v.string(),
  date: v.string(),
  link: v.string(),
  sortOrder: v.number(),
});

const wipPatchValue = v.object({
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  date: v.optional(v.string()),
  link: v.optional(v.string()),
  sortOrder: v.optional(v.number()),
});

export const listWipProjects = queryGeneric({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("wipProjects"),
      name: v.string(),
      description: v.string(),
      date: v.string(),
      link: v.string(),
      sortOrder: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const projects = await ctx.db.query("wipProjects").collect();
    return projects
      .map((project) => ({
        _id: project._id,
        name: project.name,
        description: project.description,
        date: project.date,
        link: project.link,
        sortOrder: project.sortOrder ?? 9999,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder || b.date.localeCompare(a.date));
  },
});

export const createWipProject = mutationGeneric({
  args: {
    adminKey: v.string(),
    item: wipInputValue,
  },
  returns: v.id("wipProjects"),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    return await ctx.db.insert("wipProjects", args.item);
  },
});

export const updateWipProject = mutationGeneric({
  args: {
    adminKey: v.string(),
    id: v.id("wipProjects"),
    patch: wipPatchValue,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("WIP project not found.");
    }
    await ctx.db.patch(args.id, args.patch);
    return null;
  },
});

export const deleteWipProject = mutationGeneric({
  args: {
    adminKey: v.string(),
    id: v.id("wipProjects"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderWipProjects = mutationGeneric({
  args: {
    adminKey: v.string(),
    orders: v.array(v.object({ id: v.id("wipProjects"), sortOrder: v.number() })),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    await Promise.all(args.orders.map(({ id, sortOrder }) => ctx.db.patch(id, { sortOrder })));
    return null;
  },
});
