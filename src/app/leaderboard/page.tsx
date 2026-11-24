"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Shield,
  Zap,
  Crown,
  Sprout,
  RefreshCw,
  Gift,
  Award,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "rewards" | "criteria">("leaderboard");
  const [timeFilter, setTimeFilter] = useState<"all" | "monthly" | "weekly">("all");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncTime, setSyncTime] = useState("");
  const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({});

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`/api/leaderboard?filter=${timeFilter}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.leaderboard || []);
        setSyncTime(new Date().toLocaleTimeString());
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFilter]);

  const handleClaim = (rewardId: string) => {
    setClaimedRewards((prev) => ({ ...prev, [rewardId]: true }));
    alert("Reward Claimed! Check your email and RescueBite notification inbox for voucher code and certificate.");
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🏆</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="text-amber-400 font-bold">★</span>;
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Karma Leaderboard — Live Civic Gamification & Rewards
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Recognizing food donors, volunteer heroes, and NGO champions leading India's circular surplus revolution.
          </p>
        </div>

        {/* 4 Tier Cards matching screenshot 10 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tier 1: Rescuer */}
          <div className="p-5 rounded-2xl bg-white dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-800/40 text-center flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Rescuer</h3>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold mt-0.5">0–999 pts</span>
          </div>

          {/* Tier 2: Guardian */}
          <div className="p-5 rounded-2xl bg-white dark:bg-blue-950/30 border border-slate-200 dark:border-blue-800/40 text-center flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Guardian</h3>
            <span className="text-xs text-blue-700 dark:text-blue-400 font-mono font-bold mt-0.5">1,000–4,999 pts</span>
          </div>

          {/* Tier 3: Champion */}
          <div className="p-5 rounded-2xl bg-white dark:bg-amber-950/30 border border-slate-200 dark:border-amber-800/40 text-center flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Champion</h3>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-mono font-bold mt-0.5">5,000–14,999 pts</span>
          </div>

          {/* Tier 4: Legend */}
          <div className="p-5 rounded-2xl bg-white dark:bg-purple-950/30 border border-slate-200 dark:border-purple-800/40 text-center flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
              <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Legend</h3>
            <span className="text-xs text-purple-700 dark:text-purple-400 font-mono font-bold mt-0.5">15,000+ pts</span>
          </div>
        </div>

        {/* Tab Switcher & Live Sync Indicator matching screenshot 10 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Main 3 Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-900/40 shadow-sm">
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "leaderboard"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Live Leaderboard</span>
            </button>

            <button
              onClick={() => setActiveTab("rewards")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "rewards"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Rewards & Milestones <span className="text-[10px] bg-amber-100 dark:bg-slate-900/30 text-amber-900 dark:text-amber-300 px-1.5 py-0.5 rounded font-mono">5,000 pts</span></span>
            </button>

            <button
              onClick={() => setActiveTab("criteria")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "criteria"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Point Criteria</span>
            </button>
          </div>

          {/* Sync indicator with refresh */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync Active • {syncTime || "8:55:24 PM"}
            </span>
            <button
              onClick={fetchLeaderboard}
              title="Refresh Leaderboard"
              className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-emerald-900/40 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TAB 1: LIVE LEADERBOARD TABLE */}
        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            {/* Sub-filters (All Time / Monthly / Weekly) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 shadow-sm w-fit">
              {(["all", "monthly", "weekly"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    timeFilter === t
                      ? "bg-emerald-500 text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {t === "all" ? "All Time" : t}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-slate-900/80 shadow-sm backdrop-blur-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-emerald-900/40 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-5">#</th>
                    <th className="py-4 px-5">Volunteer / Donor</th>
                    <th className="py-4 px-5 text-center">Deliveries</th>
                    <th className="py-4 px-5 text-right">Kg Rescued</th>
                    <th className="py-4 px-5 text-right">Karma Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/20 text-slate-700 dark:text-slate-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400">
                        Loading live civic rankings...
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr
                        key={u.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Rank */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getRankIcon(u.rank)}
                            <span className="font-mono text-slate-500 dark:text-slate-400 font-bold">#{u.rank}</span>
                          </div>
                        </td>

                        {/* Name & Avatar */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {getInitials(u.name)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</div>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                <span>{u.city}</span>
                                <span>•</span>
                                <span className="font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 text-[10px]">
                                  {u.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Deliveries */}
                        <td className="py-4 px-5 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                          {u.deliveries}
                        </td>

                        {/* Kg Rescued */}
                        <td className="py-4 px-5 text-right font-mono font-bold text-slate-900 dark:text-white">
                          {u.kgRescued.toLocaleString()} kg
                        </td>

                        {/* Karma Points with Badge */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-mono shadow-sm ${
                            u.karmaPoints >= 15000
                              ? "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-700"
                              : u.karmaPoints >= 5000
                              ? "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                              : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                          }`}>
                            {u.karmaPoints >= 15000 ? (
                              <Crown className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                            ) : (
                              <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            )}
                            <span>{u.karmaPoints.toLocaleString()}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: REWARDS & MILESTONES matching screenshot 11 */}
        {activeTab === "rewards" && (
          <div className="space-y-6">
            {/* Featured Milestone Card */}
            <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 p-8 sm:p-10 text-slate-950 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-amber-400/60 px-3 py-1 rounded-full mb-3">
                  ★ FEATURED MILESTONE REWARD • 5,000 KARMA POINTS
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Gold Champion Civic Milestone
                </h2>
                <p className="mt-2 text-slate-900 text-xs sm:text-sm font-medium leading-relaxed">
                  Earn 5,000 Karma Points through dedicated food rescue and delivery to unlock our primary civic reward package:
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-amber-400/50 border border-amber-600/30">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-slate-800">REWARD GRANT</span>
                    <div className="font-black text-sm text-slate-950 mt-0.5">₹1,000 Sustainability Gift Voucher</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-400/50 border border-amber-600/30">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-slate-800">CIVIC RECOGNITION</span>
                    <div className="font-black text-sm text-slate-950 mt-0.5">Official Certificate of Civic Honor</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-3xl text-center text-white min-w-[200px] border border-amber-300/30 shadow-xl flex-shrink-0">
                <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-amber-400 font-mono">5,000 PTS</div>
                <div className="text-[11px] text-slate-400 mt-1">Automatically awarded</div>
                <Link
                  href="/donate"
                  className="mt-4 block w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Start Rescuing Food →
                </Link>
              </div>
            </div>

            {/* Level Cards matching screenshot 11 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: "m1",
                  title: "Bronze Eco Rescuer",
                  level: "Level 1",
                  points: 500,
                  icon: Sprout,
                  reward: "Official Digital Rescue Certificate & App Badge",
                  perks: [
                    "Verified Rescuer Profile Badge",
                    "Official Punarva Digital Certificate",
                  ],
                },
                {
                  id: "m2",
                  title: "Silver Guardian",
                  level: "Level 2",
                  points: 1000,
                  icon: Shield,
                  reward: "₹200 Restaurant Partner Food Voucher + Silver Lapel Pin",
                  perks: [
                    "₹200 Discount Voucher at partner food kitchens",
                    "Official Silver Lapel Pin mailed to address",
                  ],
                },
                {
                  id: "m3",
                  title: "Vanguard Courier",
                  level: "Level 3",
                  points: 2500,
                  icon: Zap,
                  reward: "Thermal Insulated Carrier Bag + Swag Kit",
                  perks: [
                    "Official Punarva food-grade thermal carrier backpack",
                    "Hi-visibility reflective safety jacket",
                  ],
                },
                {
                  id: "m4",
                  title: "Gold Champion",
                  level: "Level 4",
                  points: 5000,
                  icon: Award,
                  reward: "₹1,000 Partner Voucher + Gold Civic Medal",
                  perks: [
                    "₹1,000 Grocery/sustainable dining credit",
                    "Municipal Smart City commendation letter",
                  ],
                },
                {
                  id: "m5",
                  title: "Hero Ambassador",
                  level: "Level 5",
                  points: 10000,
                  icon: Trophy,
                  reward: "Indore Municipal Commendation & Civic Honor",
                  perks: [
                    "Keynote speaker invitation at Annual Zero Waste Summit",
                    "VIP zero-waste ambassador status",
                  ],
                },
                {
                  id: "m6",
                  title: "Punarva Legend",
                  level: "Level 6",
                  points: 15000,
                  icon: Crown,
                  reward: "Hall of Fame Honor & Lifetime SDG Fellowship",
                  perks: [
                    "Permanent induction on National Food Rescue Hall of Fame",
                    "Honorary Zero Waste Fellowship grant",
                  ],
                },
              ].map((m) => {
                const IconComp = m.icon;
                const isClaimed = claimedRewards[m.id];
                return (
                  <div
                    key={m.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between space-y-4 glass-card-hover"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base">{m.title}</h3>
                            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                              {m.points.toLocaleString()} Points Needed
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                          {m.level}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/30 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Milestone Reward:
                        </span>
                        <div className="font-bold text-amber-800 dark:text-amber-300 mt-0.5">{m.reward}</div>
                      </div>

                      <ul className="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {m.perks.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-emerald-900/30">
                      <button
                        onClick={() => handleClaim(m.id)}
                        disabled={isClaimed}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isClaimed
                            ? "bg-slate-100 dark:bg-emerald-950 text-slate-500 dark:text-emerald-400 border border-slate-300 dark:border-emerald-800"
                            : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md"
                        }`}
                      >
                        {isClaimed ? "✓ Reward Claimed" : `Claim Reward (${m.points} pts)`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: POINT CRITERIA */}
        {activeTab === "criteria" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">How Are Karma Points Calculated?</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Karma points are cryptographically awarded upon successful PIN-verified drop delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/30 space-y-2">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">🍲 Food Donor Rewards</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • <strong>+10 points per kg</strong> of wholesome surplus food donated.<br />
                  • <strong>+50 points bonus</strong> for fast thermal packaging and ready-to-go chafer pans.<br />
                  • Section 80G tax certificate generated with zero paperwork.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/30 space-y-2">
                <span className="text-sm font-bold text-amber-700 dark:text-amber-400">🚚 Volunteer Courier Rewards</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • <strong>+15 points per kg</strong> delivered using thermal cold-chain bags.<br />
                  • <strong>+50 emergency bonus</strong> for accepting listings expiring within 2 hours.<br />
                  • <strong>+30 on-time delivery bonus</strong> for meeting the pickup window.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/30 space-y-2">
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400">♻️ Circular Waste Sorter</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • <strong>+5 points per kg</strong> of sorted recyclable waste delivered to MRF.<br />
                  • <strong>+25 points bonus</strong> for verified e-waste or battery drops.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-emerald-900/30 space-y-2">
                <span className="text-sm font-bold text-purple-700 dark:text-purple-400">🏠 NGO Community Impact</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  • <strong>+20 points</strong> for instantaneous PIN drop confirmations.<br />
                  • Civic impact badge and donor gratitude rating.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

