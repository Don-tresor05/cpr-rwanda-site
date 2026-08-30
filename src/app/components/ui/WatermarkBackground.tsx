import React, { forwardRef } from "react";

export const WatermarkSection = forwardRef<HTMLElement, {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "sparse" | "default" | "dense";
}>(({ children, className = "", id }, ref) => {
  // Check if the section has a bg-white class
  const hasBgWhite = /\bbg-white\b(?!\/)/.test(className);
  // Strip bg-white from className so it doesn't override our inline style
  const adjustedClassName = hasBgWhite
    ? className.replace(/\bbg-white\b(?!\/)/g, "").trim()
    : className;

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${adjustedClassName}`}
      // Use inline style for semi-transparent white so the FixedWatermark shows through
      style={hasBgWhite ? { backgroundColor: "rgba(255, 255, 255, 0.88)" } : undefined}
    >
      {children}
    </section>
  );
});

WatermarkSection.displayName = "WatermarkSection";
