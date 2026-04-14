"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlowingShadowProps {
  children: ReactNode;
  /** `card` = stretch to parent (pricing tiles). `banner` = original demo proportions. */
  variant?: "banner" | "card";
  /** When false, orbiting glow and border crawl are static (e.g. non-highlight pricing cards). */
  animatedOrbit?: boolean;
  className?: string;
}

export function GlowingShadow({
  children,
  variant = "banner",
  animatedOrbit = true,
  className,
}: GlowingShadowProps) {
  const isCard = variant === "card";
  const staticOrbit = isCard && !animatedOrbit;

  return (
    <>
      <style jsx>{`
        @property --hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-translate-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --glow-radius {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }

        .glow-container {
          --card-color: hsl(260deg 100% 3%);
          --text-color: hsl(260deg 10% 55%);
          --card-radius: 3.6vw;
          --card-width: 35vw;
          --border-width: 3px;
          --bg-size: 1;
          --hue: 0;
          --hue-speed: 1;
          --rotate: 0;
          --animation-speed: 4s;
          --glow-scale: 1.35;
          --scale-factor: 1;
          --glow-blur: 4.5;
          --glow-opacity: 0.72;
          --glow-radius: 100;
          --glow-rotate-unit: 1deg;

          width: var(--card-width);
          width: min(480px, var(--card-width));
          aspect-ratio: 1.5/1;
          color: white;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border-radius: var(--card-radius);
          cursor: default;
        }

        .glow-container--card {
          width: 100%;
          max-width: none;
          min-width: 0;
          min-height: 100%;
          height: 100%;
          margin: 0;
          aspect-ratio: unset;
          cursor: default;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          overflow: visible;
          --card-radius: 14px;
          --card-width: min(100%, 380px);
          --animation-speed: 5s;
          --glow-scale: 1.15;
          --glow-blur: 3.25;
          --glow-opacity: 0.48;
        }

        .glow-container:before,
        .glow-container:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        .glow-content {
          position: absolute;
          background: var(--card-color);
          border-radius: calc(var(--card-radius) * 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: calc(var(--card-width) / 8);
        }

        .glow-container--card .glow-content {
          position: relative;
          flex: 1 1 auto;
          width: 100%;
          min-height: 0;
          padding: 0;
          align-items: stretch;
          justify-content: flex-start;
          background: transparent;
          border-radius: calc(var(--card-radius) * 0.88);
        }

        .glow-content span {
          display: inline-block;
          padding: 0.25em;
          border-radius: 4px;
          margin-right: 8px;
        }

        .glow-content:before {
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          translate: -50% -50%;
          width: calc(100% + var(--border-width) * 2);
          height: calc(100% + var(--border-width) * 2);
          border-radius: calc(var(--card-radius) * 0.9);
          box-shadow: 0 0 12px rgb(0 0 0 / 0.45);
          mix-blend-mode: color-burn;
          z-index: -1;
          background: hsl(0deg 0% 16%) radial-gradient(
            50% 50% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 90%) calc(0% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 80%) calc(20% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%) calc(40% * var(--bg-size)),
            transparent 100%
          );
          animation: hue-animation var(--animation-speed) linear infinite,
            rotate-bg var(--animation-speed) linear infinite;
        }

        .glow-container--card .glow-content:before {
          border-radius: calc(var(--card-radius) * 0.88);
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          animation: hue-animation-purple var(--animation-speed) ease-in-out infinite,
            rotate-bg var(--animation-speed) linear infinite;
          background: hsl(0deg 0% 16%) radial-gradient(
            95% 95% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 82% / 0.55) calc(0% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 62% / 0.35) calc(22% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 48% / 0.22) calc(48% * var(--bg-size)),
            transparent 68%
          );
          box-shadow:
            0 0 10px rgb(0 0 0 / 0.32),
            0 0 12px hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 90% 58% / 0.14),
            0 0 24px hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 85% 50% / 0.07);
        }

        .glow {
          --glow-translate-y: 0;
          display: block;
          position: absolute;
          width: calc(var(--card-width) / 5);
          height: calc(var(--card-width) / 5);
          animation: rotate var(--animation-speed) linear infinite;
          transform: rotateZ(calc(var(--rotate) * var(--glow-rotate-unit)));
          transform-origin: center;
          border-radius: calc(var(--glow-radius) * 10vw);
        }

        .glow-container--card .glow {
          left: 50%;
          top: 50%;
          width: min(34%, 118px);
          height: min(34%, 118px);
          margin-left: 0;
          transform: translate(-50%, -50%)
            rotateZ(calc(var(--rotate) * var(--glow-rotate-unit)));
        }

        .glow:after {
          content: "";
          display: block;
          z-index: -2;
          filter: blur(calc(var(--glow-blur) * 10px));
          width: 130%;
          height: 130%;
          left: -15%;
          top: -15%;
          background: hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%);
          position: relative;
          border-radius: calc(var(--glow-radius) * 10vw);
          animation: hue-animation var(--animation-speed) linear infinite;
          transform: scaleY(calc(var(--glow-scale) * var(--scale-factor) / 1.1))
            scaleX(calc(var(--glow-scale) * var(--scale-factor) * 1.2))
            translateY(calc(var(--glow-translate-y) * 1%));
          opacity: var(--glow-opacity);
        }

        .glow-container--card .glow:after {
          animation: hue-animation-purple var(--animation-speed) ease-in-out infinite;
        }

        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }

        @keyframes rotate {
          from {
            --rotate: -70;
            --glow-translate-y: -65;
          }
          25% {
            --glow-translate-y: -65;
          }
          50% {
            --glow-translate-y: -65;
          }
          60%,
          75% {
            --glow-translate-y: -65;
          }
          85% {
            --glow-translate-y: -65;
          }
          to {
            --rotate: calc(360 - 70);
            --glow-translate-y: -65;
          }
        }

        @keyframes hue-animation {
          0% {
            --hue: 0;
          }
          100% {
            --hue: 360;
          }
        }

        @keyframes hue-animation-purple {
          0% {
            --hue: 262;
          }
          50% {
            --hue: 285;
          }
          100% {
            --hue: 262;
          }
        }

        .glow-container--static-orbit .glow-content:before,
        .glow-container--static-orbit .glow:after,
        .glow-container--static-orbit .glow {
          animation: none !important;
        }
        .glow-container--static-orbit .glow {
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-content:before,
          .glow:after,
          .glow {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className={cn(
          "glow-container",
          isCard && "glow-container--card",
          staticOrbit && "glow-container--static-orbit",
          className,
        )}
        role={isCard ? undefined : "presentation"}
      >
        <span className="glow" aria-hidden />
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}
