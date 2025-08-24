"use client";
import Link from "next/link";
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl glass-strong glass-ring">
        <h2 className="text-2xl font-bold text-white text-center">Create Account</h2>
        <p className="text-slate-300 text-center text-sm mt-2">
          Sign up to get started
        </p>

        <form className="mt-6 space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <Link href="./login"><button 
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            Sign Up
          </button></Link>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-400 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
