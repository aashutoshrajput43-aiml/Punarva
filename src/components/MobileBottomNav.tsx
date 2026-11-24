"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  PlusCircle,
  Recycle,
  Award,
  Sparkles,
  Calculator,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      label: t("navHome", "Home"),
      href: "/",
      icon: Home,
    },
    {
      label: t("navRadar", "Radar"),
      href: "/map",
      icon: Compass,
      badge: "LIVE",
    },
    {
      label: t("donateFood", "Donate"),
      href: "/donate",
      icon: PlusCircle,
      isFab: true,
    },
    {
      label: t("navWasteSorter", "Waste"),
      href: "/waste-sorter",
      icon: Recycle,
    },
    {
      label: t("navImpact", "Impact"),
      href: "/impact",
      icon: Award,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#040e07]/95 backdrop-blur-xl border-t border-slate-200 dark:border-emerald-900/40 shadow-lg px-2 py-1.5 safe-area-pb transition-colors"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-4 flex flex-col items-center group focus:outline-none"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/30 transform active:scale-95 transition-transform group-hover:scale-105">
                  <div className="w-full h-full bg-slate-900 dark:bg-slate-950 rounded-full flex flex-col items-center justify-center relative">
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                    <Icon className="w-6 h-6 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-1 tracking-tight">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${isActive
                  ? "text-emerald-600 dark:text-emerald-400 font-bold"
                  : item.highlight
                    ? "text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${isActive ? "scale-110 text-emerald-600 dark:text-emerald-400" : ""
                    }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 text-[8px] font-extrabold px-1 py-0.2 rounded-full bg-red-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="absolute -top-1 -right-2 text-[8px] font-black px-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                    JUDGE
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${isActive ? "text-emerald-600 dark:text-emerald-400 font-extrabold" : "text-slate-500 dark:text-slate-400"
                  }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 bg-emerald-500 rounded-full mt-0.5 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
