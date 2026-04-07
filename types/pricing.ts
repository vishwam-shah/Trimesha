export type PricingPlan = {
  tier: number;
  name: string;
  /** e.g. "or Velocity AI" for tier 2 */
  nameSecondary?: string;
  tagline: string;
  priceDisplay: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  highlighted: boolean;
  sortOrder: number;
};

export type PricingPlanWithId = PricingPlan & { id: string };
