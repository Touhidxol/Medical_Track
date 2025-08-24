// app/dashboard/layout.tsx (if using App Router)
"use client";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <nav className="space-y-3">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/chatbot">Chatbot</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-gray-100 flex items-center px-6 shadow">
          <h1 className="font-semibold">My Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
