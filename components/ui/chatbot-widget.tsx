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
  SendHorizontal,
  UserRound,
  X,
  Sparkles,
  MessageSquareText,
  CircleHelp,
  BookOpen,
  ChevronRight,
  CalendarPlus,
} from 'lucide-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';
import {
  CHATBOT_FALLBACK_REPLY,
  CHATBOT_FOOTER_SCOPE,
  CHATBOT_LAUNCHER_HINT,
  CHATBOT_PANEL_SCOPE_BUBBLE,
} from '@/lib/chatbot-context';
import { isBookingModalDeepLink } from '@/lib/booking-cta';
import { useModal } from '@/components/ui/animated-modal';

const BOT_AVATAR_ICON = 'mdi:face-woman-profile';

function isSafeInternalHref(raw: string): boolean {
  const href = raw.trim().split('#')[0].split('?')[0];
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  return /^\/[a-zA-Z0-9/_\-]*$/.test(href);
}

function pathToCtaLabel(path: string): string {
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return 'Go to home';
  const last = parts[parts.length - 1] ?? '';
  if (!last) return 'Open page';
  const words = last.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return `Go to ${words.join(' ')}`;
}

function ChatPageCta({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'mt-2 flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-xs font-semibold text-white shadow-md transition',
        'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'sm:text-[0.8125rem]',
      )}
    >
      <span className="truncate">{label}</span>
      <ChevronRight className="size-3.5 shrink-0 opacity-90" aria-hidden />
    </Link>
  );
}

function ChatBookCallCta({
  label,
  onOpenBooking,
  onNavigate,
}: {
  label: string;
  onOpenBooking: () => void;
  onNavigate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onOpenBooking();
        onNavigate();
      }}
      className={cn(
        'mt-2 flex w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-xs font-semibold text-white shadow-md transition',
        'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'sm:text-[0.8125rem]',
      )}
    >
      <CalendarPlus className="size-4 shrink-0 opacity-95" aria-hidden />
      <span className="truncate">{label}</span>
      <ChevronRight className="size-3.5 shrink-0 opacity-90" aria-hidden />
    </button>
  );
}

function BotMessageRichText({
  text,
  onNavigate,
  onOpenBooking,
}: {
  text: string;
  onNavigate: () => void;
  onOpenBooking: () => void;
}) {
  const re = /\[([^\]]+)\]\(([^)]+)\)|`(\/[a-zA-Z0-9/_\-]+)`/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      const chunk = text.slice(last, m.index);
      if (chunk) {
        nodes.push(
          <span key={`t-${k++}`} className="whitespace-pre-wrap">
            {chunk}
          </span>,
        );
      }
    }
    if (m[1] != null && m[2] != null) {
      const label = m[1];
      const rawHref = m[2].trim();
      if (isBookingModalDeepLink(rawHref)) {
        nodes.push(
          <ChatBookCallCta
            key={`b-${k++}`}
            label={label}
            onOpenBooking={onOpenBooking}
            onNavigate={onNavigate}
          />,
        );
      } else if (isSafeInternalHref(rawHref)) {
        const href = rawHref.split('#')[0].split('?')[0] || rawHref;
        nodes.push(
          <ChatPageCta key={`l-${k++}`} href={href} label={label} onNavigate={onNavigate} />,
        );
      } else {
        nodes.push(
          <span key={`r-${k++}`} className="whitespace-pre-wrap">
            {m[0]}
          </span>,
        );
      }
    } else if (m[3] != null) {
      const path = m[3];
      if (isBookingModalDeepLink(path)) {
        nodes.push(
          <ChatBookCallCta
            key={`bp-${k++}`}
            label="Book a call"
            onOpenBooking={onOpenBooking}
            onNavigate={onNavigate}
          />,
        );
      } else if (isSafeInternalHref(path)) {
        nodes.push(
          <ChatPageCta
            key={`p-${k++}`}
            href={path}
            label={pathToCtaLabel(path)}
            onNavigate={onNavigate}
          />,
        );
      } else {
        nodes.push(
          <span key={`r-${k++}`} className="whitespace-pre-wrap">
            {m[0]}
          </span>,
        );
      }
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    const chunk = text.slice(last);
    if (chunk) {
      nodes.push(
        <span key={`t-${k++}`} className="whitespace-pre-wrap">
          {chunk}
        </span>,
      );
    }
  }
  return <div className="min-w-0">{nodes}</div>;
}

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
  const { setOpen: setBookingModalOpen } = useModal();
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
    return data.reply?.trim() || CHATBOT_FALLBACK_REPLY;
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
          content: CHATBOT_FALLBACK_REPLY,
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
        { id: 'conversation' as const, label: 'Chat', icon: MessageSquareText },
        { id: 'faqs' as const, label: 'FAQs', icon: CircleHelp },
        { id: 'articles' as const, label: 'Guides', icon: BookOpen },
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
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/25"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {!isOpen && (
        <div
          className="fixed z-50 flex flex-col items-end gap-2"
          style={{
            bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
            right: "max(1.25rem, env(safe-area-inset-right, 0px))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="relative max-w-[220px] rounded-2xl rounded-br-md border border-violet-200/60 bg-background/95 px-3.5 py-2.5 text-sm font-medium text-foreground shadow-lg shadow-violet-500/10 backdrop-blur-md dark:border-violet-500/30 dark:bg-gray-900/95"
          >
            <span className="leading-snug">{CHATBOT_LAUNCHER_HINT}</span>
            <span
              className="absolute -bottom-1.5 right-4 size-3 rotate-45 border-b border-r border-violet-200/60 bg-background dark:border-violet-500/30 dark:bg-gray-900/95"
              aria-hidden
            />
          </motion.div>
          <motion.button
            aria-label={`Open chat: ${CHATBOT_LAUNCHER_HINT}`}
            title={CHATBOT_LAUNCHER_HINT}
            onClick={() => setIsOpen(true)}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-14 sm:w-14"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 shadow-[0_12px_40px_-8px_rgba(109,40,217,0.65),0_0_0_1px_rgba(255,255,255,0.18)_inset] ring-2 ring-white/30 transition-[box-shadow,ring-color] duration-300 group-hover:shadow-[0_16px_44px_-6px_rgba(109,40,217,0.72)] group-hover:ring-white/45"
              aria-hidden
            />
            <motion.span
              className="pointer-events-none absolute -inset-1 rounded-full bg-violet-400/35 blur-md"
              animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
            <motion.span
              className="relative flex items-center justify-center text-white"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Icon
                icon={BOT_AVATAR_ICON}
                className="size-[1.45rem] drop-shadow-md sm:size-[1.6rem]"
                aria-hidden
              />
            </motion.span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={botName}
            initial={{ opacity: 0, y: 32, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 right-3 z-50 mx-auto flex h-[min(640px,calc(100dvh-4.5rem))] max-w-[440px] flex-col overflow-hidden rounded-[1.25rem] border border-violet-300/35 bg-gradient-to-b from-background/98 via-background/96 to-muted/30 shadow-[0_25px_50px_-12px_rgba(76,29,149,0.35),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_80px_-20px_rgba(139,92,246,0.25)] backdrop-blur-2xl dark:border-violet-500/20 dark:from-gray-950/99 dark:via-gray-950/98 dark:to-violet-950/20 dark:shadow-[0_28px_56px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(139,92,246,0.12)_inset] sm:left-auto sm:right-[max(1.25rem,env(safe-area-inset-right))] sm:mx-0 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="relative shrink-0 overflow-hidden border-b border-white/10 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-900 px-4 pb-4 pt-4 text-white sm:px-5 sm:pb-5 sm:pt-5">
              <div
                className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-cyan-400/25 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-6 -top-20 h-44 w-44 rounded-full bg-fuchsia-400/30 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-0 left-1/4 h-24 w-64 rounded-full bg-indigo-500/20 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.07)_48%,transparent_62%)]"
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3.5">
                  <div className="relative flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl bg-white/18 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25)] ring-2 ring-white/25 backdrop-blur-md sm:h-14 sm:w-14">
                    <Icon
                      icon={BOT_AVATAR_ICON}
                      className="size-8 text-white sm:size-9"
                      aria-hidden
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-lg bg-white/95 text-violet-600 shadow-md ring-2 ring-violet-600/30 dark:bg-white dark:text-violet-700">
                      <Sparkles className="size-2.5" strokeWidth={2.5} aria-hidden />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-[1.05rem] font-semibold tracking-tight sm:text-lg">
                      {botName}
                    </h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] font-medium text-white/90">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-0.5 ring-1 ring-white/20 backdrop-blur-sm">
                        <Sparkles className="size-3 shrink-0 opacity-95" aria-hidden />
                        Trimesha-only assistant
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-50">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-55" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        </span>
                        Online
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white shadow-inner ring-1 ring-white/15 transition hover:bg-white/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <X className="size-5" strokeWidth={2.25} />
                </button>
              </div>
            </header>

            <nav
              className="relative shrink-0 border-b border-border/40 px-2.5 pb-2 pt-2.5 dark:border-white/[0.06]"
              aria-label="Chat sections"
            >
              <div className="flex gap-1 rounded-2xl bg-muted/55 p-1 dark:bg-gray-900/85">
                {tabs.map(({ id, label, icon: TabIcon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={cn(
                      'relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors sm:gap-2 sm:text-[13px]',
                      activeTab === id
                        ? 'text-violet-800 dark:text-violet-100'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {activeTab === id && (
                      <motion.div
                        layoutId="chatbot-tab-pill"
                        className="absolute inset-0 rounded-xl bg-background shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(139,92,246,0.12)] dark:bg-gray-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35),0_0_0_1px_rgba(139,92,246,0.2)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                      <TabIcon
                        className={cn(
                          'size-4 shrink-0',
                          activeTab === id
                            ? 'text-violet-600 dark:text-violet-300'
                            : 'opacity-80'
                        )}
                        strokeWidth={2}
                      />
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </nav>

            {activeTab === 'conversation' && (
              <>
                <div className="chat-widget-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.14]"
                    aria-hidden
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(139 92 246 / 0.055) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(139 92 246 / 0.055) 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/80 to-transparent dark:from-gray-950/90" aria-hidden />
                  <div className="relative space-y-5 px-4 py-5 sm:px-5">
                    <div
                      className="rounded-2xl border border-violet-200/50 bg-violet-500/[0.06] px-3 py-2.5 text-[11px] leading-snug text-muted-foreground dark:border-violet-500/25 dark:bg-violet-500/10"
                      role="note"
                    >
                      {CHATBOT_PANEL_SCOPE_BUBBLE}
                    </div>
                    <AnimatePresence initial={false} mode="popLayout">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          className={cn(
                            'flex gap-3',
                            msg.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          )}
                        >
                          {msg.sender === 'bot' && (
                            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 shadow-[0_4px_14px_-2px_rgba(91,33,182,0.45)] ring-2 ring-background dark:ring-gray-950">
                              <Icon icon={BOT_AVATAR_ICON} className="size-[1.15rem] text-white" aria-hidden />
                            </div>
                          )}
                          <div
                            className={cn(
                              'max-w-[min(88%,20rem)] rounded-[1.15rem] px-4 py-3 text-[0.8125rem] leading-relaxed sm:text-sm',
                              msg.sender === 'user'
                                ? 'rounded-br-md bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-[0_8px_24px_-6px_rgba(109,40,217,0.45)] ring-1 ring-white/15'
                                : 'rounded-bl-md border border-violet-200/50 bg-background/95 text-foreground shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-violet-500/25 dark:bg-gray-900/92 dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]'
                            )}
                          >
                            {msg.sender === 'bot' ? (
                              <BotMessageRichText
                                text={msg.content}
                                onNavigate={() => setIsOpen(false)}
                                onOpenBooking={() => setBookingModalOpen(true)}
                              />
                            ) : (
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            )}
                            <p
                              className={cn(
                                'mt-2.5 text-[10px] font-medium tabular-nums tracking-wide',
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
                            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-b from-muted to-muted/80 shadow-sm ring-2 ring-background dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/90 dark:ring-gray-950">
                              <UserRound className="size-4 text-muted-foreground dark:text-gray-200" strokeWidth={2} aria-hidden />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 shadow-md">
                          <Icon icon={BOT_AVATAR_ICON} className="size-[1.05rem] text-white" aria-hidden />
                        </div>
                        <div className="rounded-[1.15rem] rounded-bl-md border border-violet-200/45 bg-background/95 px-4 py-3.5 shadow-sm dark:border-violet-500/25 dark:bg-gray-900/92">
                          <div className="flex items-center gap-1.5">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500"
                                animate={{
                                  opacity: [0.35, 1, 0.35],
                                  y: [0, -5, 0],
                                }}
                                transition={{
                                  duration: 0.9,
                                  repeat: Infinity,
                                  delay: i * 0.15,
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

                <div className="shrink-0 border-t border-border/50 bg-gradient-to-t from-muted/40 via-background/98 to-background/98 p-3 pt-3.5 backdrop-blur-xl dark:from-gray-950 dark:via-gray-950/99 dark:to-gray-950/99 sm:p-4">
                  <div className="flex gap-2.5 sm:gap-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Message us…"
                      className="min-h-12 flex-1 rounded-2xl border-violet-200/55 bg-background/98 pl-4 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] placeholder:text-muted-foreground/75 focus-visible:border-violet-400/60 focus-visible:ring-violet-500/20 dark:border-violet-800/50 dark:bg-gray-900/90 dark:focus-visible:border-violet-500/50"
                      aria-label="Type a message"
                    />
                    <Button
                      type="button"
                      size="icon"
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-[0_6px_20px_-4px_rgba(109,40,217,0.5)] transition hover:from-violet-500 hover:to-indigo-600 hover:shadow-[0_8px_24px_-4px_rgba(109,40,217,0.55)] disabled:opacity-35"
                      aria-label="Send"
                    >
                      <SendHorizontal className="size-[1.2rem]" strokeWidth={2.1} />
                    </Button>
                  </div>
                  <p className="mt-2.5 text-center text-[10px] leading-snug text-muted-foreground/90">
                    <kbd className="rounded border border-border/60 bg-muted/50 px-1 py-px font-sans text-[9px] text-muted-foreground">
                      Enter
                    </kbd>{' '}
                    to send · {CHATBOT_FOOTER_SCOPE}
                  </p>
                </div>
              </>
            )}

            {activeTab === 'faqs' && (
              <div className="chat-widget-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
                <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-600/90 dark:text-violet-300/90">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20 dark:bg-violet-500/15">
                    <CircleHelp className="size-3.5" strokeWidth={2.25} aria-hidden />
                  </span>
                  Quick answers
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      q: 'What does Trimesha build?',
                      a: 'Web, mobile, and AI-powered products - see Services on the site.',
                    },
                    {
                      q: 'How do I book a call?',
                      a: 'Use the same booking window as “Book a call” in the header (Calendly time slots).',
                      bookCta: true as const,
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
                    <motion.li
                      key={item.q}
                      whileHover={{ y: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="group rounded-2xl border border-violet-200/40 bg-gradient-to-br from-background/95 to-muted/30 p-4 text-sm shadow-[0_2px_12px_-4px_rgba(76,29,149,0.12)] transition-[border-color,box-shadow] hover:border-violet-300/55 hover:shadow-[0_8px_24px_-8px_rgba(76,29,149,0.2)] dark:border-violet-500/20 dark:from-gray-900/90 dark:to-gray-900/40 dark:hover:border-violet-400/35"
                    >
                      <p className="flex items-start gap-2.5 font-semibold text-foreground">
                        <ChevronRight className="mt-0.5 size-4 shrink-0 text-violet-500 transition duration-200 group-hover:translate-x-0.5 dark:text-violet-400" aria-hidden />
                        {item.q}
                      </p>
                      <p className="mt-2.5 pl-6 text-[13px] leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                      {'bookCta' in item && item.bookCta ? (
                        <div className="mt-3 pl-6">
                          <ChatBookCallCta
                            label="Book a call"
                            onOpenBooking={() => setBookingModalOpen(true)}
                            onNavigate={() => setIsOpen(false)}
                          />
                        </div>
                      ) : null}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Switch to{' '}
                  <strong className="font-semibold text-violet-700 dark:text-violet-300">
                    Chat
                  </strong>{' '}
                  for a tailored reply.
                </p>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-8 text-center sm:p-10">
                <div className="mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500/18 via-purple-500/12 to-indigo-600/18 text-violet-600 shadow-inner ring-1 ring-violet-500/25 dark:text-violet-300 dark:ring-violet-400/20">
                  <BookOpen className="size-9" strokeWidth={1.65} aria-hidden />
                </div>
                <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  Guides coming soon
                </p>
                <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
                  We&apos;re preparing articles on our process and stack. Use{' '}
                  <strong className="text-violet-700 dark:text-violet-300">Chat</strong> if you
                  need something now.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
