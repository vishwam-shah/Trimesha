"use client";

import { Chatbot } from "@/components/ui/chatbot";

export default function ChatbotPage() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-gray-50 to-gray-100 px-3 py-6 dark:from-gray-900 dark:to-gray-800 sm:px-6 md:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <div className="mb-6 shrink-0 px-1 text-center sm:mb-8">
          <h1 className="mb-3 text-balance break-words text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
            AI Chatbot
          </h1>
          <p className="text-pretty text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Chat with our intelligent assistant
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <Chatbot
            className="mx-auto min-h-[min(520px,70dvh)] w-full max-w-4xl flex-1 shadow-2xl"
            botName="Trimesha AI"
            welcomeMessage="Hello! I'm Trimesha AI. Ask about our services, pricing, careers, or how to reach us at admin@trimesha.com."
            placeholder="Ask about Trimesha..."
          />
        </div>
      </div>
    </div>
  );
}
