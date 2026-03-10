import { NextResponse } from "next/server";
import {
  createAdminSessionCookie,
  getAdminSessionCookieOptions,
  isValidAdminPasscode,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let passcode = "";

    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { passcode?: string };
      passcode = (body.passcode ?? "").trim();
    } else {
      const form = await request.formData();
      passcode = String(form.get("passcode") ?? "").trim();
    }

    if (!isValidAdminPasscode(passcode)) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
    }

    const response = NextResponse.redirect(new URL("/admin", request.url), 303);
    response.cookies.set(getAdminSessionCookieOptions(createAdminSessionCookie()));
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.redirect(new URL("/admin/login?error=server", request.url), 303);
  }
}
