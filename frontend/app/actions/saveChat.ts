"use server";

import connectDB from "@/db/connectDb";
import Chat from "@/models/Chats";

interface SaveChatProps {
  email: string;
  title: string;
  newMessage: {
    role: string;
    content: string;
    createdAt?: Date;
  };
}

export async function saveChat({ email, title, newMessage }: SaveChatProps) {
  await connectDB();

  // Ensure message has a timestamp
  const messageWithDate = {
    ...newMessage,
    createdAt: newMessage.createdAt || new Date(),
  };

  const result = await Chat.updateOne(
    { email, title },
    {
      $push: { messages: messageWithDate },
      $setOnInsert: { createdAt: new Date() }, // only when new doc is created
      $set: { updatedAt: new Date() },
    },
    { upsert: true }
  );
  const isNew = result.upsertedCount > 0;

  return { success: true, isnewChat: isNew };
}
