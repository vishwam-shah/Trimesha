"use client";

import React from "react";
import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-size-[200%] px-8 py-2 font-medium text-white [background-clip:padding-box,border-box,border-box] bg-origin-border [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // Push animation on click
        "transition-all duration-150 ease-out",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "active:scale-[0.97] active:translate-y-1",

        // 3D push effect shadow
        "shadow-[0_4px_0_0_rgba(0,0,0,0.3),0_6px_20px_rgba(0,0,0,0.2)]",
        "hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3),0_8px_25px_rgba(0,0,0,0.25)]",
        "active:shadow-[0_1px_0_0_rgba(0,0,0,0.3),0_2px_10px_rgba(0,0,0,0.2)]",

        // before styles (glow effect)
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-size-[200%] before:filter-[blur(calc(0.8*1rem))]",
        "before:transition-all before:duration-150",
        "active:before:opacity-50 active:before:blur-sm",

        // light mode colors
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

        // dark mode colors: use black background and white text for CTA clarity
        "dark:bg-black",
        "dark:shadow-[0_4px_0_0_rgba(139,92,246,0.5),0_6px_20px_rgba(139,92,246,0.3)]",
        "dark:hover:shadow-[0_6px_0_0_rgba(139,92,246,0.5),0_8px_25px_rgba(139,92,246,0.35)]",
        "dark:active:shadow-[0_1px_0_0_rgba(139,92,246,0.5),0_2px_10px_rgba(139,92,246,0.2)]",

        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-150 group-active:scale-95">
        {children}
      </span>
    </button>
  );
}
