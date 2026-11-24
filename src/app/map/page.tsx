"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Search,
  Crosshair,
  Layers,
  MapPin,
  Clock,
  Radio,
  ShieldCheck,
  Truck,
  ArrowRight,
  ExternalLink,
  X,
  Phone,
  Sparkles,
  Maximize2,
  AlertTriangle,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { CITIES_LIST, CityTab } from "@/lib/cities";

export const INDORE_NGOS = [
  { id: "ngo1", name: "Robin Hood Army - Palasia Chapter", lat: 22.7244, lng: 75.8839, capacity: 500, locality: "Old Palasia", address: "Near Saket Square, Old Palasia, Indore", phone: "+91 97708 69581" },
  { id: "ngo2", name: "Indore Food Bank & Child Care", lat: 22.7533, lng: 75.8937, capacity: 450, locality: "Vijay Nagar", address: "Sector B, Scheme No 54, Vijay Nagar, Indore", phone: "+91 97708 69581" },
  { id: "ngo3", name: "Aastha Vridh & Bal Seva Ashram", lat: 22.6950, lng: 75.8340, capacity: 350, locality: "Annapurna", address: "Annapurna Mandir Road, Indore", phone: "+91 97708 69581" },
  { id: "ngo4", name: "Sanjeevani Bal Ashram Relief Shelter", lat: 22.7196, lng: 75.8577, capacity: 380, locality: "Rajwada", address: "Rajwada Chowk Area, Old Indore", phone: "+91 97708 69581" },
  { id: "ngo5", name: "Akshaya Chaitanya Shelter Hub", lat: 22.7665, lng: 75.8940, capacity: 650, locality: "Scheme 78", address: "Scheme No 78, Part II, Vijay Nagar, Indore", phone: "+91 97708 69581" },
  { id: "ngo6", name: "Samarpan Night Shelter & Kusht Rogi Seva", lat: 22.6925, lng: 75.8672, capacity: 300, locality: "Bhanwarkuan", address: "IT Park Main Road, Bhanwarkuan, Indore", phone: "+91 97708 69581" },
  { id: "ngo7", name: "Apna Ghar Rain Basera", lat: 22.7180, lng: 75.8720, capacity: 400, locality: "Chhotigwaltoli", address: "Near Railway Station, Chhotigwaltoli, Indore", phone: "+91 97708 69581" },
  { id: "ngo8", name: "Snehalaya Child Welfare & Shelter Home", lat: 22.7120, lng: 75.9180, capacity: 320, locality: "Bicholi Mardana", address: "Bicholi Mardana Bypass, Indore", phone: "+91 97708 69581" },
  { id: "ngo9", name: "Matruchhaya Bal Kalyan Sansthan", lat: 22.7010, lng: 75.8820, capacity: 350, locality: "Navlakha", address: "Manoramaganj, Navlakha Square, Indore", phone: "+91 97708 69581" },
  { id: "ngo10", name: "Seva Bharati Annakshetra", lat: 22.6350, lng: 75.8050, capacity: 500, locality: "Rau", address: "Rau - Pithampur Link Road, Indore", phone: "+91 97708 69581" },
  { id: "ngo11", name: "Madhav Netra & Hunger Relief Shelter", lat: 22.7050, lng: 75.8710, capacity: 280, locality: "Sapna Sangeeta", address: "Sapna Sangeeta Road, Indore", phone: "+91 97708 69581" },
  { id: "ngo12", name: "Prayas Social Welfare Night Shelter", lat: 22.7420, lng: 75.8150, capacity: 320, locality: "Super Corridor", address: "Super Corridor Crossing, Bada Bangarda, Indore", phone: "+91 97708 69581" },
];

// Dynamic import with SSR disabled for Leaflet map
const DynamicMap = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] bg-slate-900 dark:bg-slate-950 flex flex-col items-center justify-center text-emerald-500 gap-3">
      <Radio className="w-8 h-8 animate-pulse text-emerald-500" />
      <span className="text-xs font-mono font-bold tracking-widest uppercase">
        Initializing Geospatial Telemetry Feed...
      </span>
    </div>
  ),
});



export default function LiveMapPage() {
  const { t } = useLanguage();
  const [currentTimeZULU, setCurrentTimeZULU] = useState("");
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [baseLayer, setBaseLayer] = useState<"street" | "satellite">("street");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [measuringAoi, setMeasuringAoi] = useState(false);
  const [aoiStats, setAoiStats] = useState<{ count: number; kg: number; areaKm2: number } | null>(null);

  const [listings, setListings] = useState<any[]>([]);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [activeCity, setActiveCity] = useState<CityTab>(CITIES_LIST[0]);

  // Fetch listings and merge with client-saved live listings
  const fetchListings = async () => {
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

      setListings(Array.from(mergedMap.values()));
    } catch (e) {
      // quiet
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    const interval = setInterval(fetchListings, 5000); // 5s live polling
    return () => clearInterval(interval);
  }, []);

  // Clock & Uptime timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const zulu = now.toISOString().substring(11, 19) + "Z";
      setCurrentTimeZULU(zulu);
      setUptimeSeconds((prev) => prev + 1);
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  const formatUptime = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Locate Me with High Accuracy GPS Telemetry
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCity: CityTab = {
            name: "My Location",
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            zoom: 15,
            icon: "📍",
            state: "Live GPS Telemetry",
          };
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setActiveCity(userCity);
        },
        (err) => {
          console.warn("Geolocation warning:", err);
          alert("Location permission denied or unavailable. Please enable GPS location services in your browser.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const totalKgTracked = listings.reduce((sum, item) => sum + (item.quantityKg || 0), 0);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* 1. Header Banner */}
      <section className="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 px-4 sm:px-6 lg:px-8 pt-8 pb-4 border-b border-slate-200 dark:border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-[11px] font-mono tracking-wider mb-2">
              <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              OSIRIS GEOSPATIAL INTELLIGENCE • V2.4
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("mapTitle", "Mission Radar & Surplus Dispatch Map")}
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
              {t("mapSubtitle", "Real-time geospatial command center for monitoring commercial surplus food pickups, volunteer driver telemetry, verified NGO shelters, and hunger relief clusters across India.")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/volunteer"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/20 transition-all"
            >
              <span>{t("driverApp", "DRIVER APP")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/signup?role=NGO"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors"
            >
              {t("ngoCenter", "NGO CENTER")}
            </Link>
          </div>
        </div>

        {/* 2. Tactical Telemetry Bar */}
        <div className="max-w-7xl mx-auto mt-6 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 font-bold text-[10px]">
              RESCUEBITE GIS
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              ZULU <strong className="text-amber-600 dark:text-amber-400">{currentTimeZULU}</strong>
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              UPTIME: <strong className="text-emerald-600 dark:text-emerald-400">{formatUptime(uptimeSeconds)}</strong>
            </span>
            <span className="text-slate-700 dark:text-slate-300 hidden md:inline">
              POS: <strong className="text-cyan-700 dark:text-cyan-400">{activeCity.lat.toFixed(4)}°N, {activeCity.lng.toFixed(4)}°E</strong>
            </span>
            <span className="text-slate-700 dark:text-slate-300 hidden lg:inline">
              ZOOM: <strong className="text-emerald-700 dark:text-emerald-300">{activeCity.zoom}.0x</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-800 dark:text-blue-300 text-[11px] font-bold">
              📡 {listings.length} {t("activeDispatches", "Active Dispatches")}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
              ⚡ {totalKgTracked} kg {t("trackedVolume", "Tracked")}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> FSSAI Certified
            </span>
          </div>
        </div>

        {/* 3. City Quick-Tabs (Multi-City Coverage) */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 flex-nowrap">
            {userCoords && (
              <button
                onClick={() => {
                  setActiveCity({
                    name: "My Location",
                    lat: userCoords.lat,
                    lng: userCoords.lng,
                    zoom: 15,
                    icon: "📍",
                    state: "Live GPS Telemetry",
                  });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCity.name === "My Location"
                    ? "bg-blue-600 text-white shadow-md font-bold"
                    : "bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                <span>📍 My Location</span>
              </button>
            )}
            {CITIES_LIST.map((city) => {
              const isActive = activeCity.name === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    setActiveCity(city);
                    setUserCoords(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                      : "bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-emerald-900/40"
                  }`}
                >
                  <span>{city.icon}</span>
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>

          {/* Map Top Action Controls (Locate Me, Satellite, AOI) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Locate Me */}
            <button
              onClick={handleLocateMe}
              title="Find my current GPS location"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1.5 shadow transition-colors"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>{t("locateMe", "Locate Me")}</span>
            </button>

            {/* AOI Zone Measurement */}
            <button
              onClick={() => {
                setMeasuringAoi(!measuringAoi);
                if (measuringAoi) setAoiStats(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                measuringAoi
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-300 dark:border-emerald-900/40"
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{measuringAoi ? t("aoiActive", "AOI Active (Click Map)") : t("measureAoi", "MEASURE AOI ZONE")}</span>
            </button>

            {/* Satellite / Street Switcher */}
            <button
              onClick={() => setBaseLayer(baseLayer === "street" ? "satellite" : "street")}
              title="Toggle Street / Satellite imagery"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-900 hover:bg-emerald-100 dark:hover:bg-slate-800 border border-emerald-300 dark:border-emerald-800/40 flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{baseLayer === "street" ? t("satellite", "Satellite") : t("street", "Street")}</span>
            </button>
          </div>
        </div>

        {/* 4. Filter Chips & Search Bar */}
        <div className="max-w-7xl mx-auto mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchMapPlaceholder", "Search food, donor, city...")}
              className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-300 dark:border-emerald-900/40 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "ALL", label: t("filterAll", "All") },
              { id: "NGO", label: "🏛️ Indore NGOs (12)" },
              { id: "VERIFIED", label: t("filterVerified", "✓ Verified") },
              { id: "AVAILABLE", label: t("filterAvailable", "AVAILABLE") },
              { id: "IN_TRANSIT", label: t("filterInTransit", "IN TRANSIT") },
              { id: "DELIVERED", label: t("filterDelivered", "DELIVERED") },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilterStatus(f.id);
                  if (f.id === "NGO") {
                    setActiveCity(CITIES_LIST[0]); // Auto-pan directly to Indore
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filterStatus === f.id
                    ? f.id === "NGO"
                      ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                      : "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
                    : "bg-white dark:bg-slate-900/70 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-emerald-950 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AOI Zone Measurement Result Banner */}
      {aoiStats && (
        <div className="bg-emerald-950/90 border-b border-emerald-700/50 py-2 px-4 text-center text-xs font-mono text-emerald-200 flex items-center justify-center gap-4">
          <span>📐 Area of Interest: <strong>{aoiStats.areaKm2} km²</strong></span>
          <span>•</span>
          <span>Surplus Lots Inside: <strong className="text-amber-400">{aoiStats.count} listings</strong></span>
          <span>•</span>
          <span>Total Volume: <strong className="text-white">{aoiStats.kg} kg</strong></span>
          <button
            onClick={() => setAoiStats(null)}
            className="text-slate-400 hover:text-white underline ml-2"
          >
            Clear
          </button>
        </div>
      )}

      {/* 5. Main Map Viewport */}
      <div className="relative flex-1 w-full min-h-[550px] lg:min-h-[640px]">
        <DynamicMap
          cityCoords={activeCity}
          baseLayer={baseLayer}
          listings={listings}
          filterStatus={filterStatus}
          searchQuery={searchQuery}
          measuringAoi={measuringAoi}
          userCoords={userCoords}
          onSelectListing={(item) => setSelectedListing(item)}
          onAoiMeasured={(stats) => setAoiStats(stats)}
        />

        {/* Indore NGO Directory Drawer when NGO Filter is Active */}
        {filterStatus === "NGO" && !selectedListing && (
          <div className="absolute top-4 left-4 z-30 w-80 sm:w-96 max-h-[85vh] flex flex-col rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-purple-300 dark:border-purple-800/60 shadow-2xl backdrop-blur-2xl text-slate-800 dark:text-slate-200 overflow-hidden">
            <div className="p-4 border-b border-purple-100 dark:border-purple-900/40 bg-purple-50/70 dark:bg-purple-950/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
                  🏛️ INDORE SHELTER NETWORK
                </span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mt-1">
                  12 Verified Shelters in Indore
                </h3>
              </div>
              <button
                onClick={() => setFilterStatus("ALL")}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Close NGO Directory"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto space-y-2.5 max-h-[calc(85vh-130px)] scrollbar-thin">
              {INDORE_NGOS.map((ngo) => (
                <div
                  key={ngo.id}
                  onClick={() => {
                    setActiveCity({
                      name: ngo.name,
                      lat: ngo.lat,
                      lng: ngo.lng,
                      zoom: 16,
                      icon: "🏛️",
                      state: ngo.locality,
                    });
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-purple-950/60 bg-white dark:bg-slate-900/70 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {ngo.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-900 whitespace-nowrap">
                      {ngo.locality}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    📍 {ngo.address}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      🍲 Cap: {ngo.capacity} kg/day
                    </span>
                    <a
                      href={`tel:${ngo.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 border-t border-purple-100 dark:border-purple-900/40 bg-slate-50 dark:bg-slate-900/60 text-[11px] text-center text-slate-600 dark:text-slate-400">
              💡 <em>Click any shelter card to fly map and zoom right to it!</em>
            </div>
          </div>
        )}

        {/* Interactive Marker Side Drawer / Modal */}
        {selectedListing && (
          <div className="absolute top-4 right-4 z-30 w-80 sm:w-96 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-300 dark:border-emerald-700/50 p-5 shadow-2xl backdrop-blur-2xl text-slate-800 dark:text-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-emerald-900/40">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedListing.isEmergency ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800" : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                }`}>
                  {selectedListing.status}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                  {selectedListing.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Rescued Quantity:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedListing.quantityKg} kg ({selectedListing.approxServings || selectedListing.quantityKg * 3} meals)</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">AI Safety Score:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedListing.freshnessScore}% ({selectedListing.aiVerdict || "GENUINE"})</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Donor Establishment:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedListing.donor?.name || "Verified Donor"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Pickup Window:</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{selectedListing.pickupWindowStart || "Immediate"} - {selectedListing.pickupWindowEnd || "3 Hours"}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/30">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Location Address:</span>
                <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5 font-medium">{selectedListing.address}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300">
                <strong>AI Quality Note:</strong> {selectedListing.aiReasoning || "Fresh surplus meal verified compliant with thermal safety standards."}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2">
              <Link
                href={`/track/${selectedListing.id}`}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Open Live Mission Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedListing.lat},${selectedListing.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-emerald-900/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Navigate</span>
                </a>

                {selectedListing.donor?.phone && (
                  <a
                    href={`tel:${selectedListing.donor.phone}`}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-emerald-900/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Call Donor</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
