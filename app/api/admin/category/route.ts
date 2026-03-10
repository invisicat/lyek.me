import { NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { cmsRefs, getAdminConvexClient, getAdminMutationKey } from "@/lib/adminCms";

export const runtime = "nodejs";

function toBoolean(value: FormDataEntryValue | null) {
  return String(value ?? "").toLowerCase() === "on" || String(value ?? "") === "true";
}

function toNumber(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function POST(request: Request) {
  if (!(await hasValidAdminSession())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const action = String(form.get("action") ?? "");
  const adminKey = getAdminMutationKey();
  const client = getAdminConvexClient();

  try {
    if (action === "create") {
      await client.mutation(cmsRefs.createCategory, {
        adminKey,
        category: {
          slug: String(form.get("slug") ?? "").trim().toLowerCase(),
          label: String(form.get("label") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          visible: toBoolean(form.get("visible")),
          sortOrder: toNumber(form.get("sortOrder"), 0),
        },
      });
    } else if (action === "update") {
      await client.mutation(cmsRefs.updateCategory, {
        adminKey,
        id: String(form.get("id") ?? ""),
        patch: {
          slug: String(form.get("slug") ?? "").trim().toLowerCase(),
          label: String(form.get("label") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          visible: toBoolean(form.get("visible")),
          sortOrder: toNumber(form.get("sortOrder"), 0),
        },
      });
    } else if (action === "delete") {
      await client.mutation(cmsRefs.deleteCategory, {
        adminKey,
        id: String(form.get("id") ?? ""),
      });
    }

    return NextResponse.redirect(new URL("/admin?saved=category", request.url), 303);
  } catch (error) {
    console.error("Category admin action failed", error);
    return NextResponse.redirect(new URL("/admin?error=category", request.url), 303);
  }
}
