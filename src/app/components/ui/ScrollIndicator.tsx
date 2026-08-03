import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();

  const handleScroll = () => {
    // Scroll down by 1 viewport height, subtracting a bit for any sticky header if needed.
    // window.innerHeight works perfectly for smooth cascade.
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-6 right-6 lg:right-12 flex items-center gap-4 text-white hover:text-white transition-colors z-10 cursor-pointer"
      aria-label="Scroll to content"
    >
      <div className="flex flex-col -space-y-5">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={shouldReduceMotion ? { opacity: 0.6 } : { y: [-8, 8], opacity: [0, 1, 0] }}
            transition={
              shouldReduceMotion
                ? {}
                : {
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }
            }
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            <ChevronDown size={32} />
          </motion.div>
        ))}
      </div>
      <span className="text-sm font-semibold tracking-[0.25em] uppercase [writing-mode:vertical-lr] drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
        Scroll
      </span>
    </button>
  );
}
