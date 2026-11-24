"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export function ParallaxStarsBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shadowsSmall, setShadowsSmall] = useState<string>("");
  const [shadowsMedium, setShadowsMedium] = useState<string>("");
  const [shadowsBig, setShadowsBig] = useState<string>("");

  useEffect(() => {
    // Generate scattered star coordinates within 2560px x 2000px field
    const generateBoxShadows = (n: number) => {
      let value = "";
      for (let i = 1; i <= n; i++) {
        const x = Math.floor(Math.random() * 2560);
        const y = Math.floor(Math.random() * 2000);
        const r = Math.random();
        // Crisp white, glowing emerald and soft blue stars
        const color =
          r > 0.88
            ? "#34d399" // emerald glow
            : r > 0.78
            ? "#93c5fd" // soft cyan/blue
            : "#ffffff"; // bright pure white
        value += (i === 1 ? "" : ", ") + `${x}px ${y}px ${color}`;
      }
      return value;
    };

    setShadowsSmall(generateBoxShadows(850));
    setShadowsMedium(generateBoxShadows(280));
    setShadowsBig(generateBoxShadows(130));
    setMounted(true);
  }, []);

  // In Day mode or prior to client mount, do not render
  if (!mounted || theme !== "dark") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block"
    >
      {/* Deep space radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#14281d_0%,_#040a06_100%)] pointer-events-none" />

      {/* Atmospheric subtle nebula glow */}
      <div className="absolute -top-40 left-1/4 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Stars Layer 1 (Small - 1.5px, 35s animation) */}
      <div
        className="absolute left-0 top-0 w-[1.5px] h-[1.5px] bg-transparent will-change-transform animate-stars-layer1 opacity-90"
        style={{
          boxShadow: shadowsSmall,
        }}
      >
        <div
          className="absolute top-[2000px] w-[1.5px] h-[1.5px] bg-transparent"
          style={{ boxShadow: shadowsSmall }}
        />
      </div>

      {/* Stars Layer 2 (Medium - 2.5px, 65s animation) */}
      <div
        className="absolute left-0 top-0 w-[2.5px] h-[2.5px] bg-transparent will-change-transform animate-stars-layer2 opacity-95"
        style={{
          boxShadow: shadowsMedium,
        }}
      >
        <div
          className="absolute top-[2000px] w-[2.5px] h-[2.5px] bg-transparent"
          style={{ boxShadow: shadowsMedium }}
        />
      </div>

      {/* Stars Layer 3 (Big - 3.5px, 100s animation with soft glow) */}
      <div
        className="absolute left-0 top-0 w-[3.5px] h-[3.5px] bg-transparent will-change-transform animate-stars-layer3 opacity-100"
        style={{
          boxShadow: shadowsBig,
        }}
      >
        <div
          className="absolute top-[2000px] w-[3.5px] h-[3.5px] bg-transparent"
          style={{ boxShadow: shadowsBig }}
        />
      </div>
    </div>
  );
}

export default ParallaxStarsBackground;
