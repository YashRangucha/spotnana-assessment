import { create } from "zustand";
import { Message, Conversation } from "./types";
import {
  saveConversations,
  loadConversations,
  generateId,
} from "./localStorage";

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  initStore: () => void;
  createNewConversation: () => string;
  setActiveConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<Message, "id">) => void;
  updateLastMessage: (conversationId: string, content: string) => void;
  deleteConversation: (id: string) => void;
  clearAllConversations: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getActiveConversation: () => Conversation | null;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  error: null,

  initStore: () => {
    const conversations = loadConversations();
    const activeId =
      conversations.length > 0 ? conversations[0].id : null;
    set({ conversations, activeConversationId: activeId });
  },

  createNewConversation: () => {
    const id = generateId();
    const newConversation: Conversation = {
      id,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => {
      const updated = [newConversation, ...state.conversations];
      saveConversations(updated);
      return { conversations: updated, activeConversationId: id };
    });
    return id;
  },

  setActiveConversation: (id: string) => {
    set({ activeConversationId: id });
  },

  addMessage: (conversationId: string, message: Omit<Message, "id">) => {
    const newMessage: Message = { ...message, id: generateId() };
    set((state) => {
      const updated = state.conversations.map((conv) => {
        if (conv.id !== conversationId) return conv;
        const updatedMessages = [...conv.messages, newMessage];
        const title =
          conv.messages.length === 0 && message.role === "user"
            ? message.content.slice(0, 40) + (message.content.length > 40 ? "..." : "")
            : conv.title;
        return {
          ...conv,
          messages: updatedMessages,
          title,
          updatedAt: new Date(),
        };
      });
      saveConversations(updated);
      return { conversations: updated };
    });
  },

  updateLastMessage: (conversationId: string, content: string) => {
    set((state) => {
      const updated = state.conversations.map((conv) => {
        if (conv.id !== conversationId) return conv;
        const messages = [...conv.messages];
        if (messages.length > 0) {
          messages[messages.length - 1] = {
            ...messages[messages.length - 1],
            content,
          };
        }
        return { ...conv, messages, updatedAt: new Date() };
      });
      saveConversations(updated);
      return { conversations: updated };
    });
  },

  deleteConversation: (id: string) => {
    set((state) => {
      const updated = state.conversations.filter((c) => c.id !== id);
      saveConversations(updated);
      const activeConversationId =
        state.activeConversationId === id
          ? updated.length > 0
            ? updated[0].id
            : null
          : state.activeConversationId;
      return { conversations: updated, activeConversationId };
    });
  },

  clearAllConversations: () => {
    saveConversations([]);
    set({ conversations: [], activeConversationId: null });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),

  getActiveConversation: () => {
    const { conversations, activeConversationId } = get();
    return (
      conversations.find((c) => c.id === activeConversationId) ?? null
    );
  },
}));
