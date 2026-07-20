import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/testimonials";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Impact Stories</span>
            <div className="h-px w-10 bg-[#EAD196]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
            Lives Transformed
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-10 shadow-lg border border-[#4E6132]/5 relative"
          >
            <Quote size={48} className="text-[#EAD196]/30 absolute top-6 left-8" />
            <p className="text-[#1A1A1A] text-xl leading-relaxed mb-8 relative z-10 italic">
              &ldquo;{TESTIMONIALS[active].quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={TESTIMONIALS[active].avatar}
                alt={TESTIMONIALS[active].author}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#EAD196]/30"
              />
              <div className="text-left">
                <div className="font-['Outfit'] font-bold text-[#4E6132] text-sm">{TESTIMONIALS[active].author}</div>
                <div className="text-[#4A4A4A]/70 text-xs">{TESTIMONIALS[active].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-2 bg-[#EAD196]" : "w-2 h-2 bg-[#4E6132]/20 hover:bg-[#4E6132]/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
