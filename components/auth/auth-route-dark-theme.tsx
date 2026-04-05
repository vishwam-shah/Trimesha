"use client"

import { useEffect, type ReactNode } from "react"

export function AuthRouteDarkTheme({ children }: { children: ReactNode }) {
  useEffect(() => {
    const el = document.documentElement
    const hadDark = el.classList.contains("dark")
    el.classList.add("dark")
    return () => {
      if (!hadDark) el.classList.remove("dark")
    }
  }, [])
  return <>{children}</>
}
