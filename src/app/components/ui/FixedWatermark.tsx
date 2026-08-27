import React from "react";

const WATERMARK_SETS: Record<string, { top: string; left: string; size: number; rotate: number; opacity: number }[]> = {
  sparse: [
    { top: "8%",  left: "10%", size: 90,  rotate: 0, opacity: 0.1 },
    { top: "28%", left: "72%", size: 130, rotate: 0, opacity: 0.08 },
    { top: "62%", left: "22%", size: 70,  rotate: 0, opacity: 0.1 },
    { top: "80%", left: "68%", size: 110, rotate: 0, opacity: 0.08 },
  ],
  default: [
    { top: "4%",  left: "6%",  size: 90,  rotate: 0, opacity: 0.1 },
    { top: "10%", left: "78%", size: 150, rotate: 0, opacity: 0.08 },
    { top: "32%", left: "38%", size: 60,  rotate: 0, opacity: 0.12 },
    { top: "48%", left: "12%", size: 130, rotate: 0, opacity: 0.08 },
    { top: "58%", left: "68%", size: 80,  rotate: 0, opacity: 0.1 },
    { top: "75%", left: "28%", size: 170, rotate: 0, opacity: 0.06 },
    { top: "82%", left: "85%", size: 70,  rotate: 0, opacity: 0.1 },
    { top: "20%", left: "55%", size: 45,  rotate: 0, opacity: 0.12 },
  ],
  dense: [
    { top: "3%",  left: "5%",  size: 80,  rotate: 0, opacity: 0.1 },
    { top: "8%",  left: "45%", size: 55,  rotate: 0, opacity: 0.12 },
    { top: "12%", left: "80%", size: 140, rotate: 0, opacity: 0.08 },
    { top: "26%", left: "20%", size: 100, rotate: 0, opacity: 0.1 },
    { top: "30%", left: "62%", size: 65,  rotate: 0, opacity: 0.12 },
    { top: "42%", left: "90%", size: 90,  rotate: 0, opacity: 0.08 },
    { top: "48%", left: "8%",  size: 120, rotate: 0, opacity: 0.08 },
    { top: "55%", left: "40%", size: 50,  rotate: 0, opacity: 0.14 },
    { top: "62%", left: "70%", size: 150, rotate: 0, opacity: 0.06 },
    { top: "72%", left: "15%", size: 75,  rotate: 0, opacity: 0.1 },
    { top: "78%", left: "55%", size: 95,  rotate: 0, opacity: 0.1 },
    { top: "88%", left: "85%", size: 60,  rotate: 0, opacity: 0.12 },
  ],
};

export function FixedWatermark({ variant = "default" }: { variant?: "sparse" | "default" | "dense" }) {
  const marks = WATERMARK_SETS[variant] ?? WATERMARK_SETS.default;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {marks.map((w, i) => (
        <img
          key={i}
          src="/cpr/assets/logo.png"
          alt=""
          style={{
            position: "absolute",
            top: w.top,
            left: w.left,
            width: `${w.size}px`,
            height: `${w.size}px`,
            transform: `rotate(${w.rotate}deg)`,
            opacity: w.opacity,
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
}
