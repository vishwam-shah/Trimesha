"use client";

import { motion } from "framer-motion";
import {
  PAGE_TRANSITION_CONFIG,
  PAGE_TRANSITION_VARIANTS,
  type TransitionVariant,
} from "@/lib/page-transition-variants";

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: TransitionVariant;
  className?: string;
}

export function PageTransition({
  children,
  variant = "fadeBlur",
  className,
}: PageTransitionProps) {
  const selected = PAGE_TRANSITION_VARIANTS[variant];

  return (
    <motion.div
      initial={selected.initial}
      animate={selected.animate}
      exit={selected.exit}
      transition={PAGE_TRANSITION_CONFIG}
      className={className}
    >
      {children}
    </motion.div>
  );
}
