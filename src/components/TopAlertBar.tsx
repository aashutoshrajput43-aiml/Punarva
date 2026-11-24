"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ShieldCheck, Sparkles, Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function TopAlertBar() {
  const [helpline, setHelpline] = useState("+91 97708 69581");
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.helpline_phone) setHelpline(data.helpline_phone);
      })
      .catch(() => { });
  }, []);

  return (
    <div className="bg-slate-100 dark:bg-gradient-to-r dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-950 text-slate-700 dark:text-emerald-300 text-xs py-1.5 px-3 sm:px-4 border-b border-slate-200 dark:border-emerald-800/40 font-medium tracking-wide flex items-center justify-between gap-2 flex-wrap transition-colors">
      {/* Left: FSSAI and Hackathon Badge */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-200 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="hidden sm:inline">{t("zeroWasteInitiative", "Zero Waste Initiative")} •</span> {t("fssaiProtected", "100% Protected under FSSAI Good Samaritan Law")}
        </span>
      </div>

      {/* Center / Right: Helpline & Language Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Helpline - Direct Click to Call */}
        <a
          href={`tel:${helpline.replace(/[^0-9+]/g, "")}`}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors text-[11px] font-semibold border border-emerald-500/30"
          title="Direct Emergency Helpline"
        >
          <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="hidden sm:inline">{t("helpline", "Helpline")}:</span>
          <strong>{helpline}</strong>
        </a>

        {/* Language Selector */}
        <div className="flex items-center bg-white dark:bg-slate-900/80 rounded-md p-0.5 border border-slate-300 dark:border-emerald-900/40 text-[10px] shadow-sm">
          <Globe className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 mx-1 hidden xs:inline" />
          <button
            onClick={() => setLanguage("en")}
            className={`px-1.5 py-0.5 rounded transition-all ${language === "en"
                ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`px-1.5 py-0.5 rounded transition-all ${language === "hi"
                ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage("hinglish")}
            className={`px-1.5 py-0.5 rounded transition-all ${language === "hinglish"
                ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
          >
            Hinglish
          </button>
        </div>
      </div>
    </div>
  );
}
