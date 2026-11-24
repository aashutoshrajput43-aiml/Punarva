"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  Award,
  ArrowLeft,
  Share2,
  Printer,
  Sparkles,
} from "lucide-react";

export default function VerifyHashPage() {
  const params = useParams();
  const hash = (params?.hash as string) || "RB-80G-2026-IND-8849";

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <Link
        href="/impact"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Impact Explorer
      </Link>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-950 via-[#041108] to-slate-950 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                OFFICIAL SECTION 80G TAX CERTIFICATE
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Cryptographic Ledger Verification
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              VERIFIED AUTHENTIC
            </span>
          </div>
        </div>

        {/* Certificate Hash Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-900/40 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-slate-400">Audit Reference Hash:</span>
          <span className="text-amber-400 font-black tracking-wider break-all">{hash}</span>
        </div>

        {/* Audit Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-emerald-900/30 space-y-1">
            <span className="text-slate-400">Recognized Donor</span>
            <div className="text-sm font-bold text-white">Sayaji Hotels & Banquets Ltd.</div>
            <p className="text-slate-400 text-[11px]">FSSAI License: #11422850000192</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-emerald-900/30 space-y-1">
            <span className="text-slate-400">Beneficiary NGO Partner</span>
            <div className="text-sm font-bold text-white">Robin Hood Army Foundation</div>
            <p className="text-slate-400 text-[11px]">NITI Aayog Darpan ID: MP/2021/0289412</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-emerald-900/30 space-y-1">
            <span className="text-slate-400">Donation Quantity & Valuation</span>
            <div className="text-sm font-bold text-emerald-400">35.0 kg (~105 Nutritious Meals)</div>
            <p className="text-slate-400 text-[11px]">Fair Market Value: ₹4,900.00 (80G Tax Deductible)</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-emerald-900/30 space-y-1">
            <span className="text-slate-400">Environmental Offset Audit</span>
            <div className="text-sm font-bold text-cyan-400">87.5 kg CO₂e Abated</div>
            <p className="text-slate-400 text-[11px]">Landfill Methane Prevention Certified</p>
          </div>
        </div>

        {/* Legal Act Reference */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300 space-y-1.5 leading-relaxed">
          <span className="font-bold text-emerald-300">
            Income Tax Act, 1961 — Section 80G Sub-clause (5)(vi)
          </span>
          <p className="text-slate-400">
            This digital record confirms that the surplus food consignment was received in sound hygiene condition
            and distributed to registered beneficiaries without commercial resale. This receipt is eligible for
            tax deduction computation under Section 80G.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print Certificate
          </button>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-emerald-900/40 transition-all active:scale-95"
          >
            Inspect on Live GIS Radar
          </Link>
        </div>
      </div>
    </div>
  );
}
