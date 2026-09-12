import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { getTestimonials } from "../../data/testimonials";
import { useTestimonials } from "../../data/cmsContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { WatermarkSection } from "../ui/WatermarkBackground";

const AUTOPLAY_SPEED = 5000;
const TRANSITION_SPEED = 500;

function computeItemsPerView(width: number): number {
  if (width >= 1024) return 2;
  return 1;
}

function usesRealHover(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const testimonials = useTestimonials() ?? getTestimonials(t);

  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window === "undefined" ? 1 : computeItemsPerView(window.innerWidth),
  );
  useEffect(() => {
    const update = () => setItemsPerView(computeItemsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = testimonials.length;
  const canSlide = count > itemsPerView;
  const track = canSlide ? [...testimonials, ...testimonials.slice(0, itemsPerView)] : testimonials;
  const trackLength = track.length;

  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const hoverCapable = useRef(usesRealHover());

  useEffect(() => {
    setIndex(0);
    setAnimated(false);
  }, [itemsPerView, count]);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  useEffect(() => {
    if (!playing || hovered || !canSlide || !visible) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTOPLAY_SPEED);
    return () => window.clearInterval(id);
  }, [playing, hovered, canSlide, visible]);

  const handleTransitionEnd = useCallback(() => {
    if (index >= count) {
      setAnimated(false);
      setIndex(0);
    }
  }, [index, count]);

  const goTo = useCallback((i: number) => {
    setAnimated(true);
    setIndex(i);
  }, []);

  if (count === 0) return null;
  const activeDot = ((index % count) + count) % count;

  return (
    <WatermarkSection ref={ref} className="py-16 bg-white border-t border-[#4E6132]/5">
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-[0.2em]">{t("testimonials.impact")}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
            {t("testimonials.title")}
          </h2>
          <p className="text-[#4A4A4A] text-base mt-3 max-w-lg mx-auto">
            {t("testimonials.desc")}
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative w-full"
          onMouseEnter={() => hoverCapable.current && setHovered(true)}
          onMouseLeave={() => hoverCapable.current && setHovered(false)}
        >
          <div className="overflow-hidden -mx-4 px-4 py-4">
            <div
              className="flex"
              onTransitionEnd={handleTransitionEnd}
              style={{
                width: `${(trackLength * 100) / itemsPerView}%`,
                transform: `translateX(-${(index * 100) / trackLength}%)`,
                transition: animated ? `transform ${TRANSITION_SPEED}ms ease` : "none",
              }}
            >
              {track.map((item, i) => (
                <div
                  key={`${item.author}-${i}`}
                  className="px-4"
                  style={{ width: `${100 / trackLength}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (i % itemsPerView) * 0.1, duration: 0.5 }}
                    className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[#4E6132]/5 h-full overflow-hidden flex flex-col"
                  >
                    {/* Decorative circle bg */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#4E6132]/5 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-[#EAD196]/8 to-transparent pointer-events-none" />

                    <Quote size={40} className="text-[#8B6543]/25 mb-4 relative flex-shrink-0" />
                    <p className="text-[#1A1A1A] text-lg lg:text-xl leading-relaxed mb-8 relative italic flex-grow">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 relative mt-auto">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#EAD196]/40 ring-offset-2">
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4E6132] flex items-center justify-center">
                          <Quote size={8} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-['Outfit'] font-bold text-[#4E6132]">{item.author}</div>
                        <div className="text-[#4A4A4A]/60 text-sm">{item.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {canSlide && (
            <div className="relative h-8 mt-10">
              {/* Dot ("boules") pagination */}
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === activeDot}
                    onClick={() => goTo(i)}
                    className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      i === activeDot
                        ? "bg-[#4E6132] border-[#4E6132] scale-125"
                        : "bg-transparent border-[#4E6132]/40 hover:border-[#4E6132]"
                    }`}
                  />
                ))}
              </div>

              {/* Play / stop toggle */}
              <button
                type="button"
                aria-pressed={playing}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                onClick={() => setPlaying((p) => !p)}
                className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#4E6132] text-white shadow-md transition-colors duration-200 hover:bg-[#3d4d28]"
              >
                {playing ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="0.5" y="0" width="3" height="10" fill="currentColor" />
                    <rect x="6.5" y="0" width="3" height="10" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0 0L10 5L0 10V0Z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </WatermarkSection>
  );
}
