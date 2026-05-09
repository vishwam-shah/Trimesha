import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connect } from "@/dbconfig/dbconnect"
import User, { USER_ROLES, type UserRole } from "@/models/User"
import { requireSuperAdmin } from "@/lib/admin-auth"
import type { AdminUserRow } from "@/types/admin-user"

export async function GET() {
  const session = await requireSuperAdmin()
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    await connect()
    const docs = await User.find()
      .sort({ createdAt: -1 })
      .select("-password -passwordResetToken")
      .lean()

    const users: AdminUserRow[] = docs.map((u) => ({
      id: String(u._id),
      email: u.email,
      name: u.name ?? "",
      role: u.role as AdminUserRow["role"],
      createdAt:
        u.createdAt instanceof Date
          ? u.createdAt.toISOString()
          : String(u.createdAt ?? ""),
      updatedAt:
        u.updatedAt instanceof Date
          ? u.updatedAt.toISOString()
          : String(u.updatedAt ?? ""),
    }))

    return NextResponse.json(users)
  } catch (e) {
    console.error("GET /api/v1/admin/users", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await requireSuperAdmin()
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await req.json()
    const name =
      typeof body.name === "string" ? body.name.trim() : ""
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password =
      typeof body.password === "string" ? body.password : ""
    const rawRole = typeof body.role === "string" ? body.role : "user"
    const role = USER_ROLES.includes(rawRole as UserRole)
      ? (rawRole as UserRole)
      : null

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      )
    }
    if (!role) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      )
    }

    await connect()

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      )
    }

    const hashed = await bcrypt.hash(password, 12)
    const doc = await User.create({
      email,
      password: hashed,
      role,
      ...(name ? { name } : {}),
    })

    const row: AdminUserRow = {
      id: String(doc._id),
      email: doc.email,
      name: doc.name ?? "",
      role: doc.role,
      createdAt:
        doc.createdAt instanceof Date
          ? doc.createdAt.toISOString()
          : new Date().toISOString(),
      updatedAt:
        doc.updatedAt instanceof Date
          ? doc.updatedAt.toISOString()
          : new Date().toISOString(),
    }

    return NextResponse.json(row, { status: 201 })
  } catch (e) {
    console.error("POST /api/v1/admin/users", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
