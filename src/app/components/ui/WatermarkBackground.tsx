import React, { forwardRef } from "react";

export const WatermarkSection = forwardRef<HTMLElement, { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}>(({ children, className = "", id }, ref) => {
  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: "url('/assets/logo.png'), url('/assets/logo.png')",
          backgroundRepeat: "repeat, repeat",
          backgroundSize: "260px 260px, 260px 260px",
          backgroundPosition: "0 0, 130px 130px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
});

WatermarkSection.displayName = "WatermarkSection";
