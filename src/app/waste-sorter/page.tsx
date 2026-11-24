"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Recycle,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  Leaf,
  Layers,
  Award,
} from "lucide-react";

export default function WasteSorterPage() {
  const [photoHint, setPhotoHint] = useState("Greasy Pizza Box");
  const [customQuery, setCustomQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Collectors and facilities
  const [collectors, setCollectors] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState("ALL");

  // Pickup Request Modal
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<any>(null);
  const [pickupData, setPickupData] = useState({
    wasteCategory: "Recyclable Plastics",
    estimatedKg: "15",
    contactName: "Aayush Batole",
    phone: "9770869581",
    address: "Scheme 54, Vijay Nagar, Indore",
    preferredTime: "Tomorrow Morning (10 AM)",
  });
  const [requestSubmitted, setRequestSubmitted] = useState<any>(null);
  const [submittingPickup, setSubmittingPickup] = useState(false);

  const sampleItems = [
    { title: "Greasy Pizza Box", emoji: "🍕", hint: "greasy pizza box takeaway cardboard" },
    { title: "PET Soda Bottles", emoji: "🧴", hint: "crushed clear plastic beverage bottles" },
    { title: "Old Phone & Wires", emoji: "📱", hint: "broken smartphone charger cables battery e-waste" },
    { title: "Aluminium Cans", emoji: "🥫", hint: "metal beverage cans food tins foil" },
    { title: "Glass Pickle Jar", emoji: "🫙", hint: "empty glass jam pickle container jar" },
    { title: "Cardboard Cartons", emoji: "📦", hint: "corrugated dry shipping boxes and newspaper" },
  ];

  const handleClassify = async (hintToUse?: string) => {
    const query = hintToUse || customQuery || photoHint;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai/waste-sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoHint: query, textQuery: query }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
        setPickupData((prev) => ({
          ...prev,
          wasteCategory: data.categoryDisplayName,
        }));
      }
    } catch (e) {
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    handleClassify("Greasy Pizza Box");
    // Fetch local collectors
    fetch("/api/waste/collectors?city=Indore")
      .then((res) => res.json())
      .then((data) => {
        setCollectors(data.collectors || []);
        setFacilities(data.recyclingCentres || []);
      })
      .catch(() => { });
  }, []);

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingPickup(true);
    try {
      const res = await fetch("/api/waste/pickup-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pickupData,
          collectorId: selectedCollector?.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRequestSubmitted(data.pickupRequest);
        setPickupModalOpen(false);
      } else {
        alert(data.error || "Failed to submit request.");
      }
    } catch (e) {
      alert("Submission error.");
    } finally {
      setSubmittingPickup(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/80 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Recycle className="w-3.5 h-3.5" />
            Circular Economy & Waste Sorter • UN SDG 12
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            AI Waste Identification & Recycler Match
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminate contamination at source. Instant AI photo segregation, municipal circular pathways, and verified collector pickup requests across Indore and India.
          </p>
        </div>

        {/* SECTION 1: AI Waste Identification */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 p-6 sm:p-10 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>1. Classify Any Waste Material</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Select a sample item or describe your waste packaging to run AI segregation logic.
              </p>
            </div>
          </div>

          {/* Sample Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
            {sampleItems.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setPhotoHint(item.hint);
                  handleClassify(item.hint);
                }}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/60 transition-all text-center flex flex-col items-center gap-1.5 group shadow-sm"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Custom Search/Describe Input */}
          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Or type an item e.g. 'broken fluorescent bulb', 'coconut shells', 'milk pouches'..."
              className="flex-1 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs border border-slate-300 dark:border-emerald-900/50 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
            <button
              onClick={() => handleClassify()}
              disabled={analyzing}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all"
            >
              {analyzing ? "Classifying..." : "Analyze"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AI Result Cards */}
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-emerald-900/30">
              {/* Category & Confidence */}
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Identified Category
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                      {result.categoryDisplayName}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                    {Math.round(result.confidence * 100)}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950/50 p-4 rounded-xl border border-slate-200 dark:border-emerald-900/30 shadow-sm">
                  {result.segregationTips}
                </p>

                {/* Do's & Don'ts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/40 shadow-sm">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Do's:
                    </div>
                    <ul className="text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside text-[11px]">
                      {result.dosAndDonts?.dos.map((d: string, idx: number) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950/70 border border-red-200 dark:border-red-900/30 shadow-sm">
                    <div className="font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Don'ts:
                    </div>
                    <ul className="text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside text-[11px]">
                      {result.dosAndDonts?.donts.map((d: string, idx: number) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Circular Pathway "Where Does it Go?" */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-900/40 flex flex-col justify-between space-y-4 shadow-sm">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    Circular Lifecycle Pathway
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Where Does Your Waste Go?
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    {result.circularPathway}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-emerald-900/30 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Landfill Diversion:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">100% Zero Landfill</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Carbon Avoided:</span>
                    <span className="font-bold text-slate-900 dark:text-white">~1.8 kg CO₂ per kg segregated</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Citizen Karma Points:</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">+5 pts per kg collected</span>
                  </div>
                </div>

                <button
                  onClick={() => setPickupModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Collector Pickup for this Item</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation banner if pickup request created */}
        {requestSubmitted && (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Pickup Request Registered #{requestSubmitted.id.slice(0, 8)}
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">
                  Assigned to local collector: {requestSubmitted.collector?.name || "Municipal MRF"}. They will arrive {requestSubmitted.preferredTime}.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
              +75 Karma Points Earned
            </span>
          </div>
        )}

        {/* SECTION 2: Verified Local Collectors & Recycling Centres Map/List */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>2. Nearby Authorized Waste Collectors & MRFs (Indore Hub)</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Verified municipal aggregators and formal recycling centers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectors.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</h4>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">{c.organization}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      ★ {c.rating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{c.address}</span>
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200 dark:border-emerald-900/30 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                    <div><strong>Materials Accepted:</strong> <span className="text-slate-800 dark:text-slate-200">{c.materialsAccepted}</span></div>
                    <div><strong>Hours:</strong> {c.openingHours}</div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCollector(c);
                      setPickupModalOpen(true);
                    }}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Request Pickup
                  </button>
                  <a
                    href={`tel:${c.phone}`}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center gap-1 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Recycling Facilities (Composting & MRF) */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-emerald-900/30">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-4">
              Regional Circular Processing Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {facilities.map((f) => (
                <div key={f.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2 shadow-sm">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{f.name}</div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">{f.facilityType}</div>
                  <div className="text-slate-600 dark:text-slate-400">{f.address}</div>
                  <div className="text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800 text-[10px]">
                    Daily Capacity: <strong>{f.capacityTons} Tons/day</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REQUEST PICKUP MODAL */}
        {pickupModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-700/60 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                Book Recyclable Waste Pickup
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                Assigned to: <strong className="text-emerald-700 dark:text-emerald-400">{selectedCollector?.name || "Authorized Indore MRF Collector"}</strong>
              </p>

              <form onSubmit={handlePickupSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Material Category</label>
                  <input
                    type="text"
                    value={pickupData.wasteCategory}
                    onChange={(e) => setPickupData({ ...pickupData, wasteCategory: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-emerald-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Weight (kg)</label>
                    <input
                      type="number"
                      value={pickupData.estimatedKg}
                      onChange={(e) => setPickupData({ ...pickupData, estimatedKg: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-emerald-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Time Window</label>
                    <input
                      type="text"
                      value={pickupData.preferredTime}
                      onChange={(e) => setPickupData({ ...pickupData, preferredTime: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-emerald-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={pickupData.contactName}
                      onChange={(e) => setPickupData({ ...pickupData, contactName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-emerald-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={pickupData.phone}
                      onChange={(e) => setPickupData({ ...pickupData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-emerald-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pickup Address</label>
                  <input
                    type="text"
                    value={pickupData.address}
                    onChange={(e) => setPickupData({ ...pickupData, address: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-emerald-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                    required
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPickupModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingPickup}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg"
                  >
                    {submittingPickup ? "Submitting..." : "Confirm Pickup"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

