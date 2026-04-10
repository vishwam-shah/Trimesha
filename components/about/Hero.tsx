"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-background py-28 md:py-36">
      {/* Spotlight effects */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgb(139, 92, 246)" />
      <Spotlight className="top-10 left-full md:left-80 md:top-20" fill="rgb(59, 130, 246)" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block border border-violet-300 dark:border-violet-500/50 bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-medium px-3 py-1 rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Founded 2025 · Ahmedabad, India
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-foreground max-w-2xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We build custom AI systems for the way your business{" "}
            <span className="text-purple-600 dark:text-purple-400">actually works.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Trimesha Digital Solutions partners with startups and growing
            businesses to replace guesswork with intelligent, tailored technology
            — built to fit your operation, not the other way around.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
