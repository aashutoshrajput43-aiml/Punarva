"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Truck,
  Building2,
  User,
  ShieldCheck,
  FileText,
  MapPin,
  Phone,
  Share2,
  ArrowRight,
  AlertTriangle,
  Download,
  Sparkles,
} from "lucide-react";
import { generate80GPdfReceipt } from "@/lib/pdfReceipt";

export default function MissionTrackPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMission = async () => {
    try {
      const res = await fetch(`/api/listings/${id}`);
      if (res.ok) {
        const data = await res.json();
        setListing(data.listing);
      }
    } catch (e) {
      // quiet
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMission();
      const interval = setInterval(fetchMission, 5000);
      return () => clearInterval(interval);
    }
  }, [id]);

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/delivery/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: id,
          pin: pinInput,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPinModalOpen(false);
        fetchMission();
      } else {
        setErrorMsg(data.error || "PIN verification failed.");
      }
    } catch (err: any) {
      setErrorMsg("Network error: " + err.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!listing) return;
    const match = listing.matches?.[0];
    const delivery = listing.deliveryRecord;

    generate80GPdfReceipt({
      receiptNumber: delivery?.receiptNumber || `RB-80G-${new Date().getFullYear()}-001429`,
      donorName: listing.donor?.name || "Good Samaritan Donor",
      businessType: listing.donor?.donorProfile?.businessType || "Restaurant",
      foodTitle: listing.title,
      quantityKg: listing.quantityKg,
      mealsServed: delivery?.mealsServed || Math.round(listing.quantityKg * 3),
      co2SavedKg: delivery?.co2SavedKg || Math.round(listing.quantityKg * 2.5),
      waterSavedLiters: delivery?.waterSavedLiters || Math.round(listing.quantityKg * 500),
      ngoName: match?.ngo?.name || "Robin Hood Army - Indore Chapter",
      ngoDarpanId: "MP/2021/028491",
      completedDate: new Date(delivery?.completedAt || Date.now()).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      deliveryPin: listing.deliveryPin,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center transition-colors">
        <Truck className="w-10 h-10 animate-bounce mb-3" />
        <span className="text-sm font-mono tracking-widest uppercase">
          Locating Mission Telemetry...
        </span>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col items-center justify-center p-4 transition-colors">
        <h2 className="text-xl font-bold mb-2">Listing not found</h2>
        <Link href="/map" className="text-emerald-600 dark:text-emerald-400 underline text-sm">
          Return to Live Map
        </Link>
      </div>
    );
  }

  const steps = [
    { key: "SUBMITTED", label: "Listed", desc: "Logged with AI Freshness Score" },
    { key: "AVAILABLE", label: "Verified", desc: "FSSAI Food Safety Approved" },
    { key: "MATCHED", label: "Matched", desc: "Courier & NGO Shelter Assigned" },
    { key: "IN_TRANSIT", label: "In Transit", desc: "Insulated Bag Pickup Completed" },
    { key: "DELIVERED", label: "Delivered", desc: "4-Digit PIN Drop Confirmed" },
  ];

  const getStepStatus = (stepKey: string) => {
    const order = ["SUBMITTED", "AVAILABLE", "MATCHED", "IN_TRANSIT", "DELIVERED"];
    const currentIndex = order.indexOf(listing.status);
    const stepIndex = order.indexOf(stepKey);
    if (currentIndex >= stepIndex) return "COMPLETED";
    if (currentIndex === stepIndex - 1) return "CURRENT";
    return "UPCOMING";
  };

  const match = listing.matches?.[0];
  const volunteer = match?.volunteer;
  const ngo = match?.ngo;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                listing.status === "DELIVERED"
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                  : listing.isEmergency
                  ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 animate-pulse"
                  : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800"
              }`}>
                ● STATUS: {listing.status}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                REF: #{listing.id.slice(0, 8)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {listing.title}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Donor: <strong className="text-slate-800 dark:text-slate-200">{listing.donor?.name || "Verified Establishment"}</strong> • Location: {listing.address}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {listing.status === "DELIVERED" ? (
              <button
                onClick={handleDownloadPdf}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download 80G Tax Receipt (PDF)</span>
              </button>
            ) : (
              <button
                onClick={() => setPinModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Delivery with PIN</span>
              </button>
            )}

            <Link
              href="/map"
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300 dark:border-slate-700"
            >
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>View on Map</span>
            </Link>
          </div>
        </div>

        {/* Status Pipeline Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 shadow-sm">
          <h2 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-6">
            Live Dispatch Pipeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {steps.map((st, idx) => {
              const status = getStepStatus(st.key);
              return (
                <div key={st.key} className="flex flex-col items-start relative group">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        status === "COMPLETED"
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                          : status === "CURRENT"
                          ? "bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 animate-pulse"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {status === "COMPLETED" ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-white">{st.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{st.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3-Column Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Food & Safety */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/30 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Food & Quality Metrics
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-emerald-900/30">
                <span className="text-slate-500 dark:text-slate-400">Total Net Weight:</span>
                <span className="font-bold text-slate-900 dark:text-white">{listing.quantityKg} kg</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-emerald-900/30">
                <span className="text-slate-500 dark:text-slate-400">Nutritional Meals:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">~{listing.approxServings || listing.quantityKg * 3} portions</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-emerald-900/30">
                <span className="text-slate-500 dark:text-slate-400">AI Safety Score:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{listing.freshnessScore}% ({listing.aiVerdict})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-emerald-900/30">
                <span className="text-slate-500 dark:text-slate-400">Storage Condition:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{listing.storageCondition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Security PIN:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                  {listing.deliveryPin}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Volunteer Driver */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/30 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-cyan-500" />
              Volunteer Courier
            </h3>

            {volunteer ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold">
                    {volunteer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{volunteer.name}</div>
                    <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">FSSAI Certified Handler</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-emerald-900/30 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Vehicle:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{volunteer.volunteerProfile?.vehicleType || "Motorcycle (Insulated)"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Courier Rating:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">★ 4.95 (42 rescues)</span>
                  </div>
                  {volunteer.phone && (
                    <a
                      href={`tel:${volunteer.phone}`}
                      className="mt-2 w-full py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/80 dark:hover:bg-cyan-900 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Driver: {volunteer.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                Matching nearest available volunteer driver in Indore...
              </div>
            )}
          </div>

          {/* Card 3: Receiving NGO */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/30 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-500" />
              Receiving Shelter
            </h3>

            {ngo ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                    {ngo.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{ngo.name}</div>
                    <div className="text-[11px] text-amber-600 dark:text-amber-400">Verified NGO Partner</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-emerald-900/30 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Daily Capacity:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">400 kg / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Darpan Registration:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-200">MP/2021/028491</span>
                  </div>
                  {ngo.phone && (
                    <a
                      href={`tel:${ngo.phone}`}
                      className="mt-2 w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact NGO Shelter</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                Assigning closest verified NGO shelter with matching capacity...
              </div>
            )}
          </div>
        </div>

        {/* PIN VERIFICATION MODAL */}
        {pinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-emerald-700/60 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white">
                Enter 4-Digit Delivery PIN
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
                The receiving NGO shelter or courier enters the PIN provided by the donor to confirm drop.
              </p>

              {errorMsg && (
                <div className="mt-4 p-3 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleVerifyPin} className="mt-6 space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="e.g. 7193"
                    className="w-full text-center text-3xl font-mono tracking-widest font-black py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-emerald-700 text-amber-600 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Hint for demo: Donor PIN for this listing is <strong>{listing.deliveryPin}</strong>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPinModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verifying || pinInput.length < 4}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-950/20"
                  >
                    {verifying ? "Verifying..." : "Confirm & Issue 80G"}
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

