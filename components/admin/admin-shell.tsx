"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

type AdminShellProps = {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileOpen(false))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  useEffect(() => {
    const el = document.documentElement
    const hadDark = el.classList.contains("dark")
    el.classList.add("dark")
    return () => {
      if (!hadDark) el.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user) {
      const q = encodeURIComponent(pathname ?? "/dashboard")
      router.replace(`/login?callbackUrl=${q}`)
      return
    }
    if (session.user.role !== "superadmin") {
      router.replace("/")
    }
  }, [session, status, router, pathname])

  if (
    status === "loading" ||
    !session?.user ||
    session.user.role !== "superadmin"
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
          />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
