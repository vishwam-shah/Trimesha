"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Thin border ring with one soft “beam” of light traveling the perimeter.
 * Uses a masked conic gradient so nothing glows inside the card face.
 */
export function PricingCardGlow({
  children,
  highlighted,
  className,
}: {
  children: ReactNode;
  highlighted?: boolean;
  className?: string;
}) {
  const bw = highlighted ? 3 : 2;
  const dur = highlighted ? "2.75s" : "4.25s";
  const beamGradient = highlighted
    ? `conic-gradient(
            from -90deg,
            rgba(139, 92, 246, 0.2) 0deg,
            rgba(139, 92, 246, 0.2) 324deg,
            rgba(196, 181, 253, 0.75) 333deg,
            rgba(255, 255, 255, 1) 340deg,
            rgba(167, 139, 250, 0.85) 346deg,
            rgba(139, 92, 246, 0.2) 352deg,
            rgba(139, 92, 246, 0.2) 360deg
          )`
    : `conic-gradient(
            from -90deg,
            rgba(139, 92, 246, 0.14) 0deg,
            rgba(139, 92, 246, 0.14) 328deg,
            rgba(196, 181, 253, 0.45) 336deg,
            rgba(244, 240, 255, 0.98) 342deg,
            rgba(167, 139, 250, 0.65) 348deg,
            rgba(139, 92, 246, 0.14) 354deg,
            rgba(139, 92, 246, 0.14) 360deg
          )`;

  return (
    <>
      <style>{`
        @keyframes pricing-beam-orbit {
          to {
            transform: rotate(360deg);
          }
        }
        .pcg-frame {
          position: relative;
          border-radius: 1rem;
          isolation: isolate;
        }
        .pcg-beam {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          padding: ${bw}px;
          box-sizing: border-box;
          background: ${beamGradient};
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: pricing-beam-orbit ${dur} linear infinite;
          pointer-events: none;
          will-change: transform;
        }
        .pcg-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          border-radius: calc(1rem - ${bw}px);
          overflow: hidden;
        }
      `}</style>
      <div className={cn("pcg-frame", className)}>
        <div className="pcg-beam" aria-hidden />
        <div className="pcg-inner">{children}</div>
      </div>
    </>
  );
}
