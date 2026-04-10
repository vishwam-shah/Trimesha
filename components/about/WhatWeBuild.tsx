"use client";

import { Brain, Smartphone, Globe, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ABOUT_SERVICES } from "@/lib/constants";

const icons = [Brain, Smartphone, Globe, Zap];

export function WhatWeBuild() {
  return (
    <section className="w-full bg-muted/30 py-14 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold tracking-tight text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What we build
        </motion.h2>
        <motion.div
          className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {ABOUT_SERVICES.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={service.label}
                className="flex items-start gap-4 p-5 hover:bg-purple-500/5 transition-colors duration-150 cursor-default"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div
                  className={`w-8 h-8 rounded-lg ${service.bg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className={`w-4 h-4 ${service.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {service.label}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
