"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


//const router = useRouter();

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [IsVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error as user types
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email.";
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(form.password))
      newErrors.password = " Include an uppercase letter, a number, and a special character.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    // if any errors exist, stop
    if (Object.keys(newErrors).length > 0) return;

    // Save to localStorage (temp storage)
    localStorage.setItem("userData", JSON.stringify(form));

    //alert("Account created successfully!");
    toast.success("Account created successfully!");
    //router.push("/auth/login");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl glass-strong glass-ring">
        <h2 className="text-2xl font-bold text-white text-center">Create Account</h2>
        <p className="text-slate-300 text-center text-sm mt-2">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border ${errors.name ? "border-red-500" : "border-white/20"
                } text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.name ? "focus:ring-red-500" : "focus:ring-indigo-400"
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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
            <div onClick={() => setIsVisible(!IsVisible)} className={`text-white ${IsVisible?"opacity-100":"opacity-30"} absolute right-3 top-3 cursor-pointer`}>👁</div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border ${errors.confirmPassword ? "border-red-500" : "border-white/20"
                } text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-indigo-400"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
