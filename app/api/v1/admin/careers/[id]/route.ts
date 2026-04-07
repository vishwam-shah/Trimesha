import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbconfig/dbconnect";
import CareerJob from "@/models/CareerJob";
import { requireAdminAccess } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    await connect();

    const update: Record<string, unknown> = {};
    if (body.title !== undefined) update.title = String(body.title);
    if (body.type !== undefined) update.type = String(body.type);
    if (body.experience !== undefined) {
      update.experience = String(body.experience);
    }
    if (body.compensation !== undefined) {
      update.compensation = String(body.compensation);
    }
    if (body.description !== undefined) {
      update.description = String(body.description);
    }
    if (body.benefits !== undefined) {
      update.benefits = Array.isArray(body.benefits)
        ? body.benefits.map(String)
        : String(body.benefits)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
    }
    if (body.tags !== undefined) {
      update.tags = Array.isArray(body.tags)
        ? body.tags.map(String)
        : String(body.tags)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
    }
    if (body.sortOrder !== undefined) {
      const n = Number(body.sortOrder);
      if (!Number.isNaN(n)) update.sortOrder = n;
    }

    const doc = await CareerJob.findByIdAndUpdate(id, update, { new: true });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/v1/admin/careers/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await connect();
    const doc = await CareerJob.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/v1/admin/careers/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
