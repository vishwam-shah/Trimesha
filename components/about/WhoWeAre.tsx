"use client";

import { motion } from "motion/react";

export function WhoWeAre() {
  return (
    <section className="w-full bg-background py-14 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left: text */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Who we are
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Two engineers who got tired of watching businesses settle for
              off-the-shelf tools that almost fit. We started Trimesha to build
              the solutions we kept wishing existed — practical AI, not
              proof-of-concept AI.
            </p>
          </div>

          {/* Right: quote card */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <blockquote className="border-l-2 border-purple-600 dark:border-purple-400 pl-4 mb-5">
              <p className="font-serif italic text-lg text-foreground leading-relaxed">
                &ldquo;Technology should solve something real — not just
                exist.&rdquo;
              </p>
            </blockquote>
            {/* Founders */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
                F1
              </div>
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
                F2
              </div>
              <p className="text-xs text-muted-foreground leading-tight">
                Co-founders, Trimesha Digital Solutions
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
