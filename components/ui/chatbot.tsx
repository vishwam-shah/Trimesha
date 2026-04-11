'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  /** If omitted, uses `/api/v1/chat` (Gemini + `GEMINI_API_KEY`). */
  onSendMessage?: (messages: Message[]) => Promise<string | void>;
  className?: string;
  placeholder?: string;
  botName?: string;
  welcomeMessage?: string;
}

export function Chatbot({
  onSendMessage,
  className,
  placeholder = 'Type your message...',
  botName = 'Assistant',
  welcomeMessage = 'Hello! How can I help you today?',
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    const transcript = [...messages, userMessage];
    setMessages(transcript);
    setInputValue('');
    setIsTyping(true);

    try {
      let reply: string;
      if (onSendMessage) {
        const custom = await onSendMessage(transcript);
        reply =
          (custom && custom.trim()) ||
          'Thanks for your message! How else can I help?';
      } else {
        reply = await fetchDefaultReply(transcript);
      }
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content:
            'Something went wrong. Please try again, or email admin@trimesha.com.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        'flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-violet-200/60 bg-card shadow-[0_25px_50px_-12px_rgba(91,33,182,0.18)] dark:border-violet-800/40 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)]',
        className
      )}
    >
      {/* Header */}
      <div className="relative shrink-0 overflow-hidden border-b border-violet-200/30 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-4 py-4 text-white dark:border-violet-500/20">
        <div
          className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/4 h-24 w-24 rounded-full bg-violet-300/20 blur-xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-inner ring-2 ring-white/25 backdrop-blur-sm">
            <Bot className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-lg font-semibold tracking-tight">
                {botName}
              </h2>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-100 ring-1 ring-emerald-300/30">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
                Online
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-violet-100/90">
              <Sparkles className="size-3.5 shrink-0 opacity-90" />
              Ask about services, pricing, or careers
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-gradient-to-b from-muted/40 via-background to-muted/30 dark:from-gray-950/80 dark:via-gray-900/90 dark:to-gray-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(to right, rgb(139 92 246 / 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(139 92 246 / 0.07) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative space-y-4 p-4 sm:p-5">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn(
                  'flex gap-2 sm:gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-md shadow-violet-500/25 ring-2 ring-white dark:ring-gray-800">
                    <Bot className="h-4 w-4 text-white" strokeWidth={2} />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[min(85%,28rem)] rounded-2xl px-4 py-2.5 shadow-sm',
                    message.sender === 'user'
                      ? 'rounded-br-md bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-violet-500/20'
                      : 'rounded-bl-md border border-border/60 bg-card/95 text-card-foreground backdrop-blur-sm dark:border-violet-900/40 dark:bg-gray-800/95'
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>
                  <p
                    className={cn(
                      'mt-1.5 text-[11px] tabular-nums',
                      message.sender === 'user'
                        ? 'text-white/65'
                        : 'text-muted-foreground'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted ring-2 ring-background dark:bg-gray-700 dark:ring-gray-900">
                    <User
                      className="h-4 w-4 text-muted-foreground dark:text-gray-200"
                      strokeWidth={2}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 sm:gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-md ring-2 ring-white dark:ring-gray-800">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="rounded-2xl rounded-bl-md border border-border/60 bg-card/95 px-4 py-3 shadow-sm dark:border-violet-900/40 dark:bg-gray-800/95">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-violet-500 dark:bg-violet-400"
                      animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} className="h-px shrink-0" aria-hidden />
        </div>
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-violet-200/40 bg-card/80 p-3 backdrop-blur-md dark:border-violet-900/35 dark:bg-gray-900/90 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-11 flex-1 rounded-xl border-violet-200/50 bg-background/90 shadow-inner focus-visible:border-violet-400 focus-visible:ring-violet-500/25 dark:border-violet-800/50 dark:bg-gray-950/80"
            aria-label="Message"
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-purple-500 disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
