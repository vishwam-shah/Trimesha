import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import PricingPlan from "@/models/PricingPlan";
import { requireAdminAccess } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const tier = Number(body.tier ?? 0);
    const name = String(body.name ?? "");
    const nameSecondary =
      body.nameSecondary !== undefined ? String(body.nameSecondary) : "";
    const tagline = String(body.tagline ?? "");
    const priceDisplay = String(body.priceDisplay ?? "");
    const description = String(body.description ?? "");
    const features = Array.isArray(body.features)
      ? body.features.map(String)
      : String(body.features ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    const ctaLabel = String(body.ctaLabel ?? "Get started");
    const ctaUrl = String(body.ctaUrl ?? "/");
    const highlighted = Boolean(body.highlighted);

    await connect();
    const max = await PricingPlan.findOne()
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();
    const sortOrder =
      typeof max?.sortOrder === "number" ? max.sortOrder + 1 : 0;

    const doc = await PricingPlan.create({
      tier: Number.isFinite(tier) ? tier : sortOrder + 1,
      name,
      nameSecondary,
      tagline,
      priceDisplay,
      description,
      features,
      ctaLabel,
      ctaUrl,
      highlighted,
      sortOrder,
    });

    return NextResponse.json({ id: String(doc._id) }, { status: 201 });
  } catch (e) {
    console.error("POST /api/v1/admin/pricing", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
