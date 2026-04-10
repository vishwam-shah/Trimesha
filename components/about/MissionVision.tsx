"use client";

import { motion } from "motion/react";

export function MissionVision() {
  return (
    <section className="w-full bg-muted/30 py-14 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-700 dark:bg-teal-950/60 dark:text-teal-300 mb-3">
              Mission
            </span>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Bridge the gap between ideas and intelligent execution.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We help businesses automate smarter, scale faster, and compete
              with tools that used to be out of reach.
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-teal-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Vision */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-700 dark:bg-purple-950/60 dark:text-purple-300 mb-3">
              Vision
            </span>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Lead the shift into the AI era — one real problem at a time.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Not chasing hype. Building lasting competitive advantage for the
              companies we work with.
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
