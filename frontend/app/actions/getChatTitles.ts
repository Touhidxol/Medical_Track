"use server";

import connectDB from "@/db/connectDb";
import Chat from "@/models/Chats";

export async function getChatTitles(data: { email: string }) {
  await connectDB();
  const chatArray = await Chat.find({ email: data.email });
  const chatTitles = chatArray.map((chat) => chat.title);

  return { success: true, chatTitles };
}
