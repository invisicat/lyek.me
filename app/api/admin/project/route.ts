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
      await client.mutation(cmsRefs.createProject, {
        adminKey,
        project: {
          name: String(form.get("name") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          descriptionShort: String(form.get("descriptionShort") ?? "").trim(),
          link: String(form.get("link") ?? "").trim(),
          linkType: String(form.get("linkType") ?? "github"),
          recent: toBoolean(form.get("recent")),
          featured: toBoolean(form.get("featured")),
          categorySlug: String(form.get("categorySlug") ?? "general").trim() || "general",
          variant: String(form.get("variant") ?? "Short"),
          tags: String(form.get("tags") ?? "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          icons: String(form.get("icons") ?? "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          sortOrder: toNumber(form.get("sortOrder"), 9999),
        },
      });
    } else if (action === "update") {
      await client.mutation(cmsRefs.updateProject, {
        adminKey,
        id: String(form.get("id") ?? ""),
        patch: {
          name: String(form.get("name") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          descriptionShort: String(form.get("descriptionShort") ?? "").trim(),
          link: String(form.get("link") ?? "").trim(),
          linkType: String(form.get("linkType") ?? "github"),
          recent: toBoolean(form.get("recent")),
          featured: toBoolean(form.get("featured")),
          categorySlug: String(form.get("categorySlug") ?? "general").trim() || "general",
          variant: String(form.get("variant") ?? "Short"),
          tags: String(form.get("tags") ?? "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          icons: String(form.get("icons") ?? "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          sortOrder: toNumber(form.get("sortOrder"), 9999),
        },
      });
    } else if (action === "delete") {
      await client.mutation(cmsRefs.deleteProject, {
        adminKey,
        id: String(form.get("id") ?? ""),
      });
    }

    return NextResponse.redirect(new URL("/admin?saved=project", request.url), 303);
  } catch (error) {
    console.error("Project admin action failed", error);
    return NextResponse.redirect(new URL("/admin?error=project", request.url), 303);
  }
}
