export function assertAdminKey(adminKey: string) {
  const expected = process.env.ADMIN_SESSION_SECRET;
  if (!expected) {
    throw new Error("ADMIN_SESSION_SECRET is not configured on Convex.");
  }
  if (adminKey !== expected) {
    throw new Error("Unauthorized admin mutation.");
  }
}
