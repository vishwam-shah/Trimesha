import { NextResponse } from "next/server"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { connect } from "@/dbconfig/dbconnect"
import User, { USER_ROLES, type UserRole } from "@/models/User"
import { requireSuperAdmin } from "@/lib/admin-auth"

type Ctx = { params: Promise<{ id: string }> }

function isUserRole(v: unknown): v is UserRole {
  return typeof v === "string" && (USER_ROLES as readonly string[]).includes(v)
}

export async function PATCH(req: Request, ctx: Ctx) {
  const session = await requireSuperAdmin()
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await ctx.params
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  try {
    const body = await req.json()
    await connect()

    const target = await User.findById(id)
    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (body.email !== undefined) {
      const email = String(body.email).toLowerCase().trim()
      if (!email) {
        return NextResponse.json({ error: "Email is required." }, { status: 400 })
      }
      const taken = await User.findOne({
        email,
        _id: { $ne: target._id },
      }).lean()
      if (taken) {
        return NextResponse.json(
          { error: "That email is already in use." },
          { status: 409 },
        )
      }
      target.email = email
    }

    if (body.name !== undefined) {
      target.name = String(body.name).trim() || undefined
    }

    if (body.role !== undefined) {
      if (!isUserRole(body.role)) {
        return NextResponse.json({ error: "Invalid role." }, { status: 400 })
      }
      if (target.role === "superadmin" && body.role !== "superadmin") {
        const otherSuper = await User.countDocuments({
          role: "superadmin",
          _id: { $ne: target._id },
        })
        if (otherSuper === 0) {
          return NextResponse.json(
            { error: "Cannot demote the last superadmin." },
            { status: 400 },
          )
        }
      }
      target.role = body.role
    }

    if (body.password !== undefined && body.password !== "") {
      const pwd = String(body.password)
      if (pwd.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters." },
          { status: 400 },
        )
      }
      target.password = await bcrypt.hash(pwd, 12)
    }

    await target.save()
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("PATCH /api/admin/users/[id]", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await requireSuperAdmin()
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await ctx.params
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  if (id === session.user.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account." },
      { status: 400 },
    )
  }

  try {
    await connect()
    const target = await User.findById(id)
    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (target.role === "superadmin") {
      const others = await User.countDocuments({
        role: "superadmin",
        _id: { $ne: target._id },
      })
      if (others === 0) {
        return NextResponse.json(
          { error: "Cannot delete the last superadmin." },
          { status: 400 },
        )
      }
    }

    await User.findByIdAndDelete(id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("DELETE /api/admin/users/[id]", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
