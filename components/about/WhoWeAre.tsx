"use client";

import { useInView } from "@/hooks/useInView";

export function WhoWeAre() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900 mb-4">
              Who we are
            </h2>
            <p className="text-base text-neutral-500 leading-relaxed mb-4">
              Two engineers who got tired of watching businesses settle for
              off-the-shelf tools that almost fit. We started Trimesha to build
              the solutions we kept wishing existed — practical AI, not
              proof-of-concept AI.
            </p>
          </div>

          {/* Right: quote card */}
          <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
            <blockquote className="border-l-2 border-neutral-300 pl-4 mb-5">
              <p className="font-serif italic text-lg text-neutral-800 leading-relaxed">
                &ldquo;Technology should solve something real — not just
                exist.&rdquo;
              </p>
            </blockquote>
            {/* Founders */}
            <div className="flex items-center gap-3">
              {/* Replace avatar initials with actual founder photos when available */}
              <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
                F1
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
                F2
              </div>
              <p className="text-xs text-neutral-500 leading-tight">
                Co-founders, Trimesha Digital Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
