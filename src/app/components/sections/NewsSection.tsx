import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getNews } from "../../data/news";
import { useCmsNews } from "../../data/sanityNews";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { WatermarkSection } from "../ui/WatermarkBackground";
import { useTranslation } from "react-i18next";

const AUTOPLAY_SPEED = 5000;
const TRANSITION_SPEED = 500;

function computeItemsPerView(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function usesRealHover(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function NewsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const news = useCmsNews() ?? getNews(t);

  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window === "undefined" ? 1 : computeItemsPerView(window.innerWidth),
  );
  useEffect(() => {
    const update = () => setItemsPerView(computeItemsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = news.length;
  const canSlide = count > itemsPerView;
  const track = canSlide ? [...news, ...news.slice(0, itemsPerView)] : news;
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
    <WatermarkSection id="news" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{t("news.ourStories")}</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132] leading-tight">
              {t("news.title")}
            </h2>
            <p className="text-[#4A4A4A] mt-3 max-w-xl text-base">
              {t("news.desc")}
            </p>
          </motion.div>
        </div>

        <div
          className="relative w-full"
          onMouseEnter={() => hoverCapable.current && setHovered(true)}
          onMouseLeave={() => hoverCapable.current && setHovered(false)}
        >
          <div className="overflow-hidden -mx-3.5 px-3.5 py-4">
            <div
              className="flex"
              onTransitionEnd={handleTransitionEnd}
              style={{
                width: `${(trackLength * 100) / itemsPerView}%`,
                transform: `translateX(-${(index * 100) / trackLength}%)`,
                transition: animated ? `transform ${TRANSITION_SPEED}ms ease` : "none",
              }}
            >
              {track.map((article, i) => (
                <div
                  key={`${article.title}-${i}`}
                  className="px-3.5"
                  style={{ width: `${100 / trackLength}%` }}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (i % itemsPerView) * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl overflow-hidden border border-[#4E6132]/10 shadow-sm flex flex-col h-full"
                  >
                    <Link to={`/newsroom/${article.slug}`} className="block aspect-[16/10] overflow-hidden bg-[#EDF1F7] relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs font-semibold text-[#8B6543] mb-3">
                        {article.date}
                      </div>
                      <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] leading-snug mb-3 hover:text-[#8B6543] transition-colors line-clamp-2 min-h-[56px]">
                        <Link to={`/newsroom/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
                      <Link
                        to={`/newsroom/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E6132] hover:text-[#8B6543] transition-colors mt-auto"
                      >
                        {t("news.readArticle")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>

          {canSlide && (
            <div className="relative h-8 mt-10">
              {/* Dot ("boules") pagination */}
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                {news.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
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

        <div className="mt-12 text-center">
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 bg-[#BC8A5F] text-white text-base font-bold px-8 py-3.5 rounded-xl hover:bg-[#4E6132] transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            {t("news.viewAllBtn")} <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </WatermarkSection>
  );
}
