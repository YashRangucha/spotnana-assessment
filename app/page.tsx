"use client";

import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "@/lib/store";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { PromptInput } from "@/components/chat/PromptInput";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/chat/Header";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { initStore } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sendMessage } = useChat();

  useEffect(() => {
    initStore();
  }, [initStore]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  return (
    <div className="flex h-screen bg-[#080808] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex flex-col flex-1 min-w-0 relative">
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <ChatWindow onSuggestionClick={handleSuggestionClick} />
        <PromptInput />
      </main>
    </div>
  );
}
