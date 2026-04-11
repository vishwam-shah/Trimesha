"use client"

import type { ReactNode } from "react"

interface GlowingBorderCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export function GlowingBorderCard({ children, className, style }: GlowingBorderCardProps) {
  return (
    <>
      <style jsx>{`
        @property --glowing-border-rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glowing-hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .glow-border-card {
          --card-radius: 12px;
          --card-bg: var(--card, #0a0a0a);
          --glow-speed: 5s;
          --border-width: 2px;
          position: relative;
          border-radius: var(--card-radius);
          z-index: 1;
          isolation: isolate;
        }

        .glow-border-card::before {
          content: "";
          position: absolute;
          inset: calc(var(--border-width) * -1);
          border-radius: calc(var(--card-radius) + var(--border-width));
          background: conic-gradient(
            from calc(var(--glowing-border-rotate) * 1deg),
            hsl(43 92% 58%),
            hsl(258 88% 64%),
            hsl(285 76% 62%),
            hsl(210 90% 58%),
            hsl(320 78% 58%),
            hsl(195 85% 55%),
            hsl(43 92% 58%)
          );
          animation: glow-border-card-spin var(--glow-speed) linear infinite;
          z-index: -1;
        }

        .glow-border-card::after {
          content: "";
          position: absolute;
          inset: var(--border-width);
          border-radius: calc(var(--card-radius) - var(--border-width));
          background: var(--card-bg);
          z-index: -1;
        }

        @keyframes glow-border-card-spin {
          from { --glowing-border-rotate: 0; }
          to   { --glowing-border-rotate: 360; }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-border-card::before {
            animation: none;
            --glowing-border-rotate: 45;
          }
        }
      `}</style>

      <div className={`glow-border-card ${className ?? ""}`} style={style}>
        {children}
      </div>
    </>
  )
}