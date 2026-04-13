import type { PricingPlan } from "@/types/pricing";

export const DEFAULT_PRICING_PLANS: Omit<
  PricingPlan,
  "sortOrder"
>[] = [
  {
    tier: 1,
    name: "LaunchPad AI",
    tagline: "The Pilot",
    priceDisplay: "Get started",
    description:
      "Prove AI value with a focused use case, clean integrations, and a path to scale.",
    features: [
      "Single high-impact workflow or assistant",
      "Core integrations & secure deployment",
      "Light analytics & hand-off playbook",
      "Founder-led onboarding & success",
    ],
    ctaLabel: "Get a Quote",
    ctaUrl: "#book-call",
    highlighted: false,
  },
  {
    tier: 2,
    name: "Catalyst AI",
    nameSecondary: "Velocity AI",
    tagline: "The Scale",
    priceDisplay: "Most teams start here",
    description:
      "Catalyst AI for go-to-market acceleration and operational throughput at scale—our most popular tier for growing teams.",
    features: [
      "Multi-workflow automation & orchestration",
      "Advanced models, guardrails, and evals",
      "Team workspaces & role-based access",
      "Priority support & quarterly reviews",
    ],
    ctaLabel: "Get a Quote",
    ctaUrl: "#book-call",
    highlighted: true,
  },
  {
    tier: 3,
    name: "Supreme AI",
    tagline: "The Pinnacle",
    priceDisplay: "Enterprise",
    description:
      "Mission-critical programs with dedicated pods, SLAs, and co-innovation on your roadmap.",
    features: [
      "Dedicated solutions & compliance alignment",
      "Custom RAG, agents, and private data planes",
      "24/7 coverage options",
      "Executive business reviews & roadmaps",
    ],
    ctaLabel: "Get a Quote",
    ctaUrl: "#book-call",
    highlighted: false,
  },
];
