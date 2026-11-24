"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  Car,
  Building2,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import PunarvaLogo from "@/components/PunarvaLogo";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "VOLUNTEER";

  const [role, setRole] = useState(initialRole.toUpperCase());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    businessType: "Restaurant",
    fssaiLicense: "",
    vehicleType: "Motorcycle",
    darpanId: "",
    registrationNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (role === "DONOR") router.push("/donate");
      else if (role === "VOLUNTEER") router.push("/volunteer");
      else if (role === "NGO") router.push("/ngo");
      else router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl space-y-8 relative z-10">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-950 p-1 border border-slate-200 dark:border-emerald-900/40 flex items-center justify-center">
            <PunarvaLogo size={32} />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            Puna<span className="text-emerald-500">rva</span>
          </span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Join the Food Rescue Mission
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Choose your role to activate your citizen impact account.
        </p>
      </div>

      {/* Role Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: "VOLUNTEER", label: "Volunteer Driver", icon: Car },
          { id: "DONOR", label: "Food Donor", icon: Heart },
          { id: "NGO", label: "NGO Partner", icon: Building2 },
          { id: "COMMUNITY", label: "Advocate", icon: Users },
        ].map((r) => {
          const IconC = r.icon;
          const isSel = role === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                isSel
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-bold"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-emerald-950 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs"
              }`}
            >
              <IconC className="w-5 h-5" />
              <span className="text-xs font-semibold">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-xl transition-colors">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name / Rep Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Aayush Batole"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone (+91)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="97708 69581"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900/60 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                required
              />
            </div>
          </div>

          {/* Role specific fields */}
          {role === "DONOR" && (
            <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/30 space-y-3">
              <span className="font-bold text-amber-600 dark:text-amber-400">Donor Business Details</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Establishment Name</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Radisson Blu Banquets"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900 text-slate-900 dark:text-white shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">FSSAI License (Optional)</label>
                  <input
                    type="text"
                    value={formData.fssaiLicense}
                    onChange={(e) => setFormData({ ...formData, fssaiLicense: e.target.value })}
                    placeholder="14-digit license"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900 text-slate-900 dark:text-white shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          {role === "VOLUNTEER" && (
            <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/30 space-y-3">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">Volunteer Fleet Details</span>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Vehicle Type</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900 text-slate-900 dark:text-white shadow-inner"
                >
                  <option value="Motorcycle">Motorcycle (Two-Wheeler)</option>
                  <option value="Scooter">Scooter / Electric Bike</option>
                  <option value="Car">Car / Sedan / SUV</option>
                  <option value="Van">Cargo Van / E-Rickshaw</option>
                </select>
              </div>
            </div>
          )}

          {role === "NGO" && (
            <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/30 space-y-3">
              <span className="font-bold text-amber-600 dark:text-amber-400">NGO Registration & Darpan ID</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">NITI Aayog Darpan ID</label>
                  <input
                    type="text"
                    value={formData.darpanId}
                    onChange={(e) => setFormData({ ...formData, darpanId: e.target.value })}
                    placeholder="MP/2021/028491"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900 text-slate-900 dark:text-white shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Registration No</label>
                  <input
                    type="text"
                    value={formData.registrationNo}
                    onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                    placeholder="REG-8841"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-900 text-slate-900 dark:text-white shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>{loading ? "Creating Account..." : `Register as ${role}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 text-center text-xs text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative transition-colors">
      <Suspense fallback={<div className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">Loading registration...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
