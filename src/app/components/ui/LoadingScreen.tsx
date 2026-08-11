import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

const WORDMARK = "CPR RWANDA".split("");

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation("common");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const onDoneRef = useRef(onDone);

  // Keep the latest onDone without re-triggering the animation effect
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Lock body scroll while the loader is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Animate progress 0 -> 100, then fade out
  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    let raf: number;
    let revealTimer: number | undefined;
    let doneTimer: number | undefined;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // easeInOutCubic
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small pause at 100% before revealing
        revealTimer = window.setTimeout(() => setVisible(false), 350);
        doneTimer = window.setTimeout(() => onDoneRef.current(), 1500);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (revealTimer) window.clearTimeout(revealTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 20%, #4E6132 0%, #3a4f26 45%, #24341a 100%)",
          }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Ambient glow orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#EAD196]/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#BC8A5F]/10 blur-3xl" />

          {/* Subtle geometric pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="loader-diamonds"
                width="72"
                height="72"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="72" height="72" fill="none" />
                <path
                  d="M36 0 L72 36 L36 72 L0 36 Z"
                  fill="none"
                  stroke="#F5F5DC"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#loader-diamonds)" />
          </svg>

          {/* Content */}
          <div className="relative flex flex-col items-center px-6 text-center">
            {/* Logo medallion with rotating rings */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-10">
              {/* Pulsing halo */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-[#EAD196]/25"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Rotating dashed ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-[#EAD196]/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              {/* Sparkle accent */}
              <motion.div
                className="absolute -top-3 -right-2 w-6 h-6 sm:w-7 sm:h-7"
                animate={{ rotate: [0, 40, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" fill="#EAD196" aria-hidden="true">
                  <path d="M12 0c.9 6.5 5.5 11.1 12 12-6.5.9-11.1 5.5-12 12-.9-6.5-5.5-11.1-12-12C6.5 11.1 11.1 6.5 12 0z" />
                </svg>
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full rounded-full bg-[#F5F5DC] shadow-2xl shadow-black/40 flex items-center justify-center overflow-hidden border-4 border-[#EAD196]/70"
              >
                <img
                  src="/assets/logo-1.jpg"
                  alt="CPR Rwanda — Conseil Protestant du Rwanda"
                  className="w-[88%] h-[88%] object-contain"
                />
              </motion.div>
            </div>

            {/* Wordmark reveal */}
            <h1 className="flex items-center gap-[0.08em] font-['Outfit'] font-black text-[#F5F5DC] text-3xl sm:text-5xl tracking-[0.12em] mb-3 overflow-hidden">
              {WORDMARK.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.35 + i * 0.055,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={char === " " ? "w-[0.45em]" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="text-[#EAD196] text-[10px] sm:text-xs font-semibold uppercase mb-10"
            >
              Conseil Protestant du Rwanda
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-64 sm:w-80"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[#F5F5DC]/60 text-[10px] uppercase tracking-[0.25em] font-medium">
                  {t("loading.preparing")}
                </span>
                <span
                  role="status"
                  aria-live="polite"
                  className="text-[#EAD196] font-['Outfit'] font-bold text-sm tabular-nums"
                >
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#EAD196] to-[#BC8A5F]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Bouncing dots */}
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#EAD196]"
                    animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom-left tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-['Alex_Brush'] text-2xl text-[#F5F5DC]/70 whitespace-nowrap"
          >
            {t("loading.tagline")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
