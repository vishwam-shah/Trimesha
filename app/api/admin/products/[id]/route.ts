import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbconfig/dbconnect";
import Product from "@/models/Product";
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
    if (body.place !== undefined) update.place = String(body.place);
    if (body.title !== undefined) update.title = String(body.title);
    if (body.title2 !== undefined) update.title2 = String(body.title2);
    if (body.description !== undefined) update.description = String(body.description);
    if (body.image !== undefined) update.image = String(body.image);
    if (body.url !== undefined) update.url = String(body.url);
    if (body.category !== undefined) update.category = String(body.category);
    if (body.features !== undefined) {
      update.features = Array.isArray(body.features)
        ? body.features.map(String)
        : String(body.features)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
    }
    if (body.sortOrder !== undefined) {
      const n = Number(body.sortOrder);
      if (!Number.isNaN(n)) update.sortOrder = n;
    }

    const doc = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/admin/products/[id]", e);
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
    const doc = await Product.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/products/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
