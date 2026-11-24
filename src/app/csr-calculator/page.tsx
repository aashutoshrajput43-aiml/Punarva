"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Calculator,
  ShieldCheck,
  Download,
  CheckCircle2,
  HelpCircle,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  Printer,
} from "lucide-react";

export default function CSRCalculatorPage() {
  const [cookedFoodKg, setCookedFoodKg] = useState<number>(350);
  const [costPerKg, setCostPerKg] = useState<number>(140);
  const [recyclablesKg, setRecyclablesKg] = useState<number>(120);
  const [taxSlabPercent, setTaxSlabPercent] = useState<number>(30); // 25% or 30% corporate tax

  // Computations
  const monthlyFoodValue = cookedFoodKg * costPerKg;
  const annualFoodValue = monthlyFoodValue * 12;

  // Under Section 80G, 50% of the qualifying donation amount is eligible for deduction
  const annualSection80GDeduction = annualFoodValue * 0.5;
  const annualDirectTaxSavings = annualSection80GDeduction * (taxSlabPercent / 100);

  // Environmental & Social Impact
  const monthlyMeals = cookedFoodKg * 3;
  const annualMeals = monthlyMeals * 12;
  const monthlyCo2OffsetKg = cookedFoodKg * 2.5;
  const annualCo2OffsetTonnes = (monthlyCo2OffsetKg * 12) / 1000;
  const annualRecyclablesKg = recyclablesKg * 12;

  // ESG Score (0 - 100)
  const esgScore = Math.min(
    98,
    Math.round(40 + (cookedFoodKg / 500) * 35 + (recyclablesKg / 200) * 23)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-emerald-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10 border border-slate-200 dark:border-emerald-500/30 shadow-sm dark:shadow-xl transition-colors">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              HOTEL & BANQUET CSR ENGINE • SECTION 80G DEDUCTIBLE
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Corporate CSR & <span className="text-emerald-600 dark:text-emerald-400">Tax Exemption</span> Calculator
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Calculate your exact corporate tax write-offs under Section 80G of the Indian Income Tax Act,
              quantify greenhouse gas reduction, and generate SEBI BRSR-compliant ESG audit metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Print / Save ESG Audit Sheet
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Sliders & Controls */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-emerald-900/30 pb-3">
            <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Establishment Parameters
          </h2>

          {/* Slider 1: Cooked Food */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Monthly Surplus Cooked Food</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{cookedFoodKg} kg/mo</span>
            </div>
            <input
              type="range"
              min="50"
              max="3000"
              step="25"
              value={cookedFoodKg}
              onChange={(e) => setCookedFoodKg(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-200 dark:bg-slate-900 cursor-pointer h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>50 kg (Small Cafe)</span>
              <span>1,500 kg (Banquet Hall)</span>
              <span>3,000 kg (5-Star Hotel)</span>
            </div>
          </div>

          {/* Slider 2: Average Production Cost */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Avg. Food Cost / kg</span>
              <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">₹{costPerKg} / kg</span>
            </div>
            <input
              type="range"
              min="60"
              max="400"
              step="10"
              value={costPerKg}
              onChange={(e) => setCostPerKg(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-200 dark:bg-slate-900 cursor-pointer h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>₹60 (Standard Veg)</span>
              <span>₹200 (Buffet Catering)</span>
              <span>₹400 (Luxury Dining)</span>
            </div>
          </div>

          {/* Slider 3: Recyclable Waste */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Packaging / Dry Waste Recycled</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-extrabold text-sm">{recyclablesKg} kg/mo</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={recyclablesKg}
              onChange={(e) => setRecyclablesKg(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-900 cursor-pointer h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>20 kg (Cartons/Glass)</span>
              <span>500 kg (Banqueting)</span>
              <span>1,000 kg</span>
            </div>
          </div>

          {/* Corporate Tax Slab Choice */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-emerald-900/30">
            <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Corporate Tax Bracket (Income Tax of India)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTaxSlabPercent(25)}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  taxSlabPercent === 25
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-emerald-900/30 hover:bg-slate-200"
                }`}
              >
                25% (Base Domestic)
              </button>
              <button
                type="button"
                onClick={() => setTaxSlabPercent(30)}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  taxSlabPercent === 30
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-emerald-900/30 hover:bg-slate-200"
                }`}
              >
                30% (Large Corp / Banquets)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Results Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Financial Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-gradient-to-br dark:from-amber-500/20 dark:via-slate-900 dark:to-amber-950/40 border border-amber-300 dark:border-amber-500/40 shadow-sm space-y-2">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Direct Annual Tax Savings
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
                ₹{annualDirectTaxSavings.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Direct tax liability reduction under Section 80G based on {taxSlabPercent}% corporate tax slab.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/80 dark:bg-gradient-to-br dark:from-emerald-500/20 dark:via-slate-900 dark:to-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 shadow-sm space-y-2">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Eligible 80G Deduction Base
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                ₹{annualSection80GDeduction.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                50% of annual food donation market valuation (₹{annualFoodValue.toLocaleString("en-IN")}).
              </p>
            </div>
          </div>

          {/* Social & Ecological ESG Impact Cards */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200 dark:border-emerald-900/30 pb-3">
              <span>Verified ESG & SDG Deliverables</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                ESG Score: {esgScore}/100
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 space-y-1 shadow-sm">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Meals Delivered</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {annualMeals.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  ~{monthlyMeals.toLocaleString("en-IN")} meals/month
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 space-y-1 shadow-sm">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">GHG Emissions Saved</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {annualCo2OffsetTonnes.toFixed(1)} MT
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  CO₂e diverted from landfills
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 space-y-1 shadow-sm">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Dry Waste Recovered</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {annualRecyclablesKg.toLocaleString("en-IN")} kg
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  Circular packaging diverted
                </span>
              </div>
            </div>

            {/* SEBI BRSR Audit Readiness Notice */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 flex items-start gap-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">
                  SEBI BRSR Principle 6 (Environment) & Principle 8 (Inclusive Growth)
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Every food mission completed on Punarva automatically generates a digitally signed
                  Section 80G tax receipt featuring donor credentials, NGO Darpan registration ID,
                  and verifiable CO₂ equivalent calculations for corporate audit filing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
