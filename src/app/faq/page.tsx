"use client";

import React, { useState } from "react";
import { ChevronDown, ShieldCheck, HelpCircle, FileText, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the Good Samaritan Act & FSSAI Surplus Food Regulation?",
      a: "Under the FSSAI (Recovery & Distribution of Surplus Food) Regulations and the Indian Good Samaritan law, food businesses, caterers, hotels, and individuals who donate food in good faith are protected from civil or criminal liability. Food must simply be wholesome, unadulterated, and stored under safe thermal conditions.",
    },
    {
      q: "Who can donate food on Punarva?",
      a: "Anyone! Restaurants, banquet halls, hotels, corporate cafeterias, caterers, grocery stores, marriage palaces, and private event hosts. You can log donations in under 30 seconds using our quick mode.",
    },
    {
      q: "How does the cold-chain pickup work?",
      a: "When a verified food listing is matched, our nearest volunteer receives a geospatial route alert. Volunteers are equipped with sanitized food-grade insulated thermal carrier bags to maintain hot meals above 60°C or chilled foods below 5°C throughout transit.",
    },
    {
      q: "How does the 4-Digit Delivery PIN protect donors?",
      a: "When you list food, a unique 4-digit PIN is generated. At the delivery shelter, the receiving NGO verifies the quantity and quality, then enters the PIN into the system. This triggers the digital delivery confirmation and unlocks your downloadable Section 80G tax exemption certificate.",
    },
    {
      q: "Can businesses claim Section 80G tax exemptions?",
      a: "Yes! Every verified food rescue generates an auditable, digitally timestamped 80G certificate complete with meal equivalents, CO₂ offset metrics, and receiving NGO registration details for corporate social responsibility (CSR) and tax filing.",
    },
    {
      q: "Why can't greasy pizza boxes be recycled with dry paper?",
      a: "Paper recycling uses water to break paper fibers into pulp. Oil and grease do not mix with water, causing severe oily residue on pulping screens and ruining the entire batch. You should tear off clean dry box lids for paper recycling, and compost the greasy base with wet organic waste!",
    },
    {
      q: "How are NGOs and Shelter Homes verified?",
      a: "All NGO partners must submit their NITI Aayog DARPAN ID, registration certificate, and undergo administrative credential validation before they can receive automated dispatches on the live radar.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base & FSSAI Guidelines
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Everything you need to know about surplus food donation, legal protections, cold-chain safety, and waste segregation.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-slate-900/70 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-emerald-900/20 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 text-center space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Have a question not listed here?</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Our 24/7 RescueBot AI is available on every page, or you can speak with our civic coordination desk.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/donate"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700"
            >
              Donate Food
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

