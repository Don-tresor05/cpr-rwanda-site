import React, { forwardRef } from "react";

const WATERMARK_SETS: Record<string, { top: string; left: string; size: number; rotate: number; opacity: number }[]> = {
  sparse: [
    { top: "8%",  left: "10%", size: 90,  rotate: -10, opacity: 0.05 },
    { top: "28%", left: "72%", size: 130, rotate: 16,  opacity: 0.04 },
    { top: "62%", left: "22%", size: 70,  rotate: -20, opacity: 0.05 },
    { top: "80%", left: "68%", size: 110, rotate: 10,  opacity: 0.04 },
  ],
  default: [
    { top: "4%",  left: "6%",  size: 90,  rotate: -10, opacity: 0.05 },
    { top: "10%", left: "78%", size: 150, rotate: 14,  opacity: 0.04 },
    { top: "32%", left: "38%", size: 60,  rotate: 6,   opacity: 0.06 },
    { top: "48%", left: "12%", size: 130, rotate: -18, opacity: 0.04 },
    { top: "58%", left: "68%", size: 80,  rotate: 22,  opacity: 0.05 },
    { top: "75%", left: "28%", size: 170, rotate: -6,  opacity: 0.03 },
    { top: "82%", left: "85%", size: 70,  rotate: 12,  opacity: 0.05 },
    { top: "20%", left: "55%", size: 45,  rotate: -25, opacity: 0.06 },
  ],
  dense: [
    { top: "3%",  left: "5%",  size: 80,  rotate: -8,  opacity: 0.05 },
    { top: "8%",  left: "45%", size: 55,  rotate: 18,  opacity: 0.06 },
    { top: "12%", left: "80%", size: 140, rotate: 10,  opacity: 0.04 },
    { top: "26%", left: "20%", size: 100, rotate: -15, opacity: 0.05 },
    { top: "30%", left: "62%", size: 65,  rotate: 24,  opacity: 0.06 },
    { top: "42%", left: "90%", size: 90,  rotate: -5,  opacity: 0.04 },
    { top: "48%", left: "8%",  size: 120, rotate: 12,  opacity: 0.04 },
    { top: "55%", left: "40%", size: 50,  rotate: -22, opacity: 0.07 },
    { top: "62%", left: "70%", size: 150, rotate: 8,   opacity: 0.03 },
    { top: "72%", left: "15%", size: 75,  rotate: -12, opacity: 0.05 },
    { top: "78%", left: "55%", size: 95,  rotate: 20,  opacity: 0.05 },
    { top: "88%", left: "85%", size: 60,  rotate: -18, opacity: 0.06 },
  ],
};

export const WatermarkSection = forwardRef<HTMLElement, {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "sparse" | "default" | "dense";
}>(({ children, className = "", id, variant = "default" }, ref) => {
  const marks = WATERMARK_SETS[variant] ?? WATERMARK_SETS.default;

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        {marks.map((w, i) => (
          <img
            key={i}
            src="/assets/logo.png"
            alt=""
            aria-hidden="true"
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
      <div className="relative z-10">{children}</div>
    </section>
  );
});

WatermarkSection.displayName = "WatermarkSection";
