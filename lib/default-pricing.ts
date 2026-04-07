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
    ctaLabel: "Talk to sales",
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
      "Same tier — choose Catalyst AI for go-to-market acceleration or Velocity AI for operational throughput. Catalyst is our most popular choice.",
    features: [
      "Multi-workflow automation & orchestration",
      "Advanced models, guardrails, and evals",
      "Team workspaces & role-based access",
      "Priority support & quarterly reviews",
    ],
    ctaLabel: "Book a strategy call",
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
    ctaLabel: "Contact enterprise",
    ctaUrl: "#book-call",
    highlighted: false,
  },
];
