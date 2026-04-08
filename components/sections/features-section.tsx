"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { Card } from "@/components/ui/stacking-card";
import { SERVICES } from "@/lib/services-data";

export function FeaturesSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={container} className="relative w-full bg-background">
      {/* Header */}
      <div className="mx-auto max-w-5xl py-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What We Provide
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          End-to-end digital solutions to transform your business and accelerate growth
        </p>
      </div>

      {/* Stacking Cards */}
      <div className="w-full">
        {SERVICES.map((service, i) => {
          const n = SERVICES.length;
          const targetScale = 1 - (n - i) * 0.05;
          // Spread ranges evenly across [0, 1] so every card gets a fair share
          const rangeStart = i / n;
          return (
            <Card
              key={`service_${i}`}
              i={i}
              url={service.image}
              title={service.title}
              color={service.color}
              description={service.description}
              progress={scrollYProgress}
              range={[rangeStart, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;
