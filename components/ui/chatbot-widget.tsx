'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  X,
  MessageCircle,
  MessageSquare,
  HelpCircle,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';

type Sender = 'user' | 'bot';
type TabType = 'conversation' | 'faqs' | 'articles';

interface Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  botName?: string;
  welcomeMessage?: string;
  /** If omitted, messages are sent to `/api/v1/chat` (Gemini + `GEMINI_API_KEY`). */
  onSendMessage?: (messages: Message[]) => Promise<string | void>;
}

export function ChatbotWidget({
  botName = 'Trimesha AI',
  welcomeMessage = 'Hello! How can I help you today?',
  onSendMessage,
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('conversation');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchDefaultReply = useCallback(async (msgs: Message[]) => {
    const res = await fetch('/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: msgs.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'bot',
          content: m.content,
        })),
      }),
    });
    const data = (await res.json()) as { reply?: string; error?: string };
    if (!res.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data.reply?.trim() || 'Sorry, I could not generate a reply.';
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping, scrollToBottom]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    const transcript = [...messages, userMessage];
    setMessages(transcript);
    setInput('');
    setIsTyping(true);

    try {
      let reply: string;
      if (onSendMessage) {
        const res = await onSendMessage(transcript);
        reply = (res && res.trim()) || 'Thanks for your message!';
      } else {
        reply = await fetchDefaultReply(transcript);
      }

      await new Promise((r) => setTimeout(r, 350));

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: reply,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content:
            'Something went wrong. Please try again, or email admin@trimesha.com.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, messages, onSendMessage, fetchDefaultReply]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const tabs = useMemo(
    () =>
      [
        { id: 'conversation' as const, label: 'Chat', icon: MessageSquare },
        { id: 'faqs' as const, label: 'FAQs', icon: HelpCircle },
        { id: 'articles' as const, label: 'Guides', icon: FileText },
      ] as const,
    []
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            aria-label="Dismiss overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] sm:bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
          className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-[0_12px_40px_-8px_rgba(109,40,217,0.55)] ring-2 ring-white/20 transition hover:shadow-[0_16px_48px_-8px_rgba(109,40,217,0.65)] dark:ring-violet-400/20 sm:h-[3.75rem] sm:w-[3.75rem]"
          style={{
            bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
            right: "max(1.25rem, env(safe-area-inset-right, 0px))",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          <MessageCircle className="size-7" strokeWidth={2} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Trimesha"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex h-[min(640px,calc(100dvh-5.5rem))] w-[min(100vw-1.5rem,420px)] flex-col overflow-hidden rounded-2xl border border-violet-200/50 bg-card shadow-[0_25px_50px_-12px_rgba(91,33,182,0.22)] dark:border-violet-800/45 dark:bg-gray-950 dark:shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="relative shrink-0 overflow-hidden border-b border-violet-200/35 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-3 py-3.5 text-white dark:border-violet-500/25">
              <div
                className="pointer-events-none absolute -right-6 -top-10 h-24 w-24 rounded-full bg-white/10 blur-2xl"
                aria-hidden
              />
              <div className="relative flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-2 ring-white/25">
                    <Bot className="size-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold sm:text-base">
                      {botName}
                    </h2>
                    <p className="flex items-center gap-1 text-[11px] text-violet-100/90">
                      <Sparkles className="size-3 shrink-0" />
                      <span className="inline-flex items-center gap-1">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
                        Online
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <X className="size-5" strokeWidth={2} />
                </button>
              </div>
            </header>

            <nav className="flex shrink-0 gap-1 border-b border-border/60 bg-muted/30 p-1.5 dark:bg-gray-900/80">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition sm:text-[13px]',
                    activeTab === id
                      ? 'bg-card text-violet-700 shadow-sm dark:bg-gray-800 dark:text-violet-300'
                      : 'text-muted-foreground hover:bg-background/80 hover:text-foreground'
                  )}
                >
                  <Icon className="size-3.5 shrink-0 sm:size-4" strokeWidth={2} />
                  {label}
                </button>
              ))}
            </nav>

            {activeTab === 'conversation' && (
              <>
                <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.3] dark:opacity-[0.08]"
                    aria-hidden
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(139 92 246 / 0.06) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(139 92 246 / 0.06) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="relative space-y-3 p-3 sm:p-4">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            'flex gap-2',
                            msg.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          )}
                        >
                          {msg.sender === 'bot' && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-md ring-2 ring-background dark:ring-gray-950">
                              <Bot className="size-3.5 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              'max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm',
                              msg.sender === 'user'
                                ? 'rounded-br-md bg-gradient-to-br from-violet-600 to-purple-600 text-white'
                                : 'rounded-bl-md border border-border/60 bg-card/95 backdrop-blur-sm dark:border-violet-900/40 dark:bg-gray-800/95'
                            )}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <p
                              className={cn(
                                'mt-1 text-[10px] tabular-nums',
                                msg.sender === 'user'
                                  ? 'text-white/65'
                                  : 'text-muted-foreground'
                              )}
                            >
                              {msg.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          {msg.sender === 'user' && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted ring-2 ring-background dark:bg-gray-700 dark:ring-gray-950">
                              <User className="size-3.5 text-muted-foreground dark:text-gray-200" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
                          <Bot className="size-3.5 text-white" />
                        </div>
                        <div className="rounded-2xl rounded-bl-md border border-border/60 bg-card/95 px-3 py-2.5 dark:border-violet-900/40 dark:bg-gray-800/95">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-violet-500"
                                animate={{
                                  opacity: [0.35, 1, 0.35],
                                  y: [0, -2, 0],
                                }}
                                transition={{
                                  duration: 0.85,
                                  repeat: Infinity,
                                  delay: i * 0.12,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-px" aria-hidden />
                  </div>
                </div>

                <div className="shrink-0 border-t border-border/60 bg-card/90 p-2.5 backdrop-blur-md dark:bg-gray-900/95">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Message…"
                      className="min-h-10 flex-1 rounded-xl border-violet-200/45 bg-background text-sm dark:border-violet-800/45 dark:bg-gray-950/90"
                      aria-label="Type a message"
                    />
                    <Button
                      type="button"
                      size="icon"
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/20 disabled:opacity-40"
                      aria-label="Send"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'faqs' && (
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Quick answers
                </p>
                <ul className="space-y-2">
                  {[
                    {
                      q: 'What does Trimesha build?',
                      a: 'Web, mobile, and AI-powered products—see Services on the site.',
                    },
                    {
                      q: 'How do I get pricing?',
                      a: 'Open the Pricing page or ask me here for tier summaries.',
                    },
                    {
                      q: 'Careers?',
                      a: 'Visit Careers for open roles and how to apply.',
                    },
                  ].map((item) => (
                    <li
                      key={item.q}
                      className="rounded-xl border border-violet-200/40 bg-muted/30 p-3 text-sm dark:border-violet-900/35 dark:bg-gray-900/60"
                    >
                      <p className="font-semibold text-foreground">{item.q}</p>
                      <p className="mt-1 text-muted-foreground">{item.a}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Switch to <strong>Chat</strong> for a tailored reply.
                </p>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-600 dark:text-violet-400">
                  <FileText className="size-6" strokeWidth={2} />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Guides coming soon
                </p>
                <p className="mt-2 max-w-[240px] text-xs text-muted-foreground">
                  We&apos;re preparing articles on our process and stack. Use{' '}
                  <strong>Chat</strong> if you need something now.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
