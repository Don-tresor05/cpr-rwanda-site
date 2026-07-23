import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getNews } from "../../data/news";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function NewsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const news = getNews(t);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, news.length - visibleCount)));
  };

  useEffect(() => {
    const maxIdx = Math.max(0, news.length - visibleCount);
    if (currentIndex > maxIdx) {
      setCurrentIndex(maxIdx);
    }
  }, [visibleCount, currentIndex]);

  return (
    <section id="news" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-['Outfit'] font-black text-xl lg:text-2xl text-[#4E6132]">{t("news.title")}</h2>
          </motion.div>
          
          {/* Slider controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-xl text-[#4E6132] hover:bg-[#4E6132]/5 transition-all ${
                currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer active:scale-95"
              }`}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= news.length - visibleCount}
              className={`p-2 rounded-xl text-[#4E6132] hover:bg-[#4E6132]/5 transition-all ${
                currentIndex >= news.length - visibleCount ? "opacity-30 cursor-not-allowed" : "cursor-pointer active:scale-95"
              }`}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Carousel wrapper */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-7 transition-transform duration-500 ease-in-out pb-4"
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
                className="group bg-white rounded-2xl overflow-hidden border border-[#4E6132]/8 hover:shadow-xl transition-all duration-400 cursor-pointer w-full md:w-[calc(50%-14px)] lg:w-[calc(33.333%-18.66px)] flex-shrink-0"
              >
                <div className="overflow-hidden h-52 bg-[#EDF1F7]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="category-badge text-xs uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#4A4A4A] font-medium">{article.date}</span>
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-base leading-snug mb-2 group-hover:text-[#8B6543] transition-colors line-clamp-2 min-h-[44px]">
                    {article.title}
                  </h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <a
                    href="https://cpr-rwanda.rw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B6543] hover:text-[#784B24] group-hover:text-[#784B24] transition-colors"
                  >
                    {t("news.readArticle")} <ArrowRight size={12} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://cpr-rwanda.rw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#4E6132] text-white text-base font-bold px-8 py-3.5 rounded-xl hover:bg-[#3a4f26] transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            {t("news.viewAllBtn")} <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
