import { Link } from "react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowRight, Filter, ChevronDown, Check, Newspaper, Megaphone, Users } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { useCmsNews } from "../data/sanityNews";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  t,
}: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  t: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCategoryLabel = (cat: string) => {
    if (cat === "All") return t("newsroom.allCategories", "All Categories");
    return cat;
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-3 bg-[#BC8A5F] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:bg-[#4E6132] active:scale-95 transition-all duration-200 cursor-pointer min-w-[170px]"
      >
        <span>{getCategoryLabel(selectedCategory)}</span>
        <ChevronDown
          size={16}
          className={`text-[#EAD196] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#4E6132]/15 py-1.5 z-50 overflow-hidden"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors duration-150 ${
                    isSelected
                      ? "bg-[#4E6132] text-white font-bold"
                      : "text-[#4E6132] hover:bg-[#8B6543]/15 hover:text-[#8B6543]"
                  }`}
                >
                  <span>{getCategoryLabel(cat)}</span>
                  {isSelected && <Check size={14} className="text-[#EAD196]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Newsroom() {
  const { t } = useTranslation("home");
  const { ref, visible } = useScrollReveal();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // CMS posts take over when staff publish them; the lists below are fallbacks.
  const cmsNews = useCmsNews();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const newsItems: NewsItem[] = useMemo(() => {
    if (cmsNews && cmsNews.length > 0) {
      return cmsNews.map((n) => ({
        slug: n.slug,
        title: n.title,
        date: n.date,
        category: n.category,
        excerpt: n.excerpt,
        image: n.image,
      }));
    }
    const translatedItems = (t("newsroom.items", { returnObjects: true }) as NewsItem[]) || [];
    if (Array.isArray(translatedItems) && translatedItems.length > 0) {
      return translatedItems;
    }
    // Fallback default list
    return [
      {
        slug: "cpr-june-2026-highlights",
        title: "CPR June 2026 Highlights & Community Impact",
        date: "7 July 2026",
        category: "Report",
        excerpt: "In June 2026, CPR strengthened its position as a leading platform for faith-based community engagement, bringing together member churches united by a shared mission of peace, education, and development.",
        image: "/cpr/cpr/assets/news-kwibuka.jpg",
      },
      {
        slug: "annual-convention-2026",
        title: "Inside CPR's Annual Convention on Ecumenical Cooperation",
        date: "2 July 2026",
        category: "Event",
        excerpt: "Rwanda's Protestant community is building sustainable partnerships across the country. Member churches met to align strategies for education, youth leadership, and socio-economic empowerment.",
        image: "/cpr/cpr/assets/news-education.webp",
      },
      {
        slug: "may-highlights-2026",
        title: "CPR May 2026 Highlights & Youth Programs",
        date: "2 June 2026",
        category: "Youth",
        excerpt: "May 2026 was a landmark month for CPR's Youth Program, rolling out peacebuilding workshops and digital skills training for over 800 young church leaders nationwide.",
        image: "/cpr/cpr/assets/news-trauma.jpg",
      },
      {
        slug: "kwibuka-31-commemoration",
        title: "Kwibuka 31 Memorial Commemoration at Gahini Diocese",
        date: "28 June 2025",
        category: "Event",
        excerpt: "CPR member churches joined thousands across Rwanda to remember the 1994 Genocide against the Tutsi, reaffirming their commitment to peace, reconciliation, and 'Never Again'.",
        image: "/cpr/cpr/assets/Gahini 2.webp",
      },
      {
        slug: "bnep-active-pedagogy-training",
        title: "BNEP Launches Active Pedagogy Training for 1,200 Teachers",
        date: "14 May 2025",
        category: "Education",
        excerpt: "The Bureau National de l'Éducation Protestante rolled out its flagship Participatory Active Pedagogy program in partnership with international development partners.",
        image: "/cpr/cpr/assets/Primary.jpg",
      },
      {
        slug: "trauma-counselor-certification",
        title: "Gender & Health Department Completes Trauma Counselor Certification",
        date: "3 April 2025",
        category: "Health",
        excerpt: "Forty-two community health workers across five provinces were certified as trauma counselors, strengthening CPR's mental health outreach capacity.",
        image: "/cpr/cpr/assets/Trauma 1.webp",
      },
      {
        slug: "agricultural-cooperatives-sustainability",
        title: "CPR Partners with Local Cooperatives for Agricultural Sustainability",
        date: "12 March 2025",
        category: "Development",
        excerpt: "A new initiative aiming to support rural communities with climate-smart farming techniques was launched in Eastern Province, impacting over 500 families.",
        image: "/cpr/cpr/assets/CPR 3 - Copy.webp",
      },
      {
        slug: "youth-reconciliation-summit",
        title: "Annual Youth Peace and Reconciliation Summit Announced",
        date: "18 February 2025",
        category: "Youth",
        excerpt: "Youth leaders from various Protestant parishes across the country will gather in Kigali to discuss peacemaking, leadership, and digital evangelism.",
        image: "/cpr/cpr/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp",
      },
    ];
  }, [cmsNews, t]);

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(newsItems.map((item) => item.category)));
    return ["All", ...cats];
  }, [newsItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return newsItems;
    return newsItems.filter((item) => item.category === selectedCategory);
  }, [newsItems, selectedCategory]);

  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE) || 1;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "rgba(255, 255, 255, 0.88)", minHeight: "100vh" }}>
      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 lg:pb-20 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,42,16,0.40), rgba(28,42,16,0.92)), url('/cpr/cpr/assets/youth.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            y: heroBgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A10] via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-7xl w-full mx-auto"
          style={{ opacity: heroOpacity, y: heroContentY }}
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-5"
          >
            <Link to="/" className="hover:text-[#EAD196] transition-colors">{t("newsroom.breadcrumbHome")}</Link>
            <span className="text-white/30">/</span>
            <span className="text-[#EAD196] font-semibold">{t("newsroom.breadcrumbNews")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-[#EAD196]/40 rounded-full px-4 py-2 mb-6"
          >
            <Newspaper size={15} className="text-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">
              {t("newsroom.breadcrumbNews")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md mb-4"
          >
            {t("newsroom.title", "Newsroom")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-lg max-w-2xl leading-relaxed mb-8"
          >
            {t("newsroom.subtitle", "Latest news, event reports, and updates from Conseil Protestant du Rwanda.")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Megaphone, label: t("newsroom.heroChip1", "Latest Updates") },
              { icon: Users, label: t("newsroom.heroChip2", "Community Reports") },
            ].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2.5 text-sm text-white/85"
              >
                <chip.icon size={15} className="text-[#EAD196]" />
                {chip.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </div>



      {/* Content Section */}
      <WatermarkSection ref={ref} className="py-10 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Category Filter Dropdown */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-5 border-b border-[#4E6132]/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#4E6132]">
                <Filter size={16} className="text-[#8B6543]" />
                <span>{t("newsroom.filterLabel", "Filter by Category:")}</span>
              </div>
              
              <CategoryDropdown
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                t={t}
              />
            </div>

            <div className="text-xs font-semibold text-[#8B6543]">
              {filteredItems.length} {filteredItems.length === 1 ? t("newsroom.article", "Article") : t("newsroom.articles", "Articles")}
            </div>
          </div>

          {/* News Grid - Slimmer card widths matching cooperation.rw reference */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {paginatedItems.map((item) => (
              <article
                key={item.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#4E6132]/10 flex flex-col h-full max-w-[360px] mx-auto w-full"
              >
                <Link to={`/newsroom/${item.slug}`} className="block aspect-[16/10] overflow-hidden bg-[#EDF1F7] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/cpr/cpr/assets/CPR 3 - Copy.webp";
                    }}
                  />
                </Link>

                <div className="p-5 lg:p-6 flex flex-col grow">
                  <div className="text-xs font-semibold text-[#4E6132] mb-2.5">
                    {item.date}
                  </div>
                  <h2 className="font-['Outfit'] font-bold text-lg lg:text-xl text-[#4E6132] mb-3 leading-snug hover:text-[#8B6543] transition-colors line-clamp-3">
                    <Link to={`/newsroom/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 grow">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/newsroom/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4E6132] hover:text-[#8B6543] transition-colors"
                    >
                      {t("newsroom.readMore", "Read more")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state fallback */}
          {paginatedItems.length === 0 && (
            <div className="text-center py-16 bg-[#F8F9FA] rounded-2xl border border-dashed border-[#4E6132]/20">
              <p className="text-[#4A4A4A] font-semibold text-lg">
                {t("newsroom.noNewsFound", "No articles found in this category.")}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#4E6132] border border-[#4E6132]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#4E6132]/10 transition-colors"
              >
                {t("newsroom.prev", "Prev")}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#BC8A5F] text-white shadow-md scale-105"
                      : "text-[#4E6132] border border-[#4E6132]/15 hover:bg-[#4E6132]/10"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#4E6132] border border-[#4E6132]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#4E6132]/10 transition-colors"
              >
                {t("newsroom.next", "Next")}
              </button>
            </div>
          )}
        </div>
      </WatermarkSection>
    </main>
  );
}
