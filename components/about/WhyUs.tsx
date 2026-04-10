"use client";

import { motion } from "motion/react";
import { ABOUT_WHY_US_PILLS } from "@/lib/constants";

export function WhyUs() {
  return (
    <section className="w-full bg-background py-14 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold tracking-tight text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why work with us
        </motion.h2>
        <motion.p
          className="text-base text-muted-foreground leading-relaxed max-w-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          We approach every project as a builder, not a vendor. That means
          understanding your constraints, your users, and what done actually
          looks like for your business.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {ABOUT_WHY_US_PILLS.map((pill) => (
            <span
              key={pill}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
