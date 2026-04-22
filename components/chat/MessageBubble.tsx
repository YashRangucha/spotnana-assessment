"use client";

import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group flex gap-3 px-6 py-2 message-enter", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-md shadow-violet-500/30 text-white text-xs font-bold">
            Y
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        )}
      </div>

      {/* Bubble + Actions */}
      <div className={cn("flex flex-col gap-1 max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "relative px-4 py-3 text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-gradient-to-br from-violet-600 to-violet-700 text-white rounded-2xl rounded-tr-sm shadow-violet-500/20"
              : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none
              prose-p:leading-relaxed prose-p:my-1.5
              prose-headings:text-zinc-100 prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1.5
              prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
              prose-strong:text-white prose-strong:font-semibold
              prose-em:text-zinc-300
              prose-code:text-violet-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-zinc-800/80 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-3 prose-pre:overflow-x-auto
              prose-ol:my-2 prose-ol:pl-5 prose-ol:space-y-1
              prose-ul:my-2 prose-ul:pl-5 prose-ul:space-y-1
              prose-li:text-zinc-200 prose-li:leading-relaxed prose-li:marker:text-violet-400
              prose-blockquote:border-l-violet-500 prose-blockquote:text-zinc-400 prose-blockquote:pl-3 prose-blockquote:my-2
              prose-hr:border-zinc-700
              prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
              prose-table:text-sm prose-th:text-zinc-300 prose-td:text-zinc-400
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp + Copy */}
        <div className={cn(
          "flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          isUser ? "flex-row-reverse" : "flex-row"
        )}>
          <span className="text-[10px] text-zinc-600">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button
            onClick={handleCopy}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
