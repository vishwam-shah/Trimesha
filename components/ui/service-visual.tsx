"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { serviceIconForSlug } from "@/lib/service-visuals";
import { cn } from "@/lib/utils";

const iconWrap = {
  thumb: "size-9 rounded-lg border-white/25 bg-white/15",
  modal: "size-[4.5rem] rounded-2xl border-white/25 bg-white/15 sm:size-[5.25rem]",
  card: "size-16 rounded-2xl border-white/20 bg-white/10 sm:size-24 md:size-28 md:rounded-3xl",
  hero: "size-20 rounded-3xl border-white/20 bg-white/10 shadow-2xl sm:size-28 md:size-36",
} as const;

const iconClass = {
  thumb: "size-7",
  modal: "size-10 sm:size-11",
  card: "size-8 sm:size-14 md:size-[4.25rem]",
  hero: "size-11 sm:size-16 md:size-[4.5rem]",
} as const;

export function ServiceVisual({
  slug,
  color,
  className,
  variant = "hero",
}: {
  slug: string;
  color: string;
  className?: string;
  variant?: keyof typeof iconWrap;
}) {
  const icon = serviceIconForSlug(slug);
  const grid =
    variant === "thumb"
      ? "10px 10px"
      : variant === "modal"
        ? "22px 22px"
        : "28px 28px";

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-[#06040c]", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 85% at 12% 15%, color-mix(in srgb, ${color} 70%, transparent) 0%, transparent 52%),
            radial-gradient(ellipse 90% 80% at 92% 88%, rgba(139, 92, 246, 0.42) 0%, transparent 48%),
            radial-gradient(ellipse 70% 55% at 55% 8%, rgba(56, 189, 248, 0.22) 0%, transparent 42%),
            linear-gradient(168deg, #030208 0%, #0c0818 38%, #08051a 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.4] mask-[linear-gradient(180deg,white_28%,transparent_92%)] dark:opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: `${grid}`,
        }}
      />

      {variant === "thumb" ? (
        <>
          <div
            className="absolute -left-1/4 top-0 size-[70%] rounded-full opacity-70 blur-2xl"
            style={{
              background: `color-mix(in srgb, ${color} 58%, transparent)`,
            }}
          />
          <div className="absolute -right-1/4 bottom-0 size-[60%] rounded-full bg-violet-500/25 blur-2xl" />
        </>
      ) : (
        <>
          <motion.div
            className="absolute -left-[18%] top-[8%] size-[58%] rounded-full blur-3xl"
            style={{
              background: `color-mix(in srgb, ${color} 52%, transparent)`,
            }}
            animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-[12%] bottom-[5%] size-[52%] rounded-full bg-violet-500/30 blur-3xl"
            animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-[35%] top-[40%] size-[40%] rounded-full bg-sky-400/15 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <svg
        className="pointer-events-none absolute inset-0 size-full opacity-[0.28]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id={`svc-ring-${slug}-${variant}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          fill="none"
          stroke={`url(#svc-ring-${slug}-${variant})`}
          strokeWidth="1.5"
        />
        <circle
          cx="50%"
          cy="50%"
          r="28%"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="6 14"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center p-[8%]">
        <div
          className={cn(
            "flex items-center justify-center backdrop-blur-md",
            iconWrap[variant],
          )}
        >
          <Icon
            icon={icon}
            className={cn(iconClass[variant], "text-white drop-shadow-lg")}
          />
        </div>
      </div>
    </div>
  );
}
