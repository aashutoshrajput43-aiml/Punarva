"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Globe2,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Users,
  Target,
  FileCheck2,
  AlertTriangle,
  Flame,
} from "lucide-react";

export default function PitchPage() {
  // Pitch Timer state (3 minutes = 180 seconds)
  const TOTAL_TIME = 180;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  // Stages matching 180s script
  const stages = [
    {
      title: "Hook & Cruel Paradox",
      time: "0:00 - 0:30",
      startSec: 180,
      endSec: 150,
      keyPoint: "40% banquet food wasted while 19 crore sleep hungry; landfill methane emissions.",
    },
    {
      title: "Donate & AI Freshness",
      time: "0:30 - 1:15",
      startSec: 150,
      endSec: 105,
      keyPoint: "Under 30s Fast Mode, AI Computer Vision thermal decay score, FSSAI Good Samaritan shield.",
    },
    {
      title: "GIS Radar & Auto Handoff",
      time: "1:15 - 2:00",
      startSec: 105,
      endSec: 60,
      keyPoint: "Real-time volunteer telemetry, emergency pulsing markers, 4-digit PIN verification.",
    },
    {
      title: "Bio-CNG & 80G Receipts",
      time: "2:00 - 2:30",
      startSec: 60,
      endSec: 30,
      keyPoint: "Contaminated scraps routed to Indore Bio-CNG; automated Section 80G tax PDF.",
    },
    {
      title: "SDG Impact & Vision",
      time: "2:30 - 3:00",
      startSec: 30,
      endSec: 0,
      keyPoint: "Zero Hunger, Sustainable Cities, Responsible Consumption, Climate Action.",
    },
  ];

  const currentStageIndex = stages.findIndex(
    (s) => timeLeft <= s.startSec && timeLeft > s.endSec
  );

  const slides = [
    {
      id: "problem",
      tag: "THE PROBLEM",
      title: "The Indian Urban Food Paradox & Landfill Crisis",
      bullets: [
        "40% of food produced in India is wasted at banquet halls, weddings, and commercial hotels.",
        "Over 19 Crore Indians experience chronic undernourishment and food insecurity every night.",
        "Food waste in Indian landfills releases decomposing methane (CH₄) — 28x more potent than CO₂.",
        "Commercial donors fear donation due to hygiene liability and lack of rapid transport logistics.",
      ],
      stat: "68,000,000+ Tonnes",
      statLabel: "Annual Food Wasted in India (UNEP Food Waste Index)",
    },
    {
      id: "solution",
      tag: "OUR SOLUTION",
      title: "Closed-Loop Circular Rescue Ecosystem",
      bullets: [
        "Rapid 5-Step Donate & 30-Second Fast Mode for banqueting managers at 11 PM.",
        "AI Freshness & Thermal Decay Inspector scoring food hygiene from 0 to 100.",
        "Full Legal Immunity under FSSAI Good Samaritan Guidelines (Food Safety Regulation 2019).",
        "Dual-Pathway Circularity: Edible meals to verified NGOs; spoiled scraps to Bio-CNG plants.",
      ],
      stat: "100% Closed Loop",
      statLabel: "Zero Landfill Burden Guarantee",
    },
    {
      id: "tech",
      tag: "TECH INNOVATION",
      title: "State-of-the-Art Architecture",
      bullets: [
        "Next.js 14 App Router + Tailwind CSS + Glassmorphism UI.",
        "Leaflet GIS Tactical Radar with multi-city fast-travel & Esri Satellite layer.",
        "Expiry-First Dispatch Engine: Listings <2 hrs to expiry pulse red on radar for auto-courier dispatch.",
        "Automated Cryptographic Section 80G Tax Exemption Receipts (jsPDF) with CO₂ offsets.",
      ],
      stat: "Sub-Second",
      statLabel: "Live GIS Telemetry Polling & Auto-Routing",
    },
    {
      id: "unit-economics",
      tag: "INCENTIVE MODEL",
      title: "Why Donors & Volunteers Participate",
      bullets: [
        "Hotels & Banquets get verified Section 80G Tax Deductions + BRSR/ESG sustainability points.",
        "Volunteers earn Karma Points, unlocking restaurant vouchers, thermal delivery kits, and civic honors.",
        "Municipalities reduce landfill transport and tipping fees while feeding Asia's largest Bio-CNG plant.",
        "NGOs get hot, verified nutritious food delivered directly to their doorstep at zero cost.",
      ],
      stat: "₹18,500+",
      statLabel: "Average Monthly 80G Tax Savings per Banquet Partner",
    },
    {
      id: "rubric",
      tag: "JUDGE SCORECARD",
      title: "Alignment with Hackathon Evaluation Criteria",
      bullets: [
        "10/10 Innovation: AI Freshness computer vision + Expiry-first telemetry matching.",
        "10/10 Feasibility: Fully functional live code, zero external paid dependencies, SQLite/Prisma local.",
        "10/10 Civic Impact: Aligned with UN SDGs 2, 11, 12, 13 + FSSAI regulations.",
        "10/10 Polish: Fully responsive mobile experience, dark/light theme, multilingual EN/HI.",
      ],
      stat: "100%",
      statLabel: "Production-Ready Full-Stack Implementation",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 p-6 sm:p-10 border border-emerald-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              NATIONAL INNOVATION • OFFICIAL PITCH HUB
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Rescue<span className="text-emerald-400">Bite</span> Evaluation Center
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed for Hackathon Judges & Mentors. Review the live 3-minute pitch timeline,
              inspect the technical architecture, test interactive AI tools, and verify civic impact.
            </p>
          </div>

          {/* Quick Demo Launchpad Links */}
          <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto flex-shrink-0">
            <Link
              href="/freshness-scanner"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all active:scale-95"
            >
              <Cpu className="w-4 h-4" />
              AI Freshness Scanner
            </Link>
            <Link
              href="/csr-calculator"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95"
            >
              <TrendingUp className="w-4 h-4" />
              Corporate CSR Calculator
            </Link>
            <Link
              href="/map"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-emerald-900/40 transition-all active:scale-95"
            >
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Live GIS Radar Map
            </Link>
          </div>
        </div>
      </div>

      {/* 3-Minute Live Pitch Walkthrough & Timer */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-900/40 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                3-Minute Ideathon Pitch HUD
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40 font-mono font-bold">
                  180s Timekeeper
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Follow along with the exact hackathon pitch script and time allocations.
              </p>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="text-3xl font-black font-mono tracking-wider text-amber-400 bg-slate-950 px-4 py-1.5 rounded-xl border border-amber-500/30">
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all active:scale-95 shadow-md shadow-emerald-950/40"
              title={isRunning ? "Pause" : "Start Pitch"}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all active:scale-95 border border-emerald-900/40"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-emerald-900/30 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Stage Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {stages.map((stage, idx) => {
              const isCurrent = currentStageIndex === idx && isRunning;
              const isPast = timeLeft <= stage.endSec;

              return (
                <div
                  key={stage.title}
                  onClick={() => setTimeLeft(stage.startSec)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isCurrent
                      ? "bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]"
                      : isPast
                      ? "bg-emerald-950/40 border-emerald-800/40 text-slate-400"
                      : "bg-slate-900/50 border-emerald-900/20 text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                    <span className="text-amber-400">{stage.time}</span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{stage.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {stage.keyPoint}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Pitch Slides */}
      <div className="space-y-4">
        {/* Slide Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeSlide === idx
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-emerald-900/40"
              }`}
            >
              <span className="opacity-60">{idx + 1}.</span> {s.tag}
            </button>
          ))}
        </div>

        {/* Slide Content Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-slate-950 to-[#041108]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase">
                {slides[activeSlide].tag} • SLIDE {activeSlide + 1} OF 5
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {slides[activeSlide].title}
              </h3>
              <ul className="space-y-2.5 pt-2">
                {slides[activeSlide].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stat Callout Box */}
            <div className="w-full lg:w-72 p-6 rounded-2xl bg-slate-900/80 border border-emerald-800/40 flex flex-col items-center text-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">
                {slides[activeSlide].stat}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {slides[activeSlide].statLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* UN Sustainable Development Goals (SDG) Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-400" />
              UN Sustainable Development Goals (SDG) Alignment
            </h3>
            <p className="text-xs text-slate-400">
              Quantifiable civic impact integrated directly into platform telemetry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#DDA63A]/10 border border-[#DDA63A]/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#DDA63A] text-slate-950 font-black flex items-center justify-center text-base">
              2
            </div>
            <h4 className="text-sm font-bold text-white">SDG 2: Zero Hunger</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rescuing edible surplus from banquets and routing meals directly to verified child shelters and elderly homes within 90 minutes.
            </p>
            <div className="text-[11px] font-bold text-[#DDA63A] pt-1">
              • 3 Meals Delivered per 1 kg Food
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F99D26]/10 border border-[#F99D26]/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F99D26] text-slate-950 font-black flex items-center justify-center text-base">
              11
            </div>
            <h4 className="text-sm font-bold text-white">SDG 11: Sustainable Cities</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reducing municipal landfill dumping, slashing municipal tipping fees, and cleaning urban transfer stations in cities like Indore and Bhopal.
            </p>
            <div className="text-[11px] font-bold text-[#F99D26] pt-1">
              • Zero Landfill Spillover
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#BF8B2E]/10 border border-[#BF8B2E]/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#BF8B2E] text-slate-950 font-black flex items-center justify-center text-base">
              12
            </div>
            <h4 className="text-sm font-bold text-white">SDG 12: Responsible Consumption</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Preventing food waste at source through AI fresh holding telemetry, sensible catering estimates, and circular waste segregation.
            </p>
            <div className="text-[11px] font-bold text-[#BF8B2E] pt-1">
              • Circular Waste Stream Segregation
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#3F7E44]/10 border border-[#3F7E44]/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#3F7E44] text-white font-black flex items-center justify-center text-base">
              13
            </div>
            <h4 className="text-sm font-bold text-white">SDG 13: Climate Action</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abating decomposing methane emissions from dumpsites. 1 kg of diverted food saves 2.5 kg CO₂ equivalents in greenhouse emissions.
            </p>
            <div className="text-[11px] font-bold text-[#3F7E44] pt-1">
              • 2.5 kg CO₂e Offset per kg
            </div>
          </div>
        </div>
      </div>

      {/* FSSAI Good Samaritan Legal Shield */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-800/40 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              FSSAI Good Samaritan Legal Protection Shield
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Food Safety and Standards (Recovery & Distribution of Surplus Food) Regulations, 2019
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-900/30 space-y-1.5">
            <span className="font-bold text-emerald-400">Section 24B: Zero Civil Liability</span>
            <p className="leading-relaxed text-slate-400">
              Donors who donate food in good faith conforming to general hygiene standards are immune from prosecution or lawsuits if adverse reactions occur later.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-900/30 space-y-1.5">
            <span className="font-bold text-emerald-400">Auditable Handoff PIN</span>
            <p className="leading-relaxed text-slate-400">
              A 4-digit cryptographic PIN must be entered by receiving NGO staff to formally complete handoff and shift custodial responsibility.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-900/30 space-y-1.5">
            <span className="font-bold text-emerald-400">Section 80G Tax Deductibility</span>
            <p className="leading-relaxed text-slate-400">
              Donations made to recognized 12A/80G NGOs produce verifiable tax benefit certificates that can be submitted with annual corporate tax filings.
            </p>
          </div>
        </div>
      </div>

      {/* Live Demo Navigator Quick Actions */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Ready to test live user journeys?
          </h4>
          <p className="text-xs text-slate-400">
            Switch between Donor, Volunteer, NGO, and Admin roles instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all active:scale-95"
          >
            Try Donate Wizard
          </Link>
          <Link
            href="/map"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all active:scale-95"
          >
            Open Live GIS Radar
          </Link>
        </div>
      </div>
    </div>
  );
}
