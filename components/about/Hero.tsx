"use client";

import { useInView } from "@/hooks/useInView";

export function Hero() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-zinc-50 py-20 md:py-24">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="inline-block border border-blue-200 bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Founded 2025 · Ahmedabad, India
        </span>
        <h1 className="text-4xl md:text-5xl font-medium leading-tight text-neutral-900 max-w-2xl mb-4">
          We build custom AI systems for the way your business actually works.
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl leading-relaxed">
          Trimesha Digital Solutions partners with startups and growing
          businesses to replace guesswork with intelligent, tailored technology
          — built to fit your operation, not the other way around.
        </p>
      </div>
    </section>
  );
}
