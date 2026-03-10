import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { assertAdminKey } from "./admin";

const categoryValue = v.object({
  slug: v.string(),
  label: v.string(),
  description: v.string(),
  visible: v.boolean(),
  sortOrder: v.number(),
});

const categoryPatchValue = v.object({
  slug: v.optional(v.string()),
  label: v.optional(v.string()),
  description: v.optional(v.string()),
  visible: v.optional(v.boolean()),
  sortOrder: v.optional(v.number()),
});

export const listCategories = queryGeneric({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("projectCategories"),
      slug: v.string(),
      label: v.string(),
      description: v.string(),
      visible: v.boolean(),
      sortOrder: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const categories = await ctx.db.query("projectCategories").collect();
    return categories
      .map((item) => ({
        _id: item._id,
        slug: item.slug,
        label: item.label,
        description: item.description,
        visible: item.visible,
        sortOrder: item.sortOrder,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const createCategory = mutationGeneric({
  args: {
    adminKey: v.string(),
    category: categoryValue,
  },
  returns: v.id("projectCategories"),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    return await ctx.db.insert("projectCategories", args.category);
  },
});

export const updateCategory = mutationGeneric({
  args: {
    adminKey: v.string(),
    id: v.id("projectCategories"),
    patch: categoryPatchValue,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Category not found.");
    }
    await ctx.db.patch(args.id, args.patch);
    return null;
  },
});

export const deleteCategory = mutationGeneric({
  args: {
    adminKey: v.string(),
    id: v.id("projectCategories"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderCategories = mutationGeneric({
  args: {
    adminKey: v.string(),
    orders: v.array(v.object({ id: v.id("projectCategories"), sortOrder: v.number() })),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    await Promise.all(args.orders.map(({ id, sortOrder }) => ctx.db.patch(id, { sortOrder })));
    return null;
  },
});
