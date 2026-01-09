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
  onSendMessage?: (message: string) => Promise<string | void>;
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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let reply = 'Thanks for your message!';

      if (onSendMessage) {
        const res = await onSendMessage(userMessage.content);
        reply = res || reply;
      }

      await new Promise((r) => setTimeout(r, 500));

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
          content: 'Something went wrong. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const tabs = useMemo(
    () => [
      { id: 'conversation', label: 'Conversation', icon: MessageSquare },
      { id: 'faqs', label: 'FAQs', icon: HelpCircle },
      { id: 'articles', label: 'Articles', icon: FileText },
    ],
    []
  );

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-linear-to-r from-purple-600 to-violet-600 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="text-white" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 w-[95vw] max-w-md h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-purple-600 to-violet-600 text-white">
              <div className="flex items-center gap-2">
                <Bot />
                <div>
                  <h2 className="font-semibold">{botName}</h2>
                  <span className="text-xs opacity-80">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X />
              </button>
            </header>

            {/* Tabs */}
            <nav className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={cn(
                    'flex-1 py-2 text-sm flex items-center justify-center gap-1',
                    activeTab === id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500'
                  )}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Content */}
            {activeTab === 'conversation' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex gap-2',
                        msg.sender === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      )}
                    >
                      {msg.sender === 'bot' && <Bot size={18} />}
                      <div
                        className={cn(
                          'rounded-xl px-3 py-2 text-sm max-w-[75%]',
                          msg.sender === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white dark:bg-gray-700'
                        )}
                      >
                        {msg.content}
                      </div>
                      {msg.sender === 'user' && <User size={18} />}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-sm text-gray-400">
                      {botName} is typing…
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message…"
                  />
                  <Button onClick={sendMessage} disabled={!input.trim()}>
                    <Send size={16} />
                  </Button>
                </div>
              </>
            )}

            {activeTab !== 'conversation' && (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Coming soon
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
