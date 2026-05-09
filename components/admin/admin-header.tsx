"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { ExternalLink, LogOut, Menu, User } from "lucide-react"

import { getAdminPageMeta } from "@/lib/admin-nav"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { AdminNavLinks } from "@/components/admin/admin-nav-links"

type AdminHeaderProps = {
  mobileOpen: boolean
  onMobileOpenChange: (open: boolean) => void
}

export function AdminHeader({
  mobileOpen,
  onMobileOpenChange,
}: AdminHeaderProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const meta = getAdminPageMeta(pathname ?? "")
  const email = session?.user?.email ?? "Admin"
  const initial = email.trim().charAt(0).toUpperCase() || "A"

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => onMobileOpenChange(true)}
        >
          <Menu className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold leading-tight">
            {meta.title}
          </h1>
          {meta.description ? (
            <p className="truncate text-xs text-muted-foreground md:text-sm">
              {meta.description}
            </p>
          ) : null}
        </div>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
          <Link href="/products">
            <ExternalLink className="mr-2 size-4" />
            Public products
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full"
              aria-label="Account menu"
            >
              <span className="text-sm font-medium">{initial}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="flex items-center gap-2 text-sm font-medium leading-none">
                  <User className="size-3.5 opacity-70" />
                  Account
                </p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/products" className="cursor-pointer sm:hidden">
                <ExternalLink className="mr-2 size-4" />
                View public products
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="sm:hidden" />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent
          side="left"
          className="flex h-full w-full max-w-[min(20rem,92vw)] flex-col gap-0 overflow-hidden border-r border-violet-500/10 bg-sidebar p-0 shadow-[4px_0_32px_-8px_rgba(0,0,0,0.12)] dark:border-violet-950/40 dark:shadow-[4px_0_32px_-8px_rgba(0,0,0,0.45)] sm:max-w-80"
        >
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <div className="relative shrink-0 border-b border-sidebar-border bg-gradient-to-br from-violet-600/90 via-purple-600/85 to-indigo-800/90 px-4 pb-4 pt-14 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Menu
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight">
              Trimesha Admin
            </p>
            <p className="mt-1 text-xs leading-relaxed text-violet-100/85">
              Jump to a section. Your place is saved when you close this panel.
            </p>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <AdminNavLinks
              layout="comfortable"
              onNavigate={() => onMobileOpenChange(false)}
              className="bg-sidebar text-sidebar-foreground"
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
