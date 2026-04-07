import mongoose, { Schema, model, models } from "mongoose";
import type { PricingPlan } from "@/types/pricing";

export interface IPricingPlan extends PricingPlan {
  _id?: mongoose.Types.ObjectId;
}

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    tier: { type: Number, required: true },
    name: { type: String, default: "" },
    nameSecondary: { type: String, default: "" },
    tagline: { type: String, default: "" },
    priceDisplay: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    ctaLabel: { type: String, default: "Get started" },
    ctaUrl: { type: String, default: "/" },
    highlighted: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const PricingPlan =
  models.PricingPlan ?? model<IPricingPlan>("PricingPlan", PricingPlanSchema);

export default PricingPlan;
