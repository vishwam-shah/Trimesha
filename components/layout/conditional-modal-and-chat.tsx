"use client"

import { usePathname } from "next/navigation"

import ModalRoot from "@/components/ui/modal-root"
import { ChatbotWidget } from "@/components/ui/chatbot-widget"

const HIDE_PATHS = ["/login", "/signup"]

export function ConditionalModalAndChat() {
  const pathname = usePathname()
  if (pathname && HIDE_PATHS.includes(pathname)) {
    return null
  }
  return (
    <>
      <ModalRoot />
      <ChatbotWidget
        welcomeMessage="Hi! I'm Trimesha AI. Ask about what we build, our services, or email us at admin@trimesha.com."
      />
    </>
  )
}
