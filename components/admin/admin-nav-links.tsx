"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav"

type AdminNavLinksProps = {
  onNavigate?: () => void
  className?: string
  /** Comfortable: mobile drawer; larger taps, short descriptions */
  layout?: "default" | "comfortable"
}

export function AdminNavLinks({
  onNavigate,
  className,
  layout = "default",
}: AdminNavLinksProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role

  const items = ADMIN_NAV_ITEMS.filter(
    (item) => !item.superadminOnly || role === "superadmin",
  )

  const comfortable = layout === "comfortable"

  return (
    <nav
      className={cn(
        "flex flex-col",
        comfortable ? "gap-2 p-3 pb-4" : "gap-1 p-3",
        className,
      )}
      aria-label="Admin"
    >
      {items.map((item) => {
        const Icon = item.icon
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`))

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 font-medium transition-colors",
              comfortable
                ? "rounded-xl border border-transparent px-3 py-3 text-[15px] leading-snug active:scale-[0.99]"
                : "rounded-md px-3 py-2 text-sm",
              active
                ? "border-violet-500/25 bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-violet-500/20"
                : comfortable
                  ? "text-sidebar-foreground/90 hover:border-sidebar-border hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <span
              className={cn(
                "flex shrink-0 items-center justify-center rounded-lg bg-sidebar-accent/40 text-sidebar-foreground ring-1 ring-sidebar-border/60",
                comfortable ? "size-11 [&_svg]:size-5" : "size-8 [&_svg]:size-4",
                active && "bg-violet-500/15 ring-violet-500/30",
              )}
            >
              <Icon className="opacity-90" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block">{item.label}</span>
              {comfortable && item.description ? (
                <span className="mt-0.5 block text-xs font-normal text-sidebar-foreground/55">
                  {item.description}
                </span>
              ) : null}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
