import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbconfig/dbconnect";
import Service from "@/models/Service";
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
    if (body.slug !== undefined) update.slug = String(body.slug);
    if (body.title !== undefined) update.title = String(body.title);
    if (body.description !== undefined) update.description = String(body.description);
    if (body.image !== undefined) update.image = String(body.image);
    if (body.color !== undefined) update.color = String(body.color);
    if (body.overview !== undefined) update.overview = String(body.overview);
    if (body.typicalTimeline !== undefined) {
      update.typicalTimeline = String(body.typicalTimeline);
    }
    if (body.deliverables !== undefined) {
      update.deliverables = Array.isArray(body.deliverables)
        ? body.deliverables.map(String)
        : String(body.deliverables)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
    }
    if (body.goodFor !== undefined) {
      update.goodFor = Array.isArray(body.goodFor)
        ? body.goodFor.map(String)
        : String(body.goodFor)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
    }
    if (body.sortOrder !== undefined) {
      const n = Number(body.sortOrder);
      if (!Number.isNaN(n)) update.sortOrder = n;
    }

    const doc = await Service.findByIdAndUpdate(id, update, { new: true });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/v1/admin/services/[id]", e);
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
    const doc = await Service.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/v1/admin/services/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

