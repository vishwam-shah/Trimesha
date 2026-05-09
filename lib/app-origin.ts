/** Base URL for password-reset links and similar (prefers NEXTAUTH_URL). */
export function getPublicOriginFromRequest(req: Request): string {
  const env = process.env.NEXTAUTH_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const rawProto = req.headers.get("x-forwarded-proto") ?? "https";
  const proto = rawProto.split(",")[0]?.trim() || "https";
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}
