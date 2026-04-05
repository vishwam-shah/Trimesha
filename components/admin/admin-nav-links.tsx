"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav"

type AdminNavLinksProps = {
  onNavigate?: () => void
  className?: string
}

export function AdminNavLinks({ onNavigate, className }: AdminNavLinksProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role

  const items = ADMIN_NAV_ITEMS.filter(
    (item) => !item.superadminOnly || role === "superadmin",
  )

  return (
    <nav className={cn("flex flex-col gap-1 p-3", className)} aria-label="Admin">
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
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
