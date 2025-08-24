// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Bot, Settings, Search, Library, Plus, Mic } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-gray-950 transition-all duration-300 flex flex-col`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className={`${open ? "block" : "hidden"} text-xl font-bold`}>
            Dashboard
          </h2>
          <button onClick={() => setOpen(!open)} className="p-1">
            ☰
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-md"
          >
            <Home size={20} />
            {open && <span>Home</span>}
          </Link>
          <Link
            href="/dashboard/chatbot"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-md"
          >
            <Bot size={20} />
            {open && <span>Chatbot</span>}
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-md"
          >
            <Settings size={20} />
            {open && <span>Settings</span>}
          </Link>
          <Link
            href="/dashboard/library"
            className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-md"
          >
            <Library size={20} />
            {open && <span>Library</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-gray-100 text-gray-900 flex items-center justify-between px-6 shadow">
          <h1 className="font-semibold">My Dashboard</h1>
          <div className="flex gap-2">
          <Button className="px-4 py-2 border-2 border-indigo-600 bg-white rounded-md hover:bg-indigo-700 text-indigo-600 transition hover:text-white">
            Sign Up
          </Button>
          <Button className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 text-white transition">
            Sign In
          </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 text-gray-900">
          {children}

          {/* Example ChatGPT-style input at bottom */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center w-full max-w-xl bg-gray-200 rounded-full p-2 shadow">
              <Plus className="ml-3 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Ask anything"
                className="flex-1 bg-transparent px-3 outline-none text-gray-800"
              />
              <Mic className="mr-3 text-gray-500" size={20} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
