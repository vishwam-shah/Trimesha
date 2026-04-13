"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { MenuItem } from "@/components/ui/navbar-menu";
import type { PricingPlanWithId } from "@/types/pricing";

function cleanCopy(text: string) {
  return text
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, ",")
    .replace(/\s+,/g, ",")
    .trim();
}

function planIcon(tier: number) {
  if (tier <= 1) return "material-symbols:rocket-launch-rounded";
  if (tier === 2) return "material-symbols:trending-up-rounded";
  return "material-symbols:corporate-fare-rounded";
}

export function PricingNavDropdown({
  setActive,
  active,
  plans,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  plans: PricingPlanWithId[] | null;
}) {
  const list = plans ?? [];

  return (
    <MenuItem
      setActive={setActive}
      active={active}
      item="Pricing"
      contentClassName="!w-auto !max-w-none !p-0"
    >
      <div className="nav-dropdown-scroll w-[min(360px,calc(100vw-2rem))] max-h-[min(400px,70vh)] overflow-y-auto overscroll-contain py-2">
        {plans === null ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            Loading plans…
          </p>
        ) : list.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            No plans available.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 px-1">
            {list.map((plan) => (
              <li key={plan.id}>
                <Link
                  href="/pricing"
                  className="group flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-violet-500/[0.08] dark:hover:bg-violet-500/10"
                >
                  <div className="flex size-[3.25rem] shrink-0 items-center justify-center rounded-xl border border-violet-200/50 bg-gradient-to-br from-violet-500/15 to-blue-500/10 text-violet-700 shadow-sm dark:border-violet-800/60 dark:from-violet-500/20 dark:to-blue-500/10 dark:text-violet-300">
                    <Icon
                      icon={planIcon(plan.tier)}
                      className="size-7"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-sm font-semibold text-foreground group-hover:text-violet-700 dark:group-hover:text-violet-300">
                      {plan.name}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-violet-600 dark:text-violet-400">
                      {plan.tagline}, {plan.priceDisplay}
                    </span>
                    <span className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {cleanCopy(plan.description)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MenuItem>
  );
}
