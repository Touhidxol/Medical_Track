"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";  // ✅ added
import { Button } from "@/components/ui/button";
import { Settings, Library, MessagesSquare } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"
import { getChatTitles } from "../actions/getChatTitles";
import { ChatProvider, useChat } from "../context/ChatContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </ChatProvider>
  );
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { chats, setChats, activeChat, setActiveChat } = useChat();

  useEffect(() => {
    const fetchChats = async () => {
      if (session?.user?.email) {
        const chatArray = await getChatTitles({ email: session.user.email });
        setChats(chatArray.chatTitles);
      }
    }
    if (status === "authenticated") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    fetchChats();
  }, [status, session]);

  const handleLogout = () => {
    signOut();
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

        <nav className="overflow-y-auto p-4 space-y-3 overflow-hidden">
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

        {open && (
          <div className="flex-1 flex flex-col p-2">
            <p className="text-white/50 p-2">Chats</p>
            {chats ? (
              chats.map((title) => (
                <div
                  key={title}
                  onClick={() => setActiveChat(title)}
                  className={`${activeChat == title ? "bg-white/5" : ""}w-full p-2 hover:bg-white/5 rounded-md cursor-pointer`}>
                  <p className="text-base">{title}</p>
                </div>
              ))
            ) : (
              <p className="text-white/50 w-full">No Chats to Show</p>
            )}
          </div>
        )}
        {!open && <div className="flex-1"></div>}

        <footer>
          {loggedIn ? (
            <div className={`${open ? "" : "justify-center"} flex gap-2 p-2 px-4 my-4 items-center `}>
              <div className="flex justify-center items-center bg-blue-600 rounded-full h-10 w-10"><p className="font-bold">{session?.user?.name ? session?.user?.name[0] : "A"}</p></div>
              <div className={`${open ? "block" : "hidden"} flex flex-col flex-1`}>
                <p className="truncate max-w-[120px]">{session?.user?.name}</p>
                <p className="text-sm text-gray-500 truncate max-w-[120px]">{session?.user?.email}</p>
              </div>
              <div
                onClick={handleLogout}
                className={`${open ? "block" : "hidden"} h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-white/5`}
              >
                <img
                  src="/logout.svg"
                  alt="logout"
                  className="w-[16px] object-contain"
                />
              </div>
            </div>
          ) : (
            open ? (
              <div className="flex flex-col gap-2 p-2 px-4 my-4 items-center ">
                <p className="text-sm text-white/70">Sign In to get full chat experience</p>
                <button className="cursor-pointer w-full p-2 px-4 bg-white/95 text-black rounded-full hover:bg-white">
                  Sign In
                </button>
                <button className="cursor-pointer w-full p-2 px-4 rounded-full border border-white/15 hover:bg-white/5">
                  Sign Up for free
                </button>
              </div>
            ) : (
              <div className="hidden">
              </div>
            )
          )}
        </footer>
      </aside>

      {/* Main Content */}
      <div className="h-full flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-1/10 bg-[#212121] border-b border-white/10 text-white flex items-center justify-between px-6 shadow">
          <div className="flex gap-4 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-1 cursor-w-resize md:hidden block">
                  ☰
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-[#212121] text-white/95 border-0 flex flex-col"
              >
                <SheetHeader>
                  <SheetTitle className="text-white text-xl font-semibold">MediChat</SheetTitle>
                </SheetHeader>

                {/* main navigation area takes available space */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-3">
                  <Link
                    href="/dashboard"
                    className={`flex items-center space-x-3 px-3 hover:bg-white/5 p-2 rounded-md`}
                  >
                    <MessagesSquare size={20} />
                    <span>Chat</span>
                  </Link>
                  <Link
                    href="/dashboard/library"
                    className={`flex items-center space-x-3 px-3 hover:bg-white/5 p-2 rounded-md`}
                  >
                    <Library size={20} />
                    <span>Library</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={`flex items-center space-x-3 px-3 hover:bg-white/5 p-2 rounded-md`}
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </Link>
                </nav>

                {/* footer sticks to bottom */}
                <footer className="p-4 border-t border-white/10">
                  {loggedIn ? (
                    <div
                      className={`flex gap-2 items-center`}
                    >
                      <div className="flex justify-center items-center bg-blue-600 rounded-full h-10 w-10">
                        <p className="font-bold">
                          {session?.user?.name ? session?.user?.name[0] : "A"}
                        </p>
                      </div>
                      <div className={`flex flex-col flex-1`}>
                        <p className="truncate max-w-[200px]">{session?.user?.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{session?.user?.email}</p>
                      </div>
                      <div
                        onClick={handleLogout}
                        className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-white/5`}
                      >
                        <img
                          src="/logout.svg"
                          alt="logout"
                          className="w-[16px] object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 items-center">
                      <p className="text-sm text-white/70">
                        Sign In to get full chat experience
                      </p>
                      <button className="cursor-pointer w-full p-2 px-4 bg-white/95 text-black rounded-full hover:bg-white">
                        Sign In
                      </button>
                      <button className="cursor-pointer w-full p-2 px-4 rounded-full border border-white/15 hover:bg-white/5">
                        Sign Up for free
                      </button>
                    </div>
                  )}
                </footer>
              </SheetContent>

            </Sheet>

            <h1 className="font-semibold text-xl">MediChat</h1>
          </div>
          <div className="flex">
            {loggedIn ? (
              <div className="h-10 w-10 flex justify-center items-center bg-blue-600 rounded-full">
                <p className="font-bold">{session?.user?.name ? session?.user?.name[0] : "A"}</p>
              </div>
            ) : (
              <Button
                onClick={() => { router.push("../auth/login"); }}
                className="px-4 py-2 bg-white/95 rounded-md hover:bg-white text-black transition cursor-pointer"
              >
                Sign In
              </Button>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="relative h-9/10 flex flex-col items-center p-2 bg-[#212121] text-gray-100">
          {children}
        </main>
      </div >
    </div >
  );
}
