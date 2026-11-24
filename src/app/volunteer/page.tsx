"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Car,
  Truck,
  CheckCircle2,
  Navigation,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
  ExternalLink,
  MapPin,
  CheckSquare,
  Crosshair,
  Layers,
  Search,
  Radio,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { CITIES_LIST, CityTab } from "@/lib/cities";

// Dynamic import of Map with SSR disabled
const DynamicVolunteerMap = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-slate-900 dark:bg-slate-950 flex flex-col items-center justify-center text-emerald-500 gap-3 rounded-2xl">
      <Radio className="w-8 h-8 animate-pulse text-emerald-500" />
      <span className="text-xs font-mono font-bold tracking-widest uppercase">
        Loading Volunteer Surplus Geospatial Telemetry...
      </span>
    </div>
  ),
});

export default function VolunteerDashboardPage() {
  const { t } = useLanguage();
  const [activeMissions, setActiveMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Map Controls State
  const [activeCity, setActiveCity] = useState<CityTab>(CITIES_LIST[0]);
  const [baseLayer, setBaseLayer] = useState<"street" | "satellite">("street");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedMapListing, setSelectedMapListing] = useState<any>(null);

  // Cold Chain Checklist items
  const [checklist, setChecklist] = useState({
    insulatedBags: true,
    tempVerified: true,
    containersSealed: true,
    goodSamaritanBadge: true,
  });

  const fetchVolunteerData = async () => {
    try {
      const res = await fetch("/api/listings");
      let remoteListings: any[] = [];
      if (res.ok) {
        const data = await res.json();
        remoteListings = data.listings || [];
      }

      // Check local storage for newly submitted live listings
      let localListings: any[] = [];
      try {
        const raw = localStorage.getItem("rescuebite_local_listings");
        if (raw) localListings = JSON.parse(raw);
      } catch (e) {}

      // Merge and deduplicate by ID
      const mergedMap = new Map();
      remoteListings.forEach((item) => mergedMap.set(item.id, item));
      localListings.forEach((item) => mergedMap.set(item.id, item));

      const allListings = Array.from(mergedMap.values());

      // Filter missions that are MATCHED or IN_TRANSIT or AVAILABLE
      const missions = allListings.filter(
        (l: any) => l.status === "MATCHED" || l.status === "IN_TRANSIT" || l.status === "AVAILABLE"
      );
      setActiveMissions(missions);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteerData();
    const interval = setInterval(fetchVolunteerData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateMissionStatus = async (listingId: string, newStatus: string) => {
    setUpdatingId(listingId);
    // 1. Optimistic instant UI update
    setActiveMissions((prev) =>
      prev.map((item) => (item.id === listingId ? { ...item, status: newStatus } : item))
    );

    // 2. Persist to local storage
    try {
      const raw = localStorage.getItem("rescuebite_local_listings");
      if (raw) {
        const list = JSON.parse(raw);
        const updated = list.map((item: any) =>
          item.id === listingId ? { ...item, status: newStatus } : item
        );
        localStorage.setItem("rescuebite_local_listings", JSON.stringify(updated));
      }
    } catch (e) {}

    // 3. Sync to API backend
    try {
      await fetch(`/api/listings/${listingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
    } finally {
      setUpdatingId(null);
      fetchVolunteerData();
    }
  };

  // Locate Me
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCity: CityTab = {
            name: "My Location",
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            zoom: 14,
            icon: "🎯",
            state: "GPS Telemetry",
          };
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setActiveCity(userCity);
        },
        () => alert("Location permission denied. Please allow GPS access in your browser.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 shadow-xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {t("fleetDispatchMode", "Fleet Dispatch Mode • Active Courier")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("volunteerHeaderTitle", "Volunteer Courier Dashboard")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              {t("volunteerHeaderSubtitle", "Real-time surplus pickup notifications, thermal cold-chain checklists, and direct navigation.")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLocateMe}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Crosshair className="w-4 h-4" />
              <span>{t("locateMe", "Locate Me (GPS)")}</span>
            </button>
            <Link
              href="/map"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{t("openLiveDispatchMap", "Open Full Live Radar")}</span>
            </Link>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/30 shadow-sm">
            <div className="text-2xl font-black text-slate-900 dark:text-white">42 Rescues</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{t("completedDrops", "Completed Drops")}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">100% on-time delivery record</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/30 shadow-sm">
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">4,250 Pts</div>
            <div className="text-xs font-bold text-amber-700 dark:text-amber-300 mt-0.5">{t("karmaPointsEarned", "Karma Points Earned")}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Tier: Guardian (Silver Pin)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-emerald-900/30 shadow-sm">
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400">1,260 Meals</div>
            <div className="text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5">{t("mealsDeliveredToShelter", "Meals Enabled to Shelters")}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">1,050 kg CO₂ equivalent offset</div>
          </div>
        </div>

        {/* EMBEDDED LIVE MAP FOR VOLUNTEER SURPLUS */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-900/40 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-emerald-500" />
                  <span>Live Volunteer Surplus Radar & Pickup Map</span>
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Interactive real-time map with verified surplus food pickups, active couriers, and shelter drop locations across India.
              </p>
            </div>

            {/* Map Action Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Locate Me */}
              <button
                onClick={handleLocateMe}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1.5 shadow transition-colors"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>{t("locateMe", "Locate Me")}</span>
              </button>

              {/* Satellite / Street Switcher */}
              <button
                onClick={() => setBaseLayer(baseLayer === "street" ? "satellite" : "street")}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-emerald-300 dark:border-emerald-800/40 flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{baseLayer === "street" ? t("satellite", "Satellite") : t("street", "Street")}</span>
              </button>
            </div>
          </div>

          {/* City Quick-Tabs (All Indian Cities) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CITIES_LIST.map((city) => {
              const isActive = activeCity.name === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    setActiveCity(city);
                    setUserCoords(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span>{city.icon}</span>
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchMapPlaceholder", "Search food, donor, city...")}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white pl-9 pr-4 py-1.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "ALL", label: t("filterAll", "All") },
                { id: "VERIFIED", label: t("filterVerified", "✓ Verified") },
                { id: "AVAILABLE", label: t("filterAvailable", "AVAILABLE") },
                { id: "IN_TRANSIT", label: t("filterInTransit", "IN TRANSIT") },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    filterStatus === f.id
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Viewport Container */}
          <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/30">
            <DynamicVolunteerMap
              cityCoords={activeCity}
              baseLayer={baseLayer}
              listings={activeMissions}
              filterStatus={filterStatus}
              searchQuery={searchQuery}
              userCoords={userCoords}
              onSelectListing={(item) => setSelectedMapListing(item)}
            />

            {/* Selected Listing Floating Drawer on Volunteer Map */}
            {selectedMapListing && (
              <div className="absolute top-3 right-3 z-30 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-300 dark:border-emerald-700/50 p-4 shadow-2xl backdrop-blur-2xl text-slate-800 dark:text-slate-200 text-xs">
                <div className="flex items-start justify-between pb-2 border-b border-slate-200 dark:border-emerald-900/40">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                      {selectedMapListing.status}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white mt-1">
                      {selectedMapListing.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedMapListing(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Quantity:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedMapListing.quantityKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">AI Score:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedMapListing.freshnessScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Pickup PIN:</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{selectedMapListing.deliveryPin || "1234"}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                    📍 {selectedMapListing.address}
                  </p>
                </div>

                <div className="mt-3 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMapListing.lat},${selectedMapListing.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-xs flex items-center justify-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate</span>
                  </a>
                  <Link
                    href={`/track/${selectedMapListing.id}`}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center text-xs flex items-center justify-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Grid: Active Missions + Cold Chain Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Missions (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-500" />
                <span>{t("activePendingMissions", "Active & Pending Rescue Dispatches")}</span>
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 font-bold">
                {activeMissions.length} {t("missionsFound", "Missions Found")}
              </span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500">Loading missions...</div>
            ) : activeMissions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-emerald-900/30 text-center text-slate-500 dark:text-slate-400 text-xs shadow-sm">
                {t("noPendingDispatches", "No pending dispatches right now in this zone. System is on standby.")}
              </div>
            ) : (
              activeMissions.map((m) => {
                const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`;
                return (
                  <div
                    key={m.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.isEmergency ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 animate-pulse" : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                          }`}>
                            {m.status}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            #{m.id.slice(0, 8)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{m.title}</h3>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-lg font-black text-amber-600 dark:text-amber-400">{m.quantityKg} kg</span>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">~{m.quantityKg * 3} meals</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200 dark:border-emerald-900/30">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">{t("donorLocation", "Donor Location")}:</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{m.address}</span>
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">{t("pickupWindow", "Pickup Window")}:</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                          {m.pickupWindowStart || "Immediate"} - {m.pickupWindowEnd || "3 Hours"}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300 flex items-center justify-between">
                      <span><strong>AI Freshness Score:</strong> {m.freshnessScore}% ({m.aiVerdict || "GENUINE"})</span>
                      <span className="text-[11px] text-amber-700 dark:text-amber-300 font-mono font-bold">PIN: {m.deliveryPin}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href={navUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 min-w-[120px] py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{t("navigateGps", "Navigate (GPS)")}</span>
                      </a>

                      {(m.status === "MATCHED" || m.status === "AVAILABLE") && (
                        <button
                          onClick={() => updateMissionStatus(m.id, "IN_TRANSIT")}
                          disabled={updatingId === m.id}
                          className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{updatingId === m.id ? "Updating..." : t("markPickedUp", "Mark Picked Up")}</span>
                        </button>
                      )}

                      {m.status === "IN_TRANSIT" && (
                        <Link
                          href={`/track/${m.id}`}
                          className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t("confirmDropPin", "Confirm Drop with PIN")}</span>
                        </Link>
                      )}

                      <Link
                        href={`/track/${m.id}`}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1 transition-colors border border-slate-300 dark:border-slate-700"
                      >
                        <span>{t("viewDetails", "Details")}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cold Chain Safety Checklist (Right col) */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {t("coldChainChecklist", "Cold-Chain Safety Checklist")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("coldChainChecklistDesc", "Mandatory FSSAI Good Samaritan courier checks before commencing transport:")}
              </p>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.insulatedBags}
                    onChange={(e) => setChecklist({ ...checklist, insulatedBags: e.target.checked })}
                    className="mt-0.5 rounded text-emerald-500"
                  />
                  <span>Food-grade thermal insulated carrier bag clean & sanitized</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.tempVerified}
                    onChange={(e) => setChecklist({ ...checklist, tempVerified: e.target.checked })}
                    className="mt-0.5 rounded text-emerald-500"
                  />
                  <span>Thermal holding range: Hot meals &gt; 60°C or Chilled &lt; 5°C</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.containersSealed}
                    onChange={(e) => setChecklist({ ...checklist, containersSealed: e.target.checked })}
                    className="mt-0.5 rounded text-emerald-500"
                  />
                  <span>Container lids securely taped or foil-sealed without leakage</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.goodSamaritanBadge}
                    onChange={(e) => setChecklist({ ...checklist, goodSamaritanBadge: e.target.checked })}
                    className="mt-0.5 rounded text-emerald-500"
                  />
                  <span>Digital Punarva Volunteer ID & PIN prompt ready</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-emerald-900/30 text-[11px] text-slate-500 dark:text-slate-400">
                Protected by the <em>Indian Good Samaritan Law</em> for bona fide surplus food rescue.
              </div>
            </div>

            {/* Helpline Box */}
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/30 text-xs space-y-2 shadow-sm">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {t("courierHelplineTitle", "Courier Support Helpline")}
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                {t("courierHelplineDesc", "Facing road delays or donor unreachable? Call emergency dispatch coordinator:")}
              </p>
              <a
                href="tel:+919770869581"
                className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold font-mono hover:underline text-sm"
                title="Call Rescue Coordinator directly"
              >
                <Phone className="w-3.5 h-3.5" />
                +91 97708 69581
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
