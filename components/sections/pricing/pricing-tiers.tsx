"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PricingPlanWithId } from "@/types/pricing";
import { useModal } from "@/components/ui/animated-modal";
import {
  opensBookingModal,
  prepareBookingModalTheme,
} from "@/lib/booking-cta";
import { GlowingShadow } from "@/components/ui/glowing-shadow";

export function PricingTiers() {
  const { setOpen } = useModal();
  const [plans, setPlans] = useState<PricingPlanWithId[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openBooking() {
    prepareBookingModalTheme();
    setOpen(true);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/v1/pricing");
        if (!r.ok) throw new Error("bad");
        const data = (await r.json()) as PricingPlanWithId[];
        if (!cancelled) setPlans(data);
      } catch {
        if (!cancelled) setError("Could not load pricing.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <section id="packages" className="relative bg-background px-6 py-20">
        <p className="text-center text-muted-foreground">{error}</p>
      </section>
    );
  }

  if (!plans) {
    return (
      <section id="packages" className="relative bg-background px-6 py-24">
        <p className="text-center text-muted-foreground">Loading plans…</p>
      </section>
    );
  }

  return (
    <section
      id="packages"
      className="relative overflow-x-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-[0.07]">
        <Spotlight
          className="-top-32 left-1/4"
          fill="rgb(139, 92, 246)"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_100%,#000_45%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Our Pricing
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Catalyst AI is our most popular package for teams ready to scale.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8 lg:items-stretch lg:py-2">
          {plans.map((plan, index) => {
            const ctaLabel = opensBookingModal(plan.ctaUrl)
              ? "Get a Quote"
              : plan.ctaLabel;
            const card = (
              <Card
                className={cn(
                  "relative z-[1] flex h-full min-h-0 w-full flex-1 flex-col rounded-[14px] border-0 shadow-none bg-card text-card-foreground",
                  plan.highlighted && "rounded-[13px]",
                )}
              >
                {plan.highlighted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    Most popular
                  </div>
                ) : null}
                <CardHeader className="pb-2 pt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tier {plan.tier}
                  </p>
                  <CardTitle className="mt-1 text-2xl md:text-3xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-foreground/90">
                    {plan.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground md:text-3xl">
                      {plan.priceDisplay}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-2 pb-8">
                  {opensBookingModal(plan.ctaUrl) ? (
                    <Button
                      type="button"
                      className={cn(
                        "w-full rounded-xl py-6 text-base font-semibold",
                        plan.highlighted
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500"
                          : "",
                      )}
                      variant={plan.highlighted ? "default" : "outline"}
                      onClick={openBooking}
                    >
                      {ctaLabel}
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className={cn(
                        "w-full rounded-xl py-6 text-base font-semibold",
                        plan.highlighted
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500"
                          : "",
                      )}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      <Link href={plan.ctaUrl}>{ctaLabel}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
            return (
            <motion.div
              key={plan.id}
              id={`pricing-plan-${plan.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={cn(
                "relative flex h-full min-h-0 w-full scroll-mt-28 flex-col p-2 sm:p-3",
                plan.highlighted && "lg:-mt-2 lg:mb-2",
              )}
            >
              <GlowingShadow
                variant="card"
                animatedOrbit={plan.highlighted}
                className="min-h-0 flex-1 flex-col"
              >
                {card}
              </GlowingShadow>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
