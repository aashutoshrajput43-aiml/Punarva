"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Utensils,
  Car,
  Building2,
  Users,
  Radio,
  Link2,
  Snowflake,
  Home as HomeIcon,
  Recycle,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Cpu,
  Calculator,
  Award,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    kgRescued: 10450,
    mealsEnabled: 31350,
    activeVolunteers: 520,
    co2Saved: 26125,
  });

  useEffect(() => {
    fetch("/api/impact")
      .then((res) => res.json())
      .then((data) => {
        if (data?.totalRescuedKg) {
          setStats({
            kgRescued: data.totalRescuedKg,
            mealsEnabled: data.totalMealsEnabled,
            activeVolunteers: data.activeVolunteers,
            co2Saved: data.totalCarbonOffset,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 transition-colors">
      {/* Background radial glow & particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-80 right-10 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Zero Waste Initiative Callout Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{t("zeroWasteInitiative", "Zero Waste Initiative")}</span>
          <span className="text-emerald-500/50">•</span>
          <span className="font-bold text-slate-900 dark:text-white">
            Punarva — Where Every Resource Returns
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
            {t("heroTitle1", "No food wasted.")}
          </span>{" "}
          <br className="hidden sm:inline" />
          <span className="text-slate-900 dark:text-white">{t("heroTitle2", "No one left hungry.")}</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed px-2">
          {t("heroSubtitle", "AI-powered surplus food rescue and circular waste management connecting food donors, verified NGOs, volunteer couriers, and recyclers across India.")}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto sm:max-w-none">
          <Link
            href="/donate"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>{t("donateSurplusFood", "Donate Surplus Food")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/volunteer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>{t("volunteer", "Volunteer to Rescue")}</span>
          </Link>
          <Link
            href="/map"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-slate-300 dark:border-emerald-800/60 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("liveRadar", "Live Radar Map")}</span>
          </Link>
        </div>

        {/* Live Interactive Innovation Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs">
          <Link
            href="/freshness-scanner"
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 dark:hover:border-emerald-500/50 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Freshness Scanner</span>
          </Link>
          <Link
            href="/csr-calculator"
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 dark:hover:border-amber-500/50 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-500" />
            <span>CSR & Tax Savings Calculator</span>
          </Link>
          <Link
            href="/waste-sorter"
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400 dark:hover:border-cyan-500/50 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Recycle className="w-3.5 h-3.5 text-cyan-500" />
            <span>Municipal Bio-CNG Sorter</span>
          </Link>
          <Link
            href="/verify/RB-80G-2026-IND-8849"
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-400 dark:hover:border-purple-500/50 shadow-sm transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            <span>80G Certificate Ledger</span>
          </Link>
        </div>

        {/* 4 Animated Live Stat Cards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {/* Stat 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/40 backdrop-blur-md text-left shadow-sm glass-card-hover">
            <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.kgRescued.toLocaleString()}+
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wider">
              {t("kgRescued", "Kg Rescued")}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Diverted from landfills</div>
          </div>

          {/* Stat 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/40 backdrop-blur-md text-left shadow-sm glass-card-hover">
            <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.mealsEnabled.toLocaleString()}+
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">
              {t("mealsServed", "Meals Enabled")}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Nutritious portions served</div>
          </div>

          {/* Stat 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/40 backdrop-blur-md text-left shadow-sm glass-card-hover">
            <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.activeVolunteers.toLocaleString()}+
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wider">
              {t("activeVolunteers", "Active Volunteers")}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">On-demand courier fleet</div>
          </div>

          {/* Stat 4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/40 backdrop-blur-md text-left shadow-sm glass-card-hover">
            <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.co2Saved.toLocaleString()}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-teal-600 dark:text-teal-400 mt-1 uppercase tracking-wider">
              {t("co2Prevented", "CO₂ Saved (Kg)")}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Greenhouse gas offset</div>
          </div>
        </div>
      </section>

      {/* 5-Stage Closed Loop Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-emerald-900/30">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
            The Rescue Pipeline
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            5-Stage Closed Loop Ecosystem
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs sm:text-base leading-relaxed">
            Every rescue follows a verified, FSSAI-compliant pipeline from listing to delivery to zero-landfill composting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative">
          {/* Stage 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 backdrop-blur-sm relative group hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 relative">
                <Radio className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center">
                  1
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">AI Notification</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Donor lists surplus with AI freshness scoring in under 30 seconds.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-900/30 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              &lt; 30s Fast Mode
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 backdrop-blur-sm relative group hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 relative">
                <Link2 className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">Volunteer Match</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Nearest volunteer auto-matched based on geospatial telemetry and expiry urgency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-900/30 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              Expiry-First Dispatch
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 backdrop-blur-sm relative group hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 relative">
                <Snowflake className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">Cold Chain Pickup</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Food-grade insulated thermal containers preserve holding temperature.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-900/30 text-[11px] text-teal-600 dark:text-teal-400 font-medium">
              Thermal Checklist
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 backdrop-blur-sm relative group hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 relative">
                <HomeIcon className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center">
                  4
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">NGO Delivery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                4-digit PIN verification completes drop; generates Section 80G tax receipt PDF.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-900/30 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              PIN Verified + 80G
            </div>
          </div>

          {/* Stage 5 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 backdrop-blur-sm relative group hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 relative">
                <Recycle className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center">
                  5
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">Zero Landfill</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Non-edible residue redirected to Indore Gobar-Dhan Bio-CNG plant. 100% circular.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-900/30 text-[11px] text-green-600 dark:text-green-400 font-medium">
              Circular Economy
            </div>
          </div>
        </div>
      </section>

      {/* Where Do You Fit? Role Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-emerald-900/30">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
            Your Role
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Where Do You Fit?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs sm:text-base leading-relaxed">
            Every person has a role in eliminating food waste. Choose yours to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Volunteer */}
          <Link
            href="/signup?role=VOLUNTEER"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group glass-card-hover"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Volunteer Driver</h3>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">Rescue & Deliver</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Pick up surplus food from restaurants and deliver it to NGOs. Earn badges, karma points, and community recognition.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                500+ active
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Food Donor */}
          <Link
            href="/signup?role=DONOR"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group glass-card-hover"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-pink-100 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800/30 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Food Donor</h3>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2">Restaurant / Business</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                List surplus food in under 30 seconds. Receive FSSAI compliance docs, CSR credit certificates, and Section 80G tax receipts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                200+ partners
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: NGO Partner */}
          <Link
            href="/signup?role=NGO"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group glass-card-hover"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">NGO Partner</h3>
              <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold mb-2">Receive & Distribute</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Get real-time alerts when food is rescued near your shelter. Accept deliveries, confirm quality, and serve your community with dignity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                50+ verified NGOs
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Community Advocate */}
          <Link
            href="/signup?role=COMMUNITY"
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group glass-card-hover"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Community Advocate</h3>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-2">Spread Impact</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Champion zero food waste in your local neighborhood, track real-time impact, and inspire businesses to donate surplus.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                Join movement
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Waste Sorter Teaser */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-emerald-900/30">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 dark:from-emerald-950/80 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-12 border border-emerald-200 dark:border-emerald-800/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
              <Recycle className="w-3.5 h-3.5" />
              Circular Economy AI
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              AI Waste Sorter & Recycler Match
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Upload a photo of any waste item — from takeaway boxes and PET bottles to electronic cables. Our AI identifies its exact category, provides segregation guidance, and connects you to nearby municipal recycling facilities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/waste-sorter"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/20"
              >
                <span>Launch Waste Sorter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/map"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all border border-slate-300 dark:border-slate-700"
              >
                View Recycling Centres on Map
              </Link>
            </div>
          </div>

          <div className="w-full md:w-auto flex-shrink-0 grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950/70 border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
              <div className="font-bold text-emerald-600 dark:text-emerald-400">Wet / Organic</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Bio-CNG & Composting</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950/70 border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
              <div className="font-bold text-amber-600 dark:text-amber-400">Dry Paper & Cardboard</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Pulp & Board Mills</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950/70 border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
              <div className="font-bold text-cyan-600 dark:text-cyan-400">Rigid & Film Plastic</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">rPET Granulation</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950/70 border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
              <div className="font-bold text-purple-600 dark:text-purple-400">E-Waste & Batteries</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">CPCB Dismantling Hubs</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
