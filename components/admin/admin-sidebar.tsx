"use client"

import Link from "next/link"

import { AdminNavLinks } from "@/components/admin/admin-nav-links"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function AdminSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:flex-col">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link
          href="/dashboard"
          className="text-sm font-semibold tracking-tight text-sidebar-foreground"
        >
          Trimesha Admin
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <AdminNavLinks className="py-2" />
      </ScrollArea>
      <Separator className="bg-sidebar-border" />
    </aside>
  )
}
