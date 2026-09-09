import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getNews } from "../../data/news";
import { useCmsNews } from "../../data/sanityNews";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { WatermarkSection } from "../ui/WatermarkBackground";
import { useTranslation } from "react-i18next";

export function NewsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  // CMS posts take over when staff publish them; hardcoded news is the fallback.
  const news = useCmsNews() ?? getNews(t);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, news.length - visibleCount);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

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

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Previous articles"
              className="w-12 h-12 rounded-full border border-[#4E6132]/20 flex items-center justify-center text-[#4E6132] hover:bg-[#4E6132] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#4E6132] transition-all duration-300 shadow-sm"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              aria-label="Next articles"
              className="w-12 h-12 rounded-full border border-[#4E6132]/20 flex items-center justify-center text-[#4E6132] hover:bg-[#4E6132] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#4E6132] transition-all duration-300 shadow-sm"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-7"
            style={{
              transform: currentIndex === 0 ? "none" : `translateX(calc(-${currentIndex} * (100% + 28px) / ${visibleCount}))`,
            }}
          >
            {news.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#4E6132]/10 shadow-sm flex flex-col flex-shrink-0"
                style={{ width: `calc((100% - ${(visibleCount - 1) * 28}px) / ${visibleCount})` }}
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
            ))}
          </div>
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
