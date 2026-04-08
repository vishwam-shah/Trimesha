import { Header } from "@/components/layout/header";
import { PricingHero } from "@/components/sections/pricing/pricing-hero";
import { PricingTiers } from "@/components/sections/pricing/pricing-tiers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Trimesha — LaunchPad, Catalyst & Supreme AI",
  description:
    "Compare LaunchPad AI (The Pilot), Catalyst / Velocity AI (The Scale), and Supreme AI (The Pinnacle). Catalyst is our most popular tier.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <PricingHero />
        <PricingTiers />
      </main>
    </>
  );
}
