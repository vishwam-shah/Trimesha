"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  PAGE_TRANSITION_CONFIG,
  PAGE_TRANSITION_VARIANTS,
  type TransitionVariant,
} from "@/lib/page-transition-variants";

export type { TransitionVariant };

interface PageTransitionProviderProps {
  children: React.ReactNode;
  variant?: TransitionVariant;
}

export function PageTransitionProvider({
  children,
  variant = "fadeBlur",
}: PageTransitionProviderProps) {
  const pathname = usePathname();
  const selected = PAGE_TRANSITION_VARIANTS[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={selected.initial}
        animate={selected.animate}
        exit={selected.exit}
        transition={PAGE_TRANSITION_CONFIG}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
