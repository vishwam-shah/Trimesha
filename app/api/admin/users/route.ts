import { NextResponse } from "next/server"
import { connect } from "@/dbconfig/dbconnect"
import User from "@/models/User"
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
      .select("-password")
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
    console.error("GET /api/admin/users", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
