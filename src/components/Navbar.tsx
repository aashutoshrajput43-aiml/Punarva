"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Leaf,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  User,
  HeartHandshake,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Calculator,
  Cpu,
  Globe,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageContext";
import NotificationBell from "./NotificationBell";
import PunarvaLogo from "./PunarvaLogo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    role: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.user) setUser(data.user);
        else setUser(null);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { name: t("navHome", "Home"), href: "/" },
    { name: t("navRadar", "Live Radar"), href: "/map", badge: "LIVE" },
    { name: t("navWasteSorter", "Waste Sorter"), href: "/waste-sorter" },
    { name: t("navFreshness", "AI Freshness"), href: "/freshness-scanner" },
    { name: t("navCsrCalc", "CSR Calculator"), href: "/csr-calculator" },
    { name: t("navImpact", "Impact"), href: "/impact" },
    { name: t("navLeaderboard", "Leaderboard"), href: "/leaderboard" },
    { name: t("navFaq", "FAQ"), href: "/faq" },
    { name: t("navAbout", "About"), href: "/about" },
  ];

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "VOLUNTEER") return "/volunteer";
    if (user.role === "NGO") return "/ngo";
    return "/donate";
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 dark:bg-darkbg-950/90 border-b border-slate-200 dark:border-emerald-900/30 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-950 p-1 border border-slate-200 dark:border-emerald-900/40 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <PunarvaLogo size={32} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
              Puna<span className="text-emerald-500">rva</span>
            </span>
            <span className="text-[9px] font-medium tracking-normal text-slate-500 dark:text-slate-400">
              Where every resource returns
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all relative flex items-center gap-1 ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/40 font-bold"
                    : item.highlight
                    ? "text-amber-800 dark:text-amber-300 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50"
                }`}
              >
                {item.highlight && <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400 animate-pulse" />}
                {item.name}
                {item.badge && (
                  <span className="text-[9px] font-black px-1 rounded-full bg-red-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-2.5">
          {/* Quick Language Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-emerald-900/40 text-[11px] font-bold">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-md transition-all ${
                language === "en"
                  ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2 py-1 rounded-md transition-all ${
                language === "hi"
                  ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage("hinglish")}
              className={`px-2 py-1 rounded-md transition-all ${
                language === "hinglish"
                  ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900/30 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          {/* Notification Bell */}
          <NotificationBell />

          {/* Donate Food (Amber Button) */}
          <Link
            href="/donate"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-sm shadow-amber-950/20 transition-all transform hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            {t("donateFood", "Donate Food")}
          </Link>

          {/* Volunteer (Green Button) */}
          <Link
            href="/volunteer"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm shadow-emerald-950/20 transition-all transform hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            {t("volunteerShort", "Volunteer")}
          </Link>

          {/* Auth State Button */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-emerald-900/40">
              <Link
                href={getDashboardLink()}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("navDashboard", "Dashboard")} ({user.role})
              </Link>
              <button
                onClick={handleLogout}
                title={t("navSignOut", "Sign Out")}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-200 dark:border-emerald-900/40"
            >
              {t("navLogin", "Login")}
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-emerald-900/40"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
          </button>
          <NotificationBell />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-emerald-900/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-emerald-900/40 bg-white/98 dark:bg-slate-950/98 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language Selector */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-emerald-900/30">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-500" /> Language
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-emerald-900/40 text-xs font-bold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-md ${language === "en" ? "bg-emerald-500 text-slate-950" : "text-slate-500 dark:text-slate-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2 py-1 rounded-md ${language === "hi" ? "bg-emerald-500 text-slate-950" : "text-slate-500 dark:text-slate-400"}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage("hinglish")}
                className={`px-2 py-1 rounded-md ${language === "hinglish" ? "bg-emerald-500 text-slate-950" : "text-slate-500 dark:text-slate-400"}`}
              >
                Hinglish
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-emerald-900/30">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                  pathname === item.href
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 font-bold"
                    : item.highlight
                    ? "text-amber-800 dark:text-amber-300 bg-amber-500/15 font-bold border border-amber-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <span>{item.name}</span>
                {item.highlight && <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-sm"
            >
              {t("donateFood", "Donate Food")}
            </Link>
            <Link
              href="/volunteer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm"
            >
              {t("volunteer", "Volunteer to Rescue")}
            </Link>

            {user ? (
              <div className="flex items-center justify-between pt-2">
                <Link
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 underline"
                >
                  {t("navDashboard", "Dashboard")} ({user.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-500 font-semibold"
                >
                  {t("navSignOut", "Sign Out")}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-emerald-900/40"
              >
                {t("navLogin", "Login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
