import { NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { cmsRefs, getAdminConvexClient, getAdminMutationKey } from "@/lib/adminCms";

export const runtime = "nodejs";

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
      await client.mutation(cmsRefs.createWip, {
        adminKey,
        item: {
          name: String(form.get("name") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          date: String(form.get("date") ?? "").trim(),
          link: String(form.get("link") ?? "").trim(),
          sortOrder: toNumber(form.get("sortOrder"), 9999),
        },
      });
    } else if (action === "update") {
      await client.mutation(cmsRefs.updateWip, {
        adminKey,
        id: String(form.get("id") ?? ""),
        patch: {
          name: String(form.get("name") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          date: String(form.get("date") ?? "").trim(),
          link: String(form.get("link") ?? "").trim(),
          sortOrder: toNumber(form.get("sortOrder"), 9999),
        },
      });
    } else if (action === "delete") {
      await client.mutation(cmsRefs.deleteWip, {
        adminKey,
        id: String(form.get("id") ?? ""),
      });
    }

    return NextResponse.redirect(new URL("/admin?saved=wip", request.url), 303);
  } catch (error) {
    console.error("WIP admin action failed", error);
    return NextResponse.redirect(new URL("/admin?error=wip", request.url), 303);
  }
}
