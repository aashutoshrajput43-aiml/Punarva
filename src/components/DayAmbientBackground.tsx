"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  glowColor: string;
  type: "circle" | "leaf" | "sparkle";
}

export function DayAmbientBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-compute 28 lightweight particles with well-distributed positions
  const particles: Particle[] = useMemo(() => {
    const items: Particle[] = [];
    const colorSets = [
      { color: "#059669", glow: "rgba(5, 150, 105, 0.45)" }, // vibrant emerald
      { color: "#0284c7", glow: "rgba(2, 132, 199, 0.45)" }, // clean sky blue
      { color: "#10b981", glow: "rgba(16, 185, 129, 0.40)" }, // fresh leaf green
      { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.40)" }, // warm solar golden
    ];

    for (let i = 0; i < 28; i++) {
      const set = colorSets[i % colorSets.length];
      const isLeaf = i % 5 === 0;
      const isSparkle = i % 7 === 0 && !isLeaf;

      items.push({
        id: i,
        left: Math.round((i * 3.57 + ((i * 7) % 11)) % 96 + 2), // 2% to 98%
        size: isLeaf ? 15 : isSparkle ? 10 : (i % 3 === 0 ? 8 : 6),
        delay: Math.round(((i * 1.3) % 18) * 10) / 10,
        duration: 16 + (i % 6) * 3, // 16s to 31s
        color: set.color,
        glowColor: set.glow,
        type: isLeaf ? "leaf" : isSparkle ? "sparkle" : "circle",
      });
    }
    return items;
  }, []);

  // Only active in Day Mode (theme === "light")
  if (!mounted || theme === "dark") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden dark:hidden select-none"
    >
      {/* 1. Base Crisp Architectural Grid Pattern (Visible, high-definition dot matrix) */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle, #059669 1.1px, transparent 1.1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* 2. Soft Dynamic Ambient Light Orbs (GPU-accelerated, clearly visible breathing gradients) */}
      {/* Top Left: Fresh Spring Emerald & Teal Glow */}
      <div className="absolute -top-24 -left-24 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-emerald-300/40 via-teal-200/30 to-transparent blur-[100px] animate-day-orb1 will-change-transform pointer-events-none" />

      {/* Top Right: Cool Pure Cyan & Sky Blue Aura */}
      <div className="absolute top-8 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-sky-300/40 via-cyan-200/30 to-transparent blur-[110px] animate-day-orb2 will-change-transform pointer-events-none" />

      {/* Middle Left: Morning Sunbeam Warm Gold Aura */}
      <div className="absolute top-[38%] -left-16 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-200/40 via-emerald-100/30 to-transparent blur-[120px] animate-day-orb3 will-change-transform pointer-events-none" />

      {/* Bottom Right: Mint & Leaf Flourish Aura */}
      <div className="absolute -bottom-20 right-10 w-[580px] h-[580px] rounded-full bg-gradient-to-tl from-emerald-200/40 via-teal-100/25 to-transparent blur-[110px] animate-day-orb1 will-change-transform pointer-events-none" />

      {/* 3. Floating Eco-Particles, Dew Drops & Leaves */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform pointer-events-none"
          style={{
            left: `${p.left}%`,
            bottom: "-35px",
            animation: `dayParticleFloat ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          {p.type === "leaf" ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke={p.color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 animate-day-leaf-sway drop-shadow-xs"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          ) : p.type === "sparkle" ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="opacity-80 drop-shadow-xs animate-pulse"
            >
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
            </svg>
          ) : (
            <div
              className="rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.glowColor}`,
                opacity: 0.85,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default DayAmbientBackground;
