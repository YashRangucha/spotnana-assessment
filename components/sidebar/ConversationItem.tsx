"use client";

import { Conversation } from "@/lib/types";
import { useChatStore } from "@/lib/store";
import { MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ConversationItemProps {
  conversation: Conversation;
}

export const ConversationItem = ({ conversation }: ConversationItemProps) => {
  const { activeConversationId, setActiveConversation, deleteConversation } = useChatStore();
  const isActive = activeConversationId === conversation.id;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(conversation.id);
    toast.success("Conversation deleted");
  };

  const timeLabel = (() => {
    const now = new Date();
    const updated = new Date(conversation.updatedAt);
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  })();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setActiveConversation(conversation.id)}
      onKeyDown={(e) => e.key === "Enter" && setActiveConversation(conversation.id)}
      className={cn(
        "group w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer",
        isActive
          ? "bg-violet-600/15 border border-violet-500/30 text-white"
          : "hover:bg-zinc-800/60 border border-transparent text-zinc-400 hover:text-zinc-200"
      )}
    >
      <MessageSquare
        className={cn(
          "w-4 h-4 mt-0.5 flex-shrink-0 transition-colors",
          isActive ? "text-violet-400" : "text-zinc-600 group-hover:text-zinc-400"
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate leading-tight">
          {conversation.title}
        </p>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[11px] text-zinc-600">{timeLabel}</span>
          <span className="text-[11px] text-zinc-600">
            {conversation.messages.length} msg{conversation.messages.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-all duration-150 p-1 rounded-lg",
          "hover:bg-red-500/20 hover:text-red-400 text-zinc-600",
          isActive && "opacity-100"
        )}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
