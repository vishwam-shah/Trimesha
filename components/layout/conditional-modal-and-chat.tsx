"use client"

import { usePathname } from "next/navigation"

import ModalRoot from "@/components/ui/modal-root"
import { ChatbotWidget } from "@/components/ui/chatbot-widget"
import {
  CHATBOT_WIDGET_TITLE,
  CHATBOT_WIDGET_WELCOME,
} from "@/lib/chatbot-context"

const HIDE_ALL_PATHS = ["/login"]

export function ConditionalModalAndChat() {
  const pathname = usePathname()
  if (pathname && HIDE_ALL_PATHS.includes(pathname)) {
    return null
  }
  const hideChatbot =
    Boolean(pathname?.startsWith("/dashboard"))

  return (
    <>
      <ModalRoot />
      {!hideChatbot && (
        <ChatbotWidget
          botName={CHATBOT_WIDGET_TITLE}
          welcomeMessage={CHATBOT_WIDGET_WELCOME}
        />
      )}
    </>
  )
}
