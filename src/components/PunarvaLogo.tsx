import React from "react";

interface PunarvaLogoProps {
  className?: string;
  size?: number;
}

export default function PunarvaLogo({ className = "", size = 36 }: PunarvaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Green Circular Arrow */}
      <path
        d="M 23 60 A 37 37 0 0 1 74 25"
        stroke="#22c55e"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Top Arrowhead */}
      <path
        d="M 68 12 L 87 27 L 72 40 Z"
        fill="#22c55e"
      />

      {/* Bottom Blue Circular Arrow */}
      <path
        d="M 77 40 A 37 37 0 0 1 26 75"
        stroke="#2563eb"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Bottom Arrowhead */}
      <path
        d="M 32 88 L 13 73 L 28 60 Z"
        fill="#2563eb"
      />

      {/* Center Green Leaf */}
      <path
        d="M 50 25 C 68 36 68 64 50 75 C 32 64 32 36 50 25 Z"
        fill="#16a34a"
      />

      {/* Leaf White Stem and Veins */}
      <line
        x1="50"
        y1="31"
        x2="50"
        y2="69"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Vein Pair 1 */}
      <line
        x1="50"
        y1="40"
        x2="42"
        y2="34"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="40"
        x2="58"
        y2="34"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Vein Pair 2 */}
      <line
        x1="50"
        y1="50"
        x2="40"
        y2="44"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="60"
        y2="44"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Vein Pair 3 */}
      <line
        x1="50"
        y1="60"
        x2="43"
        y2="55"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="60"
        x2="57"
        y2="55"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
