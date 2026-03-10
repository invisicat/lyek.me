import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    link: v.string(),
    linkType: v.union(v.literal("github"), v.literal("website")),
    recent: v.boolean(),
    // Legacy field kept optional for compatibility during migration.
    projectType: v.optional(v.union(v.literal("general"), v.literal("web"), v.literal("game"))),
    categorySlug: v.optional(v.string()),
    tags: v.array(v.string()),
    icons: v.array(v.string()),
    variant: v.union(v.literal("Short"), v.literal("Long")),
    featured: v.boolean(),
    descriptionShort: v.string(),
    sortOrder: v.optional(v.number()),
  })
    .index("by_project_type", ["projectType"])
    .index("by_category_slug", ["categorySlug"])
    .index("by_category_slug_sort_order", ["categorySlug", "sortOrder"])
    .index("by_sort_order", ["sortOrder"])
    .index("by_featured", ["featured"])
    .index("by_recent", ["recent"]),
  wipProjects: defineTable({
    name: v.string(),
    description: v.string(),
    date: v.string(),
    link: v.string(),
    sortOrder: v.optional(v.number()),
  })
    .index("by_date", ["date"])
    .index("by_sort_order", ["sortOrder"]),
  projectCategories: defineTable({
    slug: v.string(),
    label: v.string(),
    description: v.string(),
    visible: v.boolean(),
    sortOrder: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_sort_order", ["sortOrder"])
    .index("by_visible", ["visible"]),
  siteContent: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_updated_at", ["updatedAt"]),
});
