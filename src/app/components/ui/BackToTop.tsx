import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-xl bg-[#4E6132] text-white shadow-lg hover:bg-[#3a4f26] hover:scale-110 transition-all duration-200 flex items-center justify-center cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}
