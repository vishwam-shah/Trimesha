import type { LucideIcon } from "lucide-react"
import { LayoutDashboard, Package } from "lucide-react"

export type AdminNavItem = {
  href: string
  label: string
  description?: string
  icon: LucideIcon
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    description: "Summary and quick links",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    description: "Carousel items on the public products page",
    icon: Package,
  },
]

export function getAdminPageMeta(pathname: string): {
  title: string
  description?: string
} {
  const exact = ADMIN_NAV_ITEMS.find((item) => item.href === pathname)
  if (exact) {
    return { title: exact.label, description: exact.description }
  }
  const sorted = [...ADMIN_NAV_ITEMS].sort(
    (a, b) => b.href.length - a.href.length,
  )
  const nested = sorted.find((item) => pathname.startsWith(`${item.href}/`))
  if (nested) {
    return { title: nested.label, description: nested.description }
  }
  return { title: "Admin" }
}
