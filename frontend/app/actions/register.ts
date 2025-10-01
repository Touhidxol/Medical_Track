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

  const res = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false, // prevent auto redirect so you can handle manually
  });

  if (res?.error) {
    return { success: false, error: "Something Went Wrong" };
  } else {
    console.log("Login successful!");
  }

  return { success: true };
}
