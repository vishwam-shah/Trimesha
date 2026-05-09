import crypto from "crypto";

export function generatePasswordResetToken(): { raw: string; hashed: string } {
  const raw = crypto.randomBytes(32).toString("hex");
  const hashed = crypto
    .createHash("sha256")
    .update(raw, "utf8")
    .digest("hex");
  return { raw, hashed };
}

export function hashPasswordResetToken(raw: string): string {
  return crypto.createHash("sha256").update(raw, "utf8").digest("hex");
}

/** Normalize token from URL / JSON (decode, trim, lowercase hex). */
export function normalizePasswordResetToken(raw: string): string {
  let t = raw.trim();
  try {
    let prev = "";
    while (t !== prev) {
      prev = t;
      t = decodeURIComponent(t);
    }
  } catch {
    return "";
  }
  t = t.trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(t)) return "";
  return t;
}
