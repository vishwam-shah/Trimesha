"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function CTA() {
  return (
    <section className="w-full bg-muted/30 py-14 md:py-20">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-foreground">
            Have an idea? Let&apos;s figure out if AI can help.
          </h2>
          <p className="text-base text-muted-foreground mt-3 leading-relaxed">
            Whether you&apos;re a founder sketching something out or a business
            looking to automate a real bottleneck — we&apos;re happy to talk
            through what&apos;s possible.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/contact">
              <RainbowButton className="px-8 py-3 text-sm font-semibold rounded-xl">
                Start a conversation
              </RainbowButton>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            No pitch decks needed. Just tell us your problem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
