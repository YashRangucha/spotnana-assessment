"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/lib/store";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Sparkles, Zap, Code2, BookOpen } from "lucide-react";

const SUGGESTIONS = [
  { icon: Sparkles, label: "Explain quantum computing simply" },
  { icon: Code2, label: "Write a React custom hook for debounce" },
  { icon: Zap, label: "What makes a great frontend engineer?" },
  { icon: BookOpen, label: "Best system design patterns for scale" },
];

interface ChatWindowProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatWindow = ({ onSuggestionClick }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { getActiveConversation, isLoading } = useChatStore();
  const conversation = getActiveConversation();
  const messages = conversation?.messages ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold shimmer-text">AI Chat Studio</h1>
            <p className="text-zinc-500 text-sm mt-2 max-w-xs">
              Powered by Groq · llama-3.1-8b-instant · Ultra-fast inference
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-2">
          {SUGGESTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => onSuggestionClick(label)}
              className="group flex items-start gap-3 text-left px-4 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500/50 text-zinc-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-violet-500/10 hover:shadow-lg"
            >
              <Icon className="w-4 h-4 mt-0.5 text-violet-400 flex-shrink-0 group-hover:text-violet-300 transition-colors" />
              <span className="text-sm leading-snug">{label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-6 space-y-1">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};
