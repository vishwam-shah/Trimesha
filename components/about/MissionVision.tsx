"use client";

import { useInView } from "@/hooks/useInView";

export function MissionVision() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-zinc-50 py-14 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-teal-200 bg-teal-50 text-teal-800 mb-3">
              Mission
            </span>
            <h3 className="text-base font-medium text-neutral-900 mb-2">
              Bridge the gap between ideas and intelligent execution.
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              We help businesses automate smarter, scale faster, and compete
              with tools that used to be out of reach.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-800 mb-3">
              Vision
            </span>
            <h3 className="text-base font-medium text-neutral-900 mb-2">
              Lead the shift into the AI era — one real problem at a time.
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Not chasing hype. Building lasting competitive advantage for the
              companies we work with.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
