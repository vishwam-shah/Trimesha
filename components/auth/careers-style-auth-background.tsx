"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export function CareersStyleAuthBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgb(139, 92, 246)"
      />
      <Spotlight
        className="top-10 left-full md:left-80 md:top-20"
        fill="rgb(59, 130, 246)"
      />
      <Spotlight
        className="-top-20 right-full md:right-60 md:top-10"
        fill="rgb(168, 85, 247)"
      />

      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <motion.div
        className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
