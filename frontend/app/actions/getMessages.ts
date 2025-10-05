"use server";

import connectDB from "@/db/connectDb";
import Chat from "@/models/Chats";
import { MessageSquareCode } from "lucide-react";

interface Message {
  role: string;
  content: string;
  createdAt: Date;
}

interface ChatType {
  email: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getMessages(data: { email: string; title: string }) {
  await connectDB();
  const chat = await Chat.findOne<ChatType>({
    email: data.email,
    title: data.title,
  }).lean();

  console.log(chat?.messages);

  return { success: true, messages : chat?.messages || [] };
}
