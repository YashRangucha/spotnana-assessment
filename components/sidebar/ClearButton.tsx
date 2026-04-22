"use client";

import { useState } from "react";
import { useChatStore } from "@/lib/store";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ClearButton = () => {
  const { clearAllConversations, conversations } = useChatStore();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    clearAllConversations();
    setConfirming(false);
    toast.success("All conversations cleared");
  };

  if (conversations.length === 0) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200",
        confirming
          ? "bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25"
          : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/60 border border-transparent"
      )}
    >
      <Trash className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{confirming ? "Tap again to confirm" : "Clear all chats"}</span>
    </button>
  );
};
