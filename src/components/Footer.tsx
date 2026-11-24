"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Heart, Shield, Award, ExternalLink, Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import PunarvaLogo from "./PunarvaLogo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-100 dark:bg-[#030c08] border-t border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      {/* Top Banner with UN SDGs */}
      <div className="border-b border-slate-200 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-950/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              SDG
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                Aligned with United Nations Sustainable Development Goals
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Active impact contribution toward global food security and climate sustainability.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-md bg-[#e5243b]/15 border border-[#e5243b]/30 text-[#dc2626] dark:text-[#fca5a5] font-bold text-xs">
              SDG 2: Zero Hunger
            </span>
            <span className="px-3 py-1 rounded-md bg-[#f99d26]/15 border border-[#f99d26]/30 text-[#d97706] dark:text-[#fde047] font-bold text-xs">
              SDG 11: Sustainable Cities
            </span>
            <span className="px-3 py-1 rounded-md bg-[#cf8d2a]/15 border border-[#cf8d2a]/30 text-[#b45309] dark:text-[#fcd34d] font-bold text-xs">
              SDG 12: Responsible Consumption
            </span>
            <span className="px-3 py-1 rounded-md bg-[#48773e]/15 border border-[#48773e]/30 text-[#15803d] dark:text-[#86efac] font-bold text-xs">
              SDG 13: Climate Action
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-950 p-1 border border-slate-200 dark:border-emerald-900/40 flex items-center justify-center">
              <PunarvaLogo size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 dark:text-white flex items-center">
                Puna<span className="text-emerald-500">rva</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Where every resource returns
              </span>
            </div>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs max-w-sm">
            {t("footerMission", "Punarva is India's dedicated surplus food rescue, cold-chain telemetry, and circular waste segregation network.")}
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
            <Shield className="w-3.5 h-3.5" />
            {t("fssaiProtected", "100% Protected under FSSAI Good Samaritan Law")}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2">
            <li><Link href="/map" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Live Dispatch Map</Link></li>
            <li><Link href="/donate" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Donate Food (30s)</Link></li>
            <li><Link href="/volunteer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Volunteer App</Link></li>
            <li><Link href="/waste-sorter" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">AI Waste Sorter</Link></li>
            <li><Link href="/impact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Live Impact Metrics</Link></li>
            <li><Link href="/leaderboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Karma Leaderboard</Link></li>
          </ul>
        </div>

        {/* Resources & Trust */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Transparency</h4>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">FSSAI Safety Rules</Link></li>
            <li><Link href="/faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">80G Tax Exemption</Link></li>
            <li><Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Mission & SDGs</Link></li>
            <li><Link href="/admin" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Admin Control Center</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Help & Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200 dark:border-emerald-900/30 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 RescueBite India. {t("allRightsReserved", "All rights reserved.")}
          </div>
          <div className="flex items-center gap-4">
            <span>Indore • Bhopal • Delhi • Mumbai • Bangalore • Hyderabad • Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
