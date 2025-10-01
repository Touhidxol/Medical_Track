"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"


export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [IsVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error as user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: any = {};

    if (!form.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (!form.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // 🔑 Call NextAuth with credentials provider
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false, // prevent auto redirect so you can handle manually
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful!");
      router.push("/dashboard");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl glass-strong glass-ring">
        <h2 className="text-2xl font-bold text-white text-center">Welcome Back</h2>
        <p className="text-slate-300 text-center text-sm mt-2">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border ${errors.email ? "border-red-500" : "border-white/20"
                } text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-indigo-400"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={IsVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border ${errors.password ? "border-red-500" : "border-white/20"
                } text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500" : "focus:ring-indigo-400"
                }`}
            />
            <div
              onClick={() => setIsVisible(!IsVisible)}
              className={`text-white ${IsVisible ? "opacity-100" : "opacity-30"
                } absolute right-3 top-3 cursor-pointer`}
            >
              👁
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>

      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

    </div>
  );
}
