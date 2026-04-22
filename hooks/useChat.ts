import { useState } from "react";
import { useChatStore } from "@/lib/store";

export const useChat = () => {
  const [input, setInput] = useState("");
  const {
    isLoading,
    error,
    activeConversationId,
    createNewConversation,
    addMessage,
    setLoading,
    setError,
    getActiveConversation,
  } = useChatStore();

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    let conversationId = activeConversationId;

    if (!conversationId) {
      conversationId = createNewConversation();
    }

    addMessage(conversationId, {
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    });

    setInput("");
    setLoading(true);

    try {
      const conversation = getActiveConversation();
      const messages =
        conversation?.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })) ?? [];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      addMessage(conversationId, {
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    input,
    setInput,
    sendMessage,
    isLoading,
    error,
  };
};
