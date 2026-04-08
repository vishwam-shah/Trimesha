import type { LucideIcon } from "lucide-react"
import {
  BadgeDollarSign,
  Briefcase,
  LayoutDashboard,
  Package,
  Wrench,
  Users,
} from "lucide-react"

export type AdminNavItem = {
  href: string
  label: string
  description?: string
  icon: LucideIcon
  /** Only superadmin can see this link (e.g. user accounts) */
  superadminOnly?: boolean
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
  {
    href: "/dashboard/pricing",
    label: "Pricing",
    description: "Packages on the public pricing page",
    icon: BadgeDollarSign,
  },
  {
    href: "/dashboard/careers",
    label: "Careers",
    description: "Job listings on the public careers page",
    icon: Briefcase,
  },
  {
    href: "/dashboard/services",
    label: "Services",
    description: "Service cards and Learn more content",
    icon: Wrench,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    description: "Accounts, roles, and passwords",
    icon: Users,
    superadminOnly: true,
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
