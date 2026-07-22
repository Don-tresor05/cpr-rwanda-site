import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { getTestimonials } from "../../data/testimonials";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const testimonials = getTestimonials(t);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = testimonials.length;

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setActive(idx);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActive((a) => (a + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((a) => (a - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => next(), 6000);
    return () => clearInterval(id);
  }, [visible, next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-white">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#4E6132]/8" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-[#4E6132]/12" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-[#EAD196]/10" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-[#EAD196]/15" />
        {/* Orbital dots */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-[#EAD196]/20 animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full bg-[#4E6132]/15 animate-pulse" style={{ animationDuration: "3s", animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 w-5 h-5 rounded-full bg-[#EAD196]/10 animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#BC8A5F]" />
            <span className="text-[#BC8A5F] text-xs font-bold uppercase tracking-[0.2em]">{t("testimonials.impact")}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#BC8A5F]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
            {t("testimonials.title")}
          </h2>
          <p className="text-[#4A4A4A] text-base mt-3 max-w-lg mx-auto">
            {t("testimonials.desc")}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#4E6132]/10 shadow-lg flex items-center justify-center text-[#4E6132] hover:bg-[#4E6132] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#4E6132]/10 shadow-lg flex items-center justify-center text-[#4E6132] hover:bg-[#4E6132] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards container */}
          <div className="relative min-h-[380px] lg:min-h-[340px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid lg:grid-cols-3 gap-6"
              >
                {/* Featured card - takes 2 cols on lg */}
                <div className="lg:col-span-2 relative group">
                  <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[#4E6132]/5 h-full overflow-hidden">
                    {/* Decorative circle bg */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#4E6132]/5 to-transparent" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-[#EAD196]/8 to-transparent" />

                    <Quote size={40} className="text-[#EAD196]/25 mb-4 relative" />
                    <p className="text-[#1A1A1A] text-lg lg:text-xl leading-relaxed mb-8 relative italic">
                      &ldquo;{testimonials[active].quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 relative">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#EAD196]/40 ring-offset-2">
                          <img
                            src={testimonials[active].avatar}
                            alt={testimonials[active].author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4E6132] flex items-center justify-center">
                          <Quote size={8} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-['Outfit'] font-bold text-[#4E6132]">{testimonials[active].author}</div>
                        <div className="text-[#4A4A4A]/60 text-sm">{testimonials[active].role}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side cards */}
                <div className="hidden lg:flex flex-col gap-6">
                  {[1, 2].map((offset) => {
                    const idx = (active + offset) % total;
                    return (
                      <button
                        key={idx}
                        onClick={() => goTo(idx, offset)}
                        className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-[#4E6132]/5 text-left group hover:border-[#EAD196]/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-[#EAD196]/8 to-transparent" />
                        <div className="flex items-start gap-3 relative">
                          <img
                            src={testimonials[idx].avatar}
                            alt={testimonials[idx].author}
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-[#EAD196]/30 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-[#1A1A1A] text-sm leading-relaxed line-clamp-3 mb-3 italic">
                              &ldquo;{testimonials[idx].quote}&rdquo;
                            </p>
                            <div>
                              <div className="font-['Outfit'] font-semibold text-[#4E6132] text-xs">
                                {testimonials[idx].author}
                              </div>
                              <div className="text-[#4A4A4A]/50 text-[10px] truncate">
                                {testimonials[idx].role}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Circular navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center mt-8"
        >
          {/* Orbital navigation */}
          <div className="relative flex items-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#4E6132]/15" />
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  className="relative group flex items-center justify-center"
                >
                  <div
                    className={`rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-5 h-5 bg-[#4E6132] shadow-md shadow-[#4E6132]/30 scale-100"
                        : "w-2.5 h-2.5 bg-[#4E6132]/20 hover:bg-[#EAD196]/60 hover:scale-125"
                    }`}
                  />
                  {i === active && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#4E6132]/20" style={{ animationDuration: "2s" }} />
                  )}
                  {i === active && (
                    <div className="absolute -inset-1.5 rounded-full border border-[#4E6132]/15 animate-spin" style={{ animationDuration: "8s, linear" }} />
                  )}
                </button>
              ))}
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#4E6132]/15" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
