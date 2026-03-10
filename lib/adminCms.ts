import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

export function getAdminMutationKey() {
  const key = process.env.ADMIN_SESSION_SECRET;
  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }
  return key;
}

export function getAdminConvexClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured.");
  }
  return new ConvexHttpClient(convexUrl);
}

export const cmsRefs = {
  createProject: makeFunctionReference<"mutation">("projects:createProject"),
  updateProject: makeFunctionReference<"mutation">("projects:updateProject"),
  deleteProject: makeFunctionReference<"mutation">("projects:deleteProject"),
  createCategory: makeFunctionReference<"mutation">("categories:createCategory"),
  updateCategory: makeFunctionReference<"mutation">("categories:updateCategory"),
  deleteCategory: makeFunctionReference<"mutation">("categories:deleteCategory"),
  createWip: makeFunctionReference<"mutation">("wip:createWipProject"),
  updateWip: makeFunctionReference<"mutation">("wip:updateWipProject"),
  deleteWip: makeFunctionReference<"mutation">("wip:deleteWipProject"),
  bulkUpsertSiteContent: makeFunctionReference<"mutation">("siteContent:bulkUpsertSiteContent"),
};
