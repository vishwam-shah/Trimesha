import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbconfig/dbconnect";
import PricingPlan from "@/models/PricingPlan";
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
    if (body.tier !== undefined) {
      const n = Number(body.tier);
      if (!Number.isNaN(n)) update.tier = n;
    }
    if (body.name !== undefined) update.name = String(body.name);
    if (body.nameSecondary !== undefined) {
      update.nameSecondary = String(body.nameSecondary);
    }
    if (body.tagline !== undefined) update.tagline = String(body.tagline);
    if (body.priceDisplay !== undefined) {
      update.priceDisplay = String(body.priceDisplay);
    }
    if (body.description !== undefined) {
      update.description = String(body.description);
    }
    if (body.ctaLabel !== undefined) update.ctaLabel = String(body.ctaLabel);
    if (body.ctaUrl !== undefined) update.ctaUrl = String(body.ctaUrl);
    if (body.highlighted !== undefined) {
      update.highlighted = Boolean(body.highlighted);
    }
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

    const doc = await PricingPlan.findByIdAndUpdate(id, update, { new: true });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/v1/admin/pricing/[id]", e);
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
    const doc = await PricingPlan.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/v1/admin/pricing/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
