"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import { useModal } from "@/components/ui/animated-modal";
import { prepareBookingModalTheme } from "@/lib/booking-cta";

export function PricingHero() {
  const { setOpen } = useModal();
  return (
    <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-background pt-28 sm:pt-32 lg:pt-36">
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
        className="absolute left-10 top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10"
        animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
            AI packages
          </p>
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            Scale with the
            <br />
            <span className="text-purple-600 dark:text-purple-400">
              right tier
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            From pilot to enterprise, LaunchPad, Catalyst or Velocity, and
            Supreme AI are built to match how your team grows.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              href="#packages"
              className="inline-flex rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
            >
              View packages
            </Link>
            <button
              type="button"
              onClick={() => {
                prepareBookingModalTheme();
                setOpen(true);
              }}
              className="inline-flex rounded-xl border-2 border-purple-500/60 bg-background/80 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition hover:border-purple-400 hover:bg-purple-500/10"
            >
              Book a call
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
