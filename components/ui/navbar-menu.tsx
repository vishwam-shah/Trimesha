"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
  contentClassName,
  routeActive,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
  contentClassName?: string;
  /** Current page matches this section (e.g. /services/*) */
  routeActive?: boolean;
}) => {
  const content = (
    <motion.p
      transition={{ duration: 0.3 }}
      className={cn(
        "flex cursor-pointer flex-col gap-1 text-sm font-medium transition-colors duration-200",
        routeActive
          ? "text-white font-semibold"
          : "text-white/90 hover:text-white",
      )}
    >
      <span>{item}</span>
      {/* Same-height row as plain nav links so labels share one baseline */}
      <span
        className={cn(
          "h-0.5 w-full shrink-0 rounded-full",
          routeActive ? "bg-white/80" : "bg-transparent",
        )}
        aria-hidden
      />
    </motion.p>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href ? (
        <Link href={href}>
          {content}
        </Link>
      ) : (
        content
      )}
      {active !== null && children != null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId={`nav-dropdown-${item}`}
                className="bg-gray-950/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40"
              >
                <motion.div
                  layout
                  className={cn("w-max h-full p-4", contentClassName)}
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center justify-center space-x-8 rounded-full border border-white/[0.08] bg-white/[0.04] px-8 py-3.5 shadow-[0_2px_20px_rgba(0,0,0,0.15)] backdrop-blur-xl"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-40 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => {
  return (
    <Link
      href={href}
      {...rest}
      className="text-neutral-400 hover:text-violet-400 transition-colors duration-200"
    >
      {children}
    </Link>
  );
};
