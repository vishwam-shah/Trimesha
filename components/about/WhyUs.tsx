"use client";

import { useInView } from "@/hooks/useInView";
import { ABOUT_WHY_US_PILLS } from "@/lib/constants";

export function WhyUs() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-medium tracking-tight text-neutral-900 mb-4">
          Why work with us
        </h2>
        <p className="text-base text-neutral-500 leading-relaxed max-w-xl mb-6">
          We approach every project as a builder, not a vendor. That means
          understanding your constraints, your users, and what done actually
          looks like for your business.
        </p>
        <div className="flex flex-wrap gap-2">
          {ABOUT_WHY_US_PILLS.map((pill) => (
            <span
              key={pill}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 bg-zinc-50 text-neutral-600 hover:bg-neutral-100 transition-colors duration-150"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
