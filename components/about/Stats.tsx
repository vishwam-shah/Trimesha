"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ABOUT_STATS } from "@/lib/constants";

interface CounterProps {
  end: number;
  suffix: string;
  animate: boolean;
}

function Counter({ end, suffix, animate }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(end);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [animate, end]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function Stats() {
  const { ref, inView } = useInView();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) setAnimated(true);
  }, [inView, animated]);

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-medium tracking-tight text-neutral-900 mb-8">
          What we&apos;ve shipped
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {ABOUT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-50 rounded-xl p-5"
            >
              <p className="text-3xl font-medium text-neutral-900">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  animate={animated}
                />
              </p>
              <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-base text-neutral-500 leading-relaxed max-w-xl">
          We&apos;re early-stage by design — every project we take on gets our
          full attention. We don&apos;t split focus across dozens of clients.
        </p>
      </div>
    </section>
  );
}
