import { NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { cmsRefs, getAdminConvexClient, getAdminMutationKey } from "@/lib/adminCms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await hasValidAdminSession())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const adminKey = getAdminMutationKey();
  const client = getAdminConvexClient();

  const entries = Array.from(form.entries())
    .filter(([key]) => key.startsWith("content:"))
    .map(([key, value]) => ({
      key: key.replace("content:", ""),
      value: String(value),
    }));

  try {
    await client.mutation(cmsRefs.bulkUpsertSiteContent, {
      adminKey,
      entries,
    });
    return NextResponse.redirect(new URL("/admin?saved=content", request.url), 303);
  } catch (error) {
    console.error("Content admin action failed", error);
    return NextResponse.redirect(new URL("/admin?error=content", request.url), 303);
  }
}
