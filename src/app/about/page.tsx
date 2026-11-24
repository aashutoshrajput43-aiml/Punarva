import React from "react";
import Link from "next/link";
import { Leaf, Award, Globe, Heart, Shield, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Mission Statement */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
            Zero Waste Innovation Initiative
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            "Transforming surplus into sustenance, and waste into a resource."
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            Punarva was created to tackle India’s stark food-waste paradox: while over 40% of produced food is wasted, millions suffer nutritional insecurity. By integrating artificial intelligence, real-time geospatial telemetry, and circular municipal recycling, we bridge this gap within minutes. Where every resource returns.
          </p>
        </div>

        {/* UN SDGs Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 space-y-6 shadow-sm">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">United Nations SDGs Alignment</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Punarva directly targets 4 United Nations Sustainable Development Goals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 space-y-2 shadow-sm">
              <span className="text-xs font-black text-red-600 dark:text-red-400">SDG 2: ZERO HUNGER</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Rescuing untouched commercial meals from hotels, weddings, and buffets to feed verified shelter homes with dignity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 space-y-2 shadow-sm">
              <span className="text-xs font-black text-amber-700 dark:text-amber-400">SDG 11: SUSTAINABLE CITIES</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Empowering municipal smart cities like Indore with hyper-local dispatch radar and zero-landfill diversion protocols.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800/40 space-y-2 shadow-sm">
              <span className="text-xs font-black text-yellow-700 dark:text-yellow-400">SDG 12: RESPONSIBLE CONSUMPTION</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                AI Waste Sorter guides clean segregation of plastics, metals, paper, and e-waste to licensed aggregators.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-2 shadow-sm">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">SDG 13: CLIMATE ACTION</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Preventing anaerobic methane emissions from decomposing organic food dumps (2.5 kg CO₂ saved per kg food).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
