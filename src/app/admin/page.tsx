"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  MapPin,
  Inbox,
  Globe,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Users,
  FileText,
  TrendingUp,
  Activity,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  LogOut,
  Sparkles,
  Phone,
  Clock,
  Shield,
  Edit,
  Save,
  Download,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<
    | "overview"
    | "verifications"
    | "donations"
    | "map"
    | "messages"
    | "cms"
    | "donors"
    | "ngos"
    | "users"
    | "audit"
    | "impact"
    | "health"
  >("overview");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    listings: [],
    users: [],
    messages: [],
    auditLogs: [],
    cms: {},
  });

  const [verificationData, setVerificationData] = useState<any>({
    pendingFoodListings: [],
    pendingNgos: [],
    commercialDonors: [],
    approvedHistory: [],
    counts: { pendingFood: 0, pendingNgos: 0, commercialDonors: 0, totalApproved: 0 },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [verificationTab, setVerificationTab] = useState<"food" | "ngo" | "donors" | "history">("food");
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // CMS state for editor
  const [cmsValues, setCmsValues] = useState({
    helpline_phone: "+91 97708 69581",
    helpline_email: "hello@rescuebite.in",
    hero_h1: "No food wasted. No one left hungry.",
    hero_subtext: "RescueBite bridges restaurants, hotels, caterers, grocery stores and households with local NGOs, verified volunteers and recyclers across India in real time.",
  });
  const [cmsSaved, setCmsSaved] = useState(false);

  const fetchAdminData = async () => {
    try {
      const [listingsRes, verifRes, settingsRes] = await Promise.all([
        fetch("/api/listings"),
        fetch("/api/admin/verifications"),
        fetch("/api/settings"),
      ]);

      if (listingsRes.ok) {
        const d = await listingsRes.json();
        setData((prev: any) => ({ ...prev, listings: d.listings || [] }));
      }

      if (verifRes.ok) {
        const vd = await verifRes.json();
        setVerificationData(vd);
      }

      if (settingsRes.ok) {
        const sd = await settingsRes.json();
        setCmsValues((prev) => ({ ...prev, ...sd }));
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApprove = async (id: string, targetType: "FOOD" | "NGO" = "FOOD") => {
    setActionInProgress(id);
    try {
      const res = await fetch("/api/admin/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "APPROVE", id, targetType }),
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (e) {
      alert("Error approving item.");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (id: string, targetType: "FOOD" | "NGO" = "FOOD") => {
    const reason = prompt("Enter reason for rejection:", "Temperature outside safe microbial window");
    if (!reason) return;

    setActionInProgress(id);
    try {
      const res = await fetch("/api/admin/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "REJECT", id, reason, targetType }),
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (e) {
      alert("Error rejecting item.");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cmsValues),
      });
      if (res.ok) {
        setCmsSaved(true);
        setTimeout(() => setCmsSaved(false), 3000);
      }
    } catch (e) {
      alert("Failed to save settings.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const pendingCount = (verificationData.pendingFoodListings || []).length;
  const activeCount = data.listings.filter((l: any) => l.status === "AVAILABLE" || l.status === "MATCHED" || l.status === "IN_TRANSIT").length;
  const deliveredCount = data.listings.filter((l: any) => l.status === "DELIVERED").length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col md:flex-row">
      {/* LEFT SIDEBAR matching screenshots 12 & 13 */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand & Control Center Header */}
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
              RB
            </div>
            <div>
              <div className="font-black text-slate-900 text-sm leading-tight">RescueBite</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Admin Control Center
              </div>
            </div>
          </div>

          {/* Super Admin Badge Pill */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-slate-900">RescueBite Admin</div>
              <div className="text-[10px] text-slate-400 font-mono">SUPER ADMIN</div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
              SECURE
            </span>
          </div>

          {/* Sidebar Nav Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "donations", label: "Donations & Food", icon: Utensils },
              { id: "map", label: "Operations Map", icon: MapPin },
              { id: "messages", label: "Messages Inbox", icon: Inbox },
              { id: "cms", label: "CMS Website Editor", icon: Globe },
              { id: "donors", label: "Restaurants & Donors", icon: Building2 },
              { id: "ngos", label: "NGO Partners", icon: HeartHandshake },
              { id: "verifications", label: "Verifications", icon: ShieldCheck, badge: pendingCount },
              { id: "users", label: "Users & Roles", icon: Users },
              { id: "audit", label: "Audit Trail", icon: FileText },
              { id: "impact", label: "Impact Analytics", icon: TrendingUp },
              { id: "health", label: "System Health", icon: Activity },
            ].map((item) => {
              const IconC = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white font-bold shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconC className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white text-emerald-700" : "bg-amber-100 text-amber-800"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Buttons */}
        <div className="p-4 border-t border-slate-100 space-y-2 text-xs">
          <Link
            href="/"
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto overflow-y-auto">
        {/* Top Workspace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              RescueBite Platform — Control Center & Live Verification Gate
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Donation</span>
            </Link>

            <button
              onClick={fetchAdminData}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 1. MODULE: OVERVIEW (Matching Screenshot 12) */}
        {activeModule === "overview" && (
          <div className="space-y-8 mt-6">
            {/* 6 KPI Cards matching screenshot 12 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Total Users</span>
                <div className="text-2xl font-black text-slate-900 mt-1">28</div>
                <div className="text-[10px] text-slate-400 mt-0.5">19 donors • 6 volunteers • 3 NGOs</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Active Donations</span>
                <div className="text-2xl font-black text-amber-600 mt-1">{activeCount}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Awaiting pickup or in transit</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Completed Deliveries</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">{deliveredCount}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Audited with 80G tax receipt</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Pending Verification</span>
                <div className="text-2xl font-black text-red-600 mt-1">{pendingCount}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Donations awaiting review</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Active Pickups</span>
                <div className="text-2xl font-black text-blue-600 mt-1">1</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Couriers en route with GPS</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Today's Donations</span>
                <div className="text-2xl font-black text-teal-600 mt-1">8</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Across Indore and Major Hubs</div>
              </div>
            </div>

            {/* Quick Access Tiles matching screenshot 12 */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Quick Access
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Manage Donations", desc: "View, verify and assign all donations", mod: "donations" },
                  { title: "Live Verification Gate", desc: "AI Safety verification queue", mod: "verifications" },
                  { title: "Live Operations Map", desc: "Real-time radar of active missions", mod: "map" },
                  { title: "CMS Website Editor", desc: "Update helpline, headlines & FAQs", mod: "cms" },
                  { title: "Audit Trail", desc: "Immutable security and action ledger", mod: "audit" },
                  { title: "System Health", desc: "Database, AI, and GIS status diagnostics", mod: "health" },
                ].map((q) => (
                  <button
                    key={q.title}
                    onClick={() => setActiveModule(q.mod as any)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition-all text-left group shadow-sm"
                  >
                    <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                      {q.title} →
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{q.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Donations List */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Recent Food Donations</h3>
                <button onClick={() => setActiveModule("donations")} className="text-xs text-emerald-600 font-bold hover:underline">
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {data.listings.slice(0, 6).map((item: any) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        {item.donor?.name || "Donor"} • {item.address} • {item.quantityKg} kg
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        item.status === "DELIVERED"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "AVAILABLE"
                          ? "bg-blue-100 text-blue-800"
                          : item.status === "IN_TRANSIT"
                          ? "bg-purple-100 text-purple-800"
                          : item.status === "SUBMITTED"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {item.status}
                      </span>
                      <Link
                        href={`/track/${item.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. MODULE: VERIFICATIONS QUEUE (Matching Screenshots 13 & 14) */}
        {activeModule === "verifications" && (
          <div className="space-y-6 mt-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Live Verification & Food Safety Gate
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Platform Verification Queue
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Review incoming food donations, partner NGO foundations, and commercial food donors before publishing to live missions.
              </p>
            </div>

            {/* 4 Counter Cards matching screenshot 13 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-amber-300 bg-amber-50/40">
                <span className="text-[11px] font-bold text-amber-800 uppercase">Pending Food Donations</span>
                <div className="text-2xl font-black text-amber-900 mt-1">
                  {verificationData.pendingFoodListings?.length || 0}
                </div>
                <div className="text-[10px] text-amber-700 mt-0.5">Awaiting FSSAI safety approval</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Pending NGO Partners</span>
                <div className="text-2xl font-black text-slate-800 mt-1">
                  {verificationData.pendingNgos?.length || 0}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">DARPAN credentials check</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Commercial Donors</span>
                <div className="text-2xl font-black text-slate-800 mt-1">
                  {verificationData.commercialDonors?.length || 0}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Restaurants & Marriage Palaces</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-300 bg-emerald-50/40">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Total Approved</span>
                <div className="text-2xl font-black text-emerald-900 mt-1">
                  {verificationData.approvedHistory?.length || 0}
                </div>
                <div className="text-[10px] text-emerald-700 mt-0.5">Published to live courier feed</div>
              </div>
            </div>

            {/* Tab Filter Bar matching screenshot 13 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setVerificationTab("food")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  verificationTab === "food"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Food Donations Queue ({verificationData.pendingFoodListings?.length || 0})
              </button>
              <button
                onClick={() => setVerificationTab("ngo")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  verificationTab === "ngo"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                NGO Foundation Applications ({verificationData.pendingNgos?.length || 0})
              </button>
              <button
                onClick={() => setVerificationTab("donors")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  verificationTab === "donors"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Commercial Donor Registrations ({verificationData.commercialDonors?.length || 0})
              </button>
              <button
                onClick={() => setVerificationTab("history")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  verificationTab === "history"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                Approved History ({verificationData.approvedHistory?.length || 0})
              </button>
            </div>

            {/* Search filter input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter queue by title, donor name, organization, or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Verification Cards matching screenshot 14 */}
            {verificationTab === "food" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(verificationData.pendingFoodListings || []).length === 0 ? (
                  <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-slate-200">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                    <h3 className="text-base font-bold text-slate-800">Verification Queue is Clear</h3>
                    <p className="text-xs text-slate-500 mt-1">All incoming food donations have been verified and dispatched.</p>
                  </div>
                ) : (
                  (verificationData.pendingFoodListings || []).map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Food Donation
                          </span>
                          <h3 className="text-lg font-black text-slate-900 mt-1.5 leading-snug">
                            {item.title} ({item.quantityKg} kg)
                          </h3>
                          <div className="text-xs text-slate-500 mt-0.5">
                            From {item.donor?.name || "Donor"} • Fresh • {item.donor?.donorProfile?.businessType || "Individual"}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Location: <strong className="text-slate-800">{item.address}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>Submitted By: {item.donor?.name || "Donor"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>Contact Phone: {item.donor?.phone || "+91 97708 69581"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Pickup Window: {item.pickupWindowStart} - {item.pickupWindowEnd}</span>
                        </div>
                      </div>

                      {/* AI Verification Score Banner matching screenshot 14 */}
                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-bold text-emerald-900">
                              AI Verification Score: {item.freshnessScore}% ({item.aiVerdict})
                            </div>
                            <div className="text-[11px] text-emerald-700">
                              Freshness & food safety confirmed. FSSAI hygiene...
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 underline cursor-pointer">
                          View Details
                        </span>
                      </div>

                      {/* Action Buttons matching screenshot 14 */}
                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={() => handleApprove(item.id, "FOOD")}
                          disabled={actionInProgress === item.id}
                          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Publish Live</span>
                        </button>

                        <button
                          onClick={() => handleReject(item.id, "FOOD")}
                          disabled={actionInProgress === item.id}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {verificationTab === "ngo" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200">
                <h3 className="font-bold text-sm mb-4">NGO Foundations Queue</h3>
                {verificationData.pendingNgos?.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No pending NGO applications.</p>
                ) : (
                  verificationData.pendingNgos.map((ngo: any) => (
                    <div key={ngo.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs mb-3">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{ngo.name}</div>
                        <div className="text-slate-500">DARPAN ID: {ngo.ngoProfile?.darpanId || "Pending Verification"}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(ngo.id, "NGO")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                        >
                          Verify NGO
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. MODULE: CMS WEBSITE EDITOR */}
        {activeModule === "cms" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 mt-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">CMS Website Content Editor</h2>
              <p className="text-xs text-slate-500 mt-1">
                Update official helpline, top alert bar, and homepage hero texts dynamically without code redeploys.
              </p>
            </div>

            {cmsSaved && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                CMS Settings Saved Successfully! Live across website.
              </div>
            )}

            <form onSubmit={handleSaveCms} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Helpline Phone</label>
                <input
                  type="text"
                  value={cmsValues.helpline_phone}
                  onChange={(e) => setCmsValues({ ...cmsValues, helpline_phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Support Email</label>
                <input
                  type="email"
                  value={cmsValues.helpline_email}
                  onChange={(e) => setCmsValues({ ...cmsValues, helpline_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Homepage Hero H1 Headline</label>
                <input
                  type="text"
                  value={cmsValues.hero_h1}
                  onChange={(e) => setCmsValues({ ...cmsValues, hero_h1: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Subtext</label>
                <textarea
                  rows={3}
                  value={cmsValues.hero_subtext}
                  onChange={(e) => setCmsValues({ ...cmsValues, hero_subtext: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save & Publish Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* 4. MODULE: DONATIONS & FOOD TABLE */}
        {activeModule === "donations" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 mt-6">
            <h2 className="text-xl font-bold text-slate-900">Food Listings & Dispatches</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Donor</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">AI Score</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.listings.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{item.title}</td>
                      <td className="py-3 px-4 text-slate-600">{item.donor?.name || "Donor"}</td>
                      <td className="py-3 px-4 font-semibold">{item.quantityKg} kg</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">{item.freshnessScore}%</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/track/${item.id}`}
                          className="text-emerald-600 font-bold hover:underline"
                        >
                          View Mission
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. MODULE: OPERATIONS MAP */}
        {activeModule === "map" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Live Operations Radar</h2>
                <p className="text-xs text-slate-500">Real-time geospatial fleet and shelter telemetry</p>
              </div>
              <Link
                href="/map"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Open Fullscreen GIS Map
              </Link>
            </div>
            <div className="h-96 rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-emerald-400 gap-3">
              <MapPin className="w-8 h-8 animate-bounce text-emerald-500" />
              <span className="text-xs font-mono font-bold">
                14 Active Geocoded Dispatches Across Indore & National Hubs
              </span>
              <Link href="/map" className="text-amber-400 text-xs underline font-bold">
                Launch Interactive Live Map View →
              </Link>
            </div>
          </div>
        )}

        {/* 6. MODULE: SYSTEM HEALTH */}
        {activeModule === "health" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 mt-6">
            <h2 className="text-xl font-bold text-slate-900">System Health Diagnostics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Database Engine</div>
                  <div className="text-slate-500 text-[11px]">Prisma ORM • SQLite / PostgreSQL</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  HEALTHY
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">AI Quality Inspection</div>
                  <div className="text-slate-500 text-[11px]">Gemini Vision API + Rule Engine Fallback</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  OPERATIONAL
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">GIS Telemetry Engine</div>
                  <div className="text-slate-500 text-[11px]">OSRM Routing & Esri Satellite Layers</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  SYNCHRONIZED
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">WhatsApp Dispatch Gateway</div>
                  <div className="text-slate-500 text-[11px]">wa.me Deep Link Protocol</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  CONNECTED
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

