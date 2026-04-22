"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import { useChat } from "@/hooks/useChat";
import { useChatStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const PromptInput = () => {
  const { input, setInput, sendMessage, isLoading, error } = useChat();
  const { getActiveConversation } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 180)}px`;
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
  };

  const conversation = getActiveConversation();
  const isEmpty = !input.trim();
  const charCount = input.length;
  const isNearLimit = charCount > 3500;

  return (
    <div className="border-t border-zinc-800/60 bg-black/40 backdrop-blur-xl px-4 pb-6 pt-4">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Input Box */}
        <div
          className={cn(
            "relative flex items-end gap-2 rounded-2xl border px-4 py-3 transition-all duration-200",
            "bg-zinc-900/80 backdrop-blur-sm",
            isLoading
              ? "border-zinc-700"
              : isEmpty
              ? "border-zinc-700/60 hover:border-zinc-600"
              : "border-violet-500/60 shadow-lg shadow-violet-500/10"
          )}
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              conversation?.messages.length === 0
                ? "Ask me anything..."
                : "Continue the conversation..."
            }
            disabled={isLoading}
            rows={1}
            className="flex-1 resize-none bg-transparent border-0 shadow-none focus-visible:ring-0 text-zinc-100 placeholder:text-zinc-600 text-sm leading-relaxed min-h-[24px] max-h-[180px] py-0 px-0"
          />

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={isEmpty || isLoading}
            size="sm"
            className={cn(
              "rounded-xl h-9 w-9 p-0 flex-shrink-0 transition-all duration-200",
              !isEmpty && !isLoading
                ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30 scale-100"
                : "bg-zinc-800 text-zinc-600 scale-95"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] text-zinc-700">
            Enter to send · Shift+Enter for new line
          </p>
          <p className={cn("text-[11px] transition-colors", isNearLimit ? "text-amber-500" : "text-zinc-700")}>
            {charCount > 0 && `${charCount} chars`}
          </p>
        </div>
      </div>
    </div>
  );
};
