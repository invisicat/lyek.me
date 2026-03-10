import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME } from "@/lib/adminConstants";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function createAdminSessionCookie() {
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const payload = JSON.stringify({ exp: expiresAt });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function clearAdminSession() {
  return {
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  };
}

function safeEqualHex(left: string, right: string) {
  try {
    const leftBuffer = Buffer.from(left, "hex");
    const rightBuffer = Buffer.from(right, "hex");
    if (leftBuffer.length !== rightBuffer.length) {
      return false;
    }
    return timingSafeEqual(leftBuffer, rightBuffer);
  } catch {
    return false;
  }
}

export async function hasValidAdminSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!raw) {
    return false;
  }

  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) {
    return false;
  }

  const expected = sign(encoded);
  if (!safeEqualHex(signature, expected)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      exp?: number;
    };
    if (!payload.exp || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function requireAdminSession() {
  const valid = await hasValidAdminSession();
  if (!valid) {
    redirect("/admin/login");
  }
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSessionCookieOptions(value: string) {
  return {
    name: ADMIN_COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  };
}

export function isValidAdminPasscode(passcode: string) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    throw new Error("ADMIN_PASSCODE is not configured.");
  }
  return passcode === expected;
}
