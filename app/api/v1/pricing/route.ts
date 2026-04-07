import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import PricingPlan from "@/models/PricingPlan";
import { DEFAULT_PRICING_PLANS } from "@/lib/default-pricing";
import type { PricingPlanWithId } from "@/types/pricing";

function serialize(doc: {
  _id: unknown;
  tier: number;
  name: string;
  nameSecondary?: string;
  tagline: string;
  priceDisplay: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  highlighted: boolean;
  sortOrder: number;
}): PricingPlanWithId {
  return {
    id: String(doc._id),
    tier: doc.tier,
    name: doc.name,
    nameSecondary:
      typeof doc.nameSecondary === "string" && doc.nameSecondary.trim()
        ? doc.nameSecondary.trim()
        : undefined,
    tagline: doc.tagline,
    priceDisplay: doc.priceDisplay,
    description: doc.description,
    features: doc.features ?? [],
    ctaLabel: doc.ctaLabel,
    ctaUrl: doc.ctaUrl,
    highlighted: Boolean(doc.highlighted),
    sortOrder: doc.sortOrder,
  };
}

export async function GET() {
  try {
    await connect();
    let list = await PricingPlan.find().sort({ sortOrder: 1 }).lean();

    if (list.length === 0) {
      await PricingPlan.insertMany(
        DEFAULT_PRICING_PLANS.map((p, i) => ({
          ...p,
          nameSecondary: p.nameSecondary ?? "",
          sortOrder: i,
        })),
      );
      list = await PricingPlan.find().sort({ sortOrder: 1 }).lean();
    }

    const plans: PricingPlanWithId[] = list.map((d) => serialize(d));
    return NextResponse.json(plans);
  } catch (e) {
    console.error("GET /api/v1/pricing", e);
    return NextResponse.json(
      { error: "Failed to load pricing" },
      { status: 500 },
    );
  }
}
