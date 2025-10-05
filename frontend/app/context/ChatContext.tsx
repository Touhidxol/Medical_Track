"use client";
import { createContext, useContext, useState, useEffect } from "react";

export interface Message {
  role: string;
  content: string;
  createdAt?: Date;
}

type ChatContextType = {
  chats: string[];
  activeChat: string ;
  messages: Message[] | any[];
  setChats: (chats: string[]) => void;
  setActiveChat: (activeChat: string ) => void;
  setMessages: (messages: any[]) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <ChatContext.Provider
      value={{ chats, setChats, activeChat, setActiveChat, messages, setMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
