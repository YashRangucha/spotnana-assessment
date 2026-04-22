"use client";

import { useChatStore } from "@/lib/store";
import { Menu, SquarePen, Zap } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { createNewConversation, getActiveConversation, isLoading } = useChatStore();
  const conversation = getActiveConversation();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-black/20 backdrop-blur-sm flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
          <span className="text-xs text-zinc-500 font-medium">
            {isLoading ? "Thinking..." : "Ready"}
          </span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2">
        {conversation ? (
          <p className="text-sm font-medium text-zinc-300 max-w-[200px] truncate">
            {conversation.title}
          </p>
        ) : (
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-sm font-medium text-zinc-300">New Chat</span>
          </div>
        )}
      </div>

      {/* Right */}
      <button
        onClick={() => createNewConversation()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500/40 text-zinc-400 hover:text-violet-400 transition-all duration-150 text-xs font-medium"
      >
        <SquarePen className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">New Chat</span>
      </button>
    </header>
  );
};
