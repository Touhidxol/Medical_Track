"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Bot, Settings, Search, Library, Plus, Mic } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#212121] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${open ? "w-64 bg-[#181818]" : "w-20 bg-[#212121] "} md:flex hidden transition-all border-r border-white/10 duration-300 flex-col`}
      >
        {/* Logo + Toggle */}
        <div className={`flex items-center ${open ? 'justify-between' : 'justify-center'} p-4 `}>
          <h2 className={`${open ? "block" : "hidden"} text-xl font-bold`}>
            Med
          </h2>
          <button onClick={() => setOpen(!open)} className="p-1 cursor-w-resize">
            ☰
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          <Link
            href="/dashboard"
            className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md `}
          >
            <Home size={20} />
            {open && <span>Home</span>}
          </Link>
          <Link
            href="/dashboard/chatbot"
            className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md `}
          >
            <Bot size={20} />
            {open && <span>Chatbot</span>}
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md `}
          >
            <Settings size={20} />
            {open && <span>Settings</span>}
          </Link>
          <Link
            href="/dashboard/library"
            className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md `}
          >
            <Library size={20} />
            {open && <span>Library</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="h-full flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-1/10 bg-[#212121] border-b border-white/10 text-white flex items-center justify-between px-6 shadow">
          <h1 className="font-semibold">MediChat</h1>
          <div className="flex gap-2">
            <Button className="px-4 py-2 bg-white/95 rounded-md hover:bg-white text-black transition cursor-pointer">
              Sign In
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="relative h-9/10 flex flex-col items-center p-2 bg-[#212121] text-gray-100">
          {children}
        </main>

      </div>
    </div>
  );
}
