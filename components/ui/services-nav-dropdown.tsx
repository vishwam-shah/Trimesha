"use client";

import Link from "next/link";
import { MenuItem } from "@/components/ui/navbar-menu";
import { ServiceVisual } from "@/components/ui/service-visual";
import type { ServiceWithId } from "@/types/service";

function cleanCopy(text: string) {
  return text
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, ",")
    .replace(/\s+,/g, ",")
    .trim();
}

export function ServicesNavDropdown({
  setActive,
  active,
  services,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  services: ServiceWithId[] | null;
}) {
  const list = services ?? [];

  return (
    <MenuItem
      setActive={setActive}
      active={active}
      item="Services"
      contentClassName="!w-auto !max-w-none !p-0"
    >
      <div className="nav-dropdown-scroll w-[min(420px,calc(100vw-2rem))] max-h-[min(480px,72vh)] overflow-y-auto overscroll-contain py-2">
        {services === null ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            Loading services…
          </p>
        ) : list.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            No services available.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 px-1">
            {list.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-violet-500/[0.08] dark:hover:bg-violet-500/10"
                >
                  <div className="relative size-[3.25rem] shrink-0 overflow-hidden rounded-xl border border-violet-200/50 shadow-sm ring-1 ring-violet-500/15 dark:border-violet-800/60">
                    <ServiceVisual
                      slug={s.slug}
                      color={s.color}
                      variant="thumb"
                      className="absolute inset-0 size-full transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="block text-sm font-semibold text-foreground group-hover:text-violet-700 dark:group-hover:text-violet-300">
                      {s.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {cleanCopy(s.description)}
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
