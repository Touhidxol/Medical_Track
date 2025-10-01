"use server";

import connectDB from "@/db/connectDb";
import User from "@/models/User";
import { useSession, signIn, signOut } from "next-auth/react";
export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  await connectDB();

  // check if user already exists
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    return { success: false, error: "User with this email already exists." };
  }

  const user = new User(data);
  await user.save();

  return { success: true };
}
