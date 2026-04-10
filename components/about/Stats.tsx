"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="w-full bg-background py-14 md:py-20">
      <div ref={ref} className="max-w-[1120px] mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold tracking-tight text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What we&apos;ve shipped
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {ABOUT_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  animate={inView}
                />
              </p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-base text-muted-foreground leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          We&apos;re early-stage by design — every project we take on gets our
          full attention. We don&apos;t split focus across dozens of clients.
        </motion.p>
      </div>
    </section>
  );
}
