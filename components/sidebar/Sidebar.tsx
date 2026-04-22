"use client";

import { useChatStore } from "@/lib/store";
import { ConversationItem } from "./ConversationItem";
import { ClearButton } from "./ClearButton";
import { SquarePen, MessageSquareDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { conversations, createNewConversation } = useChatStore();

  const handleNewChat = () => {
    createNewConversation();
    onClose();
  };

  const grouped = {
    today: conversations.filter((c) => {
      const diff = Date.now() - new Date(c.updatedAt).getTime();
      return diff < 86400000;
    }),
    older: conversations.filter((c) => {
      const diff = Date.now() - new Date(c.updatedAt).getTime();
      return diff >= 86400000;
    }),
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-30 flex flex-col",
          "bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800/60",
          "transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/20">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-200">AI Chat Studio</span>
          </div>
          <button
            onClick={handleNewChat}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-violet-400 transition-all duration-150"
            title="New chat"
          >
            <SquarePen className="w-4 h-4" />
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <MessageSquareDashed className="w-8 h-8 text-zinc-700" />
              <div>
                <p className="text-sm text-zinc-500 font-medium">No conversations yet</p>
                <p className="text-xs text-zinc-700 mt-0.5">Start a chat to see history here</p>
              </div>
            </div>
          ) : (
            <>
              {grouped.today.length > 0 && (
                <div className="space-y-0.5">
                  <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider px-3 mb-2">
                    Today
                  </p>
                  {grouped.today.map((conv) => (
                    <ConversationItem key={conv.id} conversation={conv} />
                  ))}
                </div>
              )}
              {grouped.older.length > 0 && (
                <div className="space-y-0.5">
                  <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider px-3 mb-2">
                    Older
                  </p>
                  {grouped.older.map((conv) => (
                    <ConversationItem key={conv.id} conversation={conv} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-2 py-3 border-t border-zinc-800/60 space-y-1">
          <ClearButton />
          <div className="px-3 py-2">
            <p className="text-[11px] text-zinc-700">
              Powered by Groq · llama-3.1-8b-instant
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
