import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set(clearAdminSession());
  return response;
}
