"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  Building2,
  Car,
  Heart,
  Sparkles,
} from "lucide-react";
import PunarvaLogo from "@/components/PunarvaLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@rescuebite.in");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.user.role === "ADMIN") router.push("/admin");
        else if (data.user.role === "VOLUNTEER") router.push("/volunteer");
        else if (data.user.role === "DONOR") router.push("/donate");
        else router.push("/map");
        router.refresh();
      } else {
        setError(data.error || "Login failed. Check your credentials.");
      }
    } catch (err: any) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const setDemo = (demEmail: string, demPw: string) => {
    setEmail(demEmail);
    setPassword(demPw);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden transition-colors">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-950 p-1 border border-slate-200 dark:border-emerald-900/40 flex items-center justify-center">
              <PunarvaLogo size={32} />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              Puna<span className="text-emerald-500">rva</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Sign In to Platform
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Access your food rescue dashboard, courier dispatch, or admin controls.
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick-Select */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-900/40 p-4 rounded-3xl backdrop-blur-md space-y-2.5 shadow-sm transition-colors">
          <div className="flex items-center justify-between text-xs pb-1">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Logins:
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Select to auto-fill</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDemo("admin@rescuebite.in", "admin123")}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-emerald-800/40 hover:border-emerald-500 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Super Admin
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">admin@rescuebite.in</div>
            </button>

            <button
              type="button"
              onClick={() => setDemo("donor@sayaji.com", "donor123")}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-emerald-800/40 hover:border-amber-400 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-500" /> Food Donor
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Sayaji Hotels Ltd.</div>
            </button>

            <button
              type="button"
              onClick={() => setDemo("volunteer@rescuebite.in", "volunteer123")}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-emerald-800/40 hover:border-cyan-400 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Volunteer Driver
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Karan Sharma</div>
            </button>

            <button
              type="button"
              onClick={() => setDemo("ngo@robinhoodarmy.org", "ngo123")}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-emerald-800/40 hover:border-purple-400 text-left transition-colors shadow-sm"
            >
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> NGO Partner
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Robin Hood Army</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-900/40 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-colors">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 text-center text-xs text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              Register as Donor, Volunteer, or NGO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

