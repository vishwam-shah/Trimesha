import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connect } from "@/dbconfig/dbconnect";
import User from "@/models/User";
import { generatePasswordResetToken } from "@/lib/auth-reset-token";
import { getPublicOriginFromRequest } from "@/lib/app-origin";
import { escEmailHtml } from "@/lib/email-escape";

const RESET_TTL_MS = 60 * 60 * 1000;

const GENERIC_OK =
  "If an account exists for that email, we sent password reset instructions.";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const emailRaw =
    typeof (body as { email?: unknown })?.email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!emailRaw || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    console.warn("RESEND_API_KEY not configured. Forgot-password email not sent.");
    return NextResponse.json(
      { error: "Password reset email is not configured." },
      { status: 503 },
    );
  }

  try {
    await connect();
    const user = await User.findOne({ email: emailRaw });

    if (!user) {
      return NextResponse.json({ ok: true, message: GENERIC_OK }, { status: 200 });
    }

    const { raw, hashed } = generatePasswordResetToken();
    const expires = new Date(Date.now() + RESET_TTL_MS);

    user.passwordResetToken = hashed;
    user.passwordResetExpires = expires;
    await user.save();

    const origin = getPublicOriginFromRequest(req);
    const resetUrl = `${origin}/reset-password?token=${encodeURIComponent(raw)}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "bookings@notifications.trimesha.com";

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;padding:28px;border:1px solid #e9e4ff;border-radius:14px;background:#ffffff;">
        <h1 style="color:#5b21b6;font-size:20px;margin:0 0 8px;">Reset your Trimesha password</h1>
        <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.55;">
          We received a request to reset the password for <strong>${escEmailHtml(user.email)}</strong>.
        </p>
        <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.55;">
          Use the button below to choose a new password. This link expires in one hour.
        </p>
        <p style="margin:0 0 24px;">
          <a href="${resetUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}" style="display:inline-block;padding:12px 22px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Reset password</a>
        </p>
        <p style="margin:0 0 12px;font-size:13px;color:#64748b;word-break:break-all;">
          If the button does not work, copy and paste this URL into your browser:<br />
          ${escEmailHtml(resetUrl)}
        </p>
        <p style="margin:0;font-size:13px;color:#94a3b8;">
          If you did not ask for this, you can ignore this email. Your password will stay the same.
        </p>
        <p style="margin-top:24px;font-size:13px;color:#94a3b8;">Trimesha</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: user.email,
      subject: "[Trimesha] Reset your password",
      html,
    });

    if (error) {
      console.error("forgot-password email", error);
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await user.save();
      return NextResponse.json(
        { error: "Could not send reset email. Try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: GENERIC_OK }, { status: 200 });
  } catch (e) {
    console.error("POST /api/v1/auth/forgot-password", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
