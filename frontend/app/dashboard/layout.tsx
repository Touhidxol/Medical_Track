"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";  // ✅ added
import { Button } from "@/components/ui/button";
import { Home, Bot, Settings, Library, Plus, Mic, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";  // ✅ shadcn dropdown

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");  // ✅ store user name
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setLoggedIn(true);
      setUsername(parsed.name || "User");  // ✅ pull name from localStorage
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");  // ✅ clear session
    setLoggedIn(false);
    router.push("../auth/login");  // ✅ redirect to login
  };

  return (
    <div className="flex h-screen bg-[#363636] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${open ? "w-64" : "w-20"} bg-[#1b1b1b] transition-all duration-300 flex flex-col`}
      >
        <div className={`flex items-center ${open ? 'justify-between' : 'justify-center'} p-4 `}>
          <h2 className={`${open ? "block" : "hidden"} text-xl font-bold`}>
            Med
          </h2>
          <button onClick={() => setOpen(!open)} className="p-1">☰</button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          <Link href="/dashboard" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md`}>
            <Home size={20} />
            {open && <span>Home</span>}
          </Link>
          <Link href="/dashboard/chatbot" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md`}>
            <Bot size={20} />
            {open && <span>Chatbot</span>}
          </Link>
          <Link href="/dashboard/settings" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md`}>
            <Settings size={20} />
            {open && <span>Settings</span>}
          </Link>
          <Link href="/dashboard/library" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 hover:bg-gray-800 p-2 rounded-md`}>
            <Library size={20} />
            {open && <span>Library</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-24 bg-[#363636] border-b border-white/10 text-white flex items-center justify-between px-6 py-4 shadow">
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
        <main className="flex flex-col items-center p-6 bg-[#363636] text-gray-100 h-[95vh]">
          {children}
        </main>
      </div>
    </div>
  );
}
