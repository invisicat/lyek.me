import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { assertAdminKey } from "./admin";

export const listSiteContent = queryGeneric({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("siteContent"),
      key: v.string(),
      value: v.string(),
      updatedAt: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const rows = await ctx.db.query("siteContent").collect();
    return rows
      .map((row) => ({
        _id: row._id,
        key: row.key,
        value: row.value,
        updatedAt: row.updatedAt,
      }))
      .sort((a, b) => a.key.localeCompare(b.key));
  },
});

export const upsertSiteContent = mutationGeneric({
  args: {
    adminKey: v.string(),
    key: v.string(),
    value: v.string(),
  },
  returns: v.id("siteContent"),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    const updatedAt = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt });
      return existing._id;
    }
    return await ctx.db.insert("siteContent", { key: args.key, value: args.value, updatedAt });
  },
});

export const bulkUpsertSiteContent = mutationGeneric({
  args: {
    adminKey: v.string(),
    entries: v.array(v.object({ key: v.string(), value: v.string() })),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    assertAdminKey(args.adminKey);
    let updated = 0;
    for (const entry of args.entries) {
      const existing = await ctx.db
        .query("siteContent")
        .withIndex("by_key", (q) => q.eq("key", entry.key))
        .first();
      const updatedAt = Date.now();
      if (existing) {
        await ctx.db.patch(existing._id, { value: entry.value, updatedAt });
      } else {
        await ctx.db.insert("siteContent", { key: entry.key, value: entry.value, updatedAt });
      }
      updated += 1;
    }
    return updated;
  },
});
