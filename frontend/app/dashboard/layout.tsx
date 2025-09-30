"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";  // ✅ added
import { Button } from "@/components/ui/button";
import { Home, Bot, Settings, Library, MessagesSquare } from "lucide-react";


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
    <div className="flex h-screen bg-[#212121] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${open ? "w-64 bg-[#181818]" : "w-20 bg-[#212121] "} md:flex hidden transition-all border-r border-white/10 duration-300 flex-col`}
      >
        <div className={`flex items-center ${open ? 'justify-between' : 'justify-center'} p-4 `}>
          <h2 className={`${open ? "block" : "hidden"} text-xl font-bold`}>
            Med
          </h2>
          <button onClick={() => setOpen(!open)} className="p-1 cursor-w-resize">
            ☰
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-3 overflow-hidden">
          <Link href="/dashboard" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 px-3 hover:bg-white/5 p-2 rounded-md`}>
            <MessagesSquare size={20} />
            {open && <span>Chat</span>}
          </Link>
          <Link href="/dashboard/library" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 px-3 hover:bg-white/5 p-2 rounded-md`}>
            <Library size={20} />
            {open && <span>Library</span>}
          </Link>
          <Link href="/dashboard/settings" className={`flex items-center ${open ? "justify-start" : "justify-center"} space-x-3 px-3 hover:bg-white/5 p-2 rounded-md`}>
            <Settings size={20} />
            {open && <span>Settings</span>}
          </Link>
        </nav>

        <footer>
          <div className={`${open ? "" : "justify-center"} flex gap-2 p-2 px-4 my-4 items-center `}>
            <div className="flex justify-center items-center bg-red-500 rounded-full h-10 w-10"><p>P</p></div>
            <div className={`${open ? "block" : "hidden"} flex flex-col flex-1`}>
              <p>User Name</p>
              <p className="text-sm text-gray-500">user@email.co</p>
            </div>
            <div className={`${open ? "block" : "hidden"} h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-white/5`}>
              <img
                src="/logout.svg"
                alt="logout"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </footer>
      </aside>

      {/* Main Content */}
      <div className="h-full flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-1/10 bg-[#212121] border-b border-white/10 text-white flex items-center justify-between px-6 shadow">
          <h1 className="font-semibold">MediChat</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => { router.push("../auth/login"); }}
              className="px-4 py-2 bg-white/95 rounded-md hover:bg-white text-black transition cursor-pointer">
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
