import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/dbconfig/dbconnect";
import User from "@/models/User";
import {
  hashPasswordResetToken,
  normalizePasswordResetToken,
} from "@/lib/auth-reset-token";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const tokenRaw =
    typeof (body as { token?: unknown })?.token === "string"
      ? (body as { token: string }).token
      : "";
  const token = normalizePasswordResetToken(tokenRaw);
  const password =
    typeof (body as { password?: unknown })?.password === "string"
      ? (body as { password: string }).password
      : "";

  if (!token) {
    return NextResponse.json(
      { error: "Reset link is missing or malformed. Open the link from your email again, or request a new one." },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  try {
    await connect();
    const hashed = hashPasswordResetToken(token);
    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Request a new one from the login page." },
        { status: 400 },
      );
    }

    user.password = await bcrypt.hash(password, 12);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("POST /api/v1/auth/reset-password", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
