import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  X, ChevronLeft, ChevronRight, ZoomIn, Camera, Images,
  CalendarDays, HeartHandshake, GraduationCap, Radio, LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";

interface GalleryItem {
  src: string;
  alt: string;
}

type GalleryCategory = "conferences" | "commemorations" | "youth" | "education";

interface GalleryEvent {
  category: GalleryCategory;
  title: string;
  locationDate: string;
  images: GalleryItem[];
}

const GALLERY_EVENTS: GalleryEvent[] = [
  {
    category: "conferences",
    title: "Executive Committee & Member Churches Annual Conference",
    locationDate: "Kigali, January 2026",
    images: [
      { src: "/assets/autorites.webp", alt: "CPR leadership together with national partners" },
      { src: "/assets/secretariat-meetings.webp", alt: "Plenary session on strategic Church initiatives" },
      { src: "/assets/cpr-members.webp", alt: "Delegates from Protestant member denominations" },
      { src: "/assets/handover.webp", alt: "Leadership transition and prayer of blessing" },
      { src: "/assets/secretariat-sg.webp", alt: "Office of the Secretary General delegation" },
      { src: "/assets/secretariat-events.webp", alt: "National planning symposium participants" },
      { src: "/assets/Bisanzeda.webp", alt: "Community outreach program inauguration" },
      { src: "/assets/secretariat-publications.webp", alt: "Presentation of CPR annual impact reports" },
    ],
  },
  {
    category: "commemorations",
    title: "Kwibuka Commemoration & Interfaith Remembrance Service",
    locationDate: "Kigali, April 2025",
    images: [
      { src: "/assets/Kwibuka 1 - Copy.png", alt: "Interfaith leaders united in solemn remembrance" },
      { src: "/assets/Kwibuka 3.png", alt: "Wreath laying ceremony at genocide memorial" },
      { src: "/assets/Kwibuka 4 - Copy.png", alt: "Congregants praying during commemoration service" },
      { src: "/assets/Kwibuka 7.jpg", alt: "Youth lighting candles of hope and resilience" },
      { src: "/assets/news-kwibuka.jpg", alt: "CPR Secretary General delivering words of comfort" },
      { src: "/assets/3.jpeg", alt: "Church members participating in healing dialogue" },
      { src: "/assets/1.jpeg", alt: "Community reflection and mutual support group" },
      { src: "/assets/2.jpeg", alt: "Pastoral counseling sessions after remembrance" },
    ],
  },
  {
    category: "youth",
    title: "Youth Empowerment, Peacebuilding & Mental Health Programs",
    locationDate: "Various Districts, 2025",
    images: [
      { src: "/assets/Trauma 1.webp", alt: "Community mental health seminar and workshops" },
      { src: "/assets/news-trauma.jpg", alt: "Group counseling and socio-economic support" },
      { src: "/assets/Mental 1.webp", alt: "Youth training session on psychosocial healing" },
      { src: "/assets/Mental 2.webp", alt: "Interactive peacebuilding dialogue among youth" },
      { src: "/assets/Mental 8.webp", alt: "Graduation of peer counselors in local parishes" },
      { src: "/assets/Youth2.webp", alt: "Youth festival celebrating harmony and faith" },
      { src: "/assets/youth.webp", alt: "Young volunteers joining environmental works" },
      { src: "/assets/school-visit.webp", alt: "Pastoral visit and mentoring at member schools" },
    ],
  },
  {
    category: "education",
    title: "Education, Protestant Schools & Radio Inkoramutima Ministry",
    locationDate: "Kigali & East, 2025",
    images: [
      { src: "/assets/radio-hero.webp", alt: "Radio Inkoramutima broadcast transmitter and studios" },
      { src: "/assets/radio-studio.webp", alt: "Live studio broadcast for daily devotionals" },
      { src: "/assets/education.webp", alt: "Protestant schools leadership workshop" },
      { src: "/assets/news-education.webp", alt: "Curriculum development and values education" },
      { src: "/assets/news-pedagogy.jpg", alt: "Pedagogical excellence seminar for teachers" },
      { src: "/assets/Primary.jpg", alt: "Primary school scholarship program beneficiaries" },
      { src: "/assets/Gahini 2.webp", alt: "Historical Gahini parish church architecture" },
      { src: "/assets/Gahini 3.webp", alt: "Gahini school expansion and community health program" },
    ],
  },
];

interface FlatPhoto {
  src: string;
  alt: string;
  eventIdx: number;
  imgIdx: number;
}

export function GalleryPage() {
  const { t } = useTranslation("home");
  const gp = t("galleryPage", { returnObjects: true }) as Record<string, unknown>;
  const filters = (gp?.filters as Record<string, string>) ?? {};

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Flatten all photos across events so the lightbox can travel freely
  const flatPhotos: FlatPhoto[] = useMemo(
    () =>
      GALLERY_EVENTS.flatMap((event, eventIdx) =>
        event.images.map((img, imgIdx) => ({ ...img, eventIdx, imgIdx }))
      ),
    []
  );

  const filteredEvents = useMemo(
    () => (activeFilter === "all" ? GALLERY_EVENTS : GALLERY_EVENTS.filter((e) => e.category === activeFilter)),
    [activeFilter]
  );

  const currentPhoto = activePhoto !== null ? flatPhotos[activePhoto] : null;

  const handlePrev = useCallback(() => {
    if (activePhoto === null) return;
    setActivePhoto((i) => (i === null ? null : Math.max(0, i - 1)));
  }, [activePhoto]);

  const handleNext = useCallback(() => {
    if (activePhoto === null) return;
    setActivePhoto((i) => (i === null ? null : Math.min(flatPhotos.length - 1, i + 1)));
  }, [activePhoto, flatPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, handleNext, handlePrev]);

  const filterChips: { id: string; icon: LucideIcon }[] = [
    { id: "all", icon: LayoutGrid },
    { id: "conferences", icon: CalendarDays },
    { id: "commemorations", icon: HeartHandshake },
    { id: "youth", icon: GraduationCap },
    { id: "education", icon: Radio },
  ];

  return (
    <main className="bg-white">
      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 lg:pb-20 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,42,16,0.40), rgba(28,42,16,0.92)), url('/assets/Bisanzeda.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
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
            <Link to="/" className="hover:text-[#BC8A5F] transition-colors">{(gp?.breadcrumb as string) ?? "Home"}</Link>
            <span className="text-white/30">/</span>
            <span className="text-[#BC8A5F] font-semibold">{(gp?.heroTag as string) ?? "Gallery"}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-[#BC8A5F]/40 rounded-full px-4 py-2 mb-6"
          >
            <Camera size={15} className="text-[#BC8A5F]" />
            <span className="text-[#BC8A5F] text-xs font-bold uppercase tracking-widest">
              {(gp?.heroTag as string) ?? "Gallery"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md mb-4"
          >
            {(gp?.heroTitle as string) ?? "Moments & Memories"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-lg max-w-2xl leading-relaxed mb-8"
          >
            {(gp?.heroDesc as string) ?? ""}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Images, label: (gp?.heroChip1 as string) ?? "4 Collections" },
              { icon: Camera, label: (gp?.heroChip2 as string) ?? "32 Photos" },
            ].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2.5 text-sm text-white/85"
              >
                <chip.icon size={15} className="text-[#BC8A5F]" />
                {chip.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </div>

      {/* ─── STATS STRIP ─── */}
      <GalleryStats />

      {/* ─── FILTERS + COLLECTIONS ─── */}
      <WatermarkSection variant="default" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-12"
          >
            {filterChips.map((chip) => {
              const Icon = chip.icon;
              const isActive = activeFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveFilter(chip.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#4E6132] text-white shadow-lg scale-105"
                      : "bg-white text-[#4E6132] border border-[#4E6132]/20 hover:border-[#4E6132] hover:bg-[#4E6132]/5"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[#EAD196]" : "text-[#8B6543]"} />
                  {filters[chip.id] ?? chip.id}
                </button>
              );
            })}
          </motion.div>

          {/* Collections */}
          <div className="space-y-16">
            <AnimatePresence initial={false}>
              {filteredEvents.map((event, eventIdx) => (
                <GalleryCollection
                  key={event.category}
                  event={event}
                  eventIdx={GALLERY_EVENTS.indexOf(event)}
                  flatOffset={GALLERY_EVENTS.slice(0, GALLERY_EVENTS.indexOf(event)).reduce((a, e) => a + e.images.length, 0)}
                  onOpen={(globalIdx) => setActivePhoto(globalIdx)}
                  viewLabel={(gp?.viewCollection as string) ?? "View Collection"}
                  photoLabel={(gp?.photoCount as string) ?? "Photos"}
                  delay={eventIdx * 0.05}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </WatermarkSection>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {activePhoto !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center select-none"
            style={{ background: "rgba(0, 0, 0, 0.94)" }}
          >
            {/* Close */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-7 z-20 bg-transparent hover:bg-white/10 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
              aria-label={(gp?.close as string) ?? "Close"}
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              disabled={activePhoto === 0}
              className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-11 h-11 flex items-center justify-center transition-all ${
                activePhoto === 0
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 opacity-50"
                  : "bg-black/60 hover:bg-black/80 text-white cursor-pointer hover:scale-105 shadow-lg"
              }`}
              aria-label={(gp?.prev as string) ?? "Previous"}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              disabled={activePhoto === flatPhotos.length - 1}
              className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-11 h-11 flex items-center justify-center transition-all ${
                activePhoto === flatPhotos.length - 1
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 opacity-50"
                  : "bg-black/60 hover:bg-black/80 text-white cursor-pointer hover:scale-105 shadow-lg"
              }`}
              aria-label={(gp?.next as string) ?? "Next"}
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex flex-col w-full h-full">
              {/* Image area */}
              <div className="flex-1 flex items-center justify-center min-h-0 px-16 sm:px-20 py-6">
                <div className="relative flex items-center justify-center">
                  <motion.img
                    key={activePhoto}
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="block rounded-md shadow-2xl"
                    style={{
                      maxWidth: "78vw",
                      maxHeight: "calc(100vh - 150px)",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />

                  {/* Caption */}
                  <motion.div
                    key={`cap-${activePhoto}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full max-w-xl text-center"
                  >
                    <div
                      className="text-white text-sm font-semibold tracking-wide px-4 py-2 rounded-full inline-block"
                      style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(2px)" }}
                    >
                      {GALLERY_EVENTS[currentPhoto.eventIdx].title}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex-shrink-0 flex gap-2.5 justify-center items-end overflow-x-auto max-w-full px-4 py-4">
                {flatPhotos.map((thumb, idx) => (
                  <button
                    key={idx}
                    ref={(el) => {
                      if (idx === activePhoto && el) {
                        el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
                      }
                    }}
                    onClick={() => setActivePhoto(idx)}
                    className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      idx === activePhoto
                        ? "border-[#EAD196] opacity-100 scale-110"
                        : "border-transparent opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover block" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ───────────── STATS STRIP ───────────── */
function GalleryStats() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const gp = t("galleryPage", { returnObjects: true }) as Record<string, unknown>;
  const stats = (gp?.stats as Record<string, string>) ?? {};

  const items = [
    { target: 4, suffix: "", label: stats.collections ?? "Collections", color: "#4E6132" },
    { target: 32, suffix: "", label: stats.photos ?? "Photos", color: "#8B6543" },
    { target: 25, suffix: "+", label: stats.churches ?? "Member Churches", color: "#BC8A5F" },
    { target: 60, suffix: "+", label: stats.years ?? "Years of Service", color: "#4E6132" },
  ];

  return (
    <section ref={ref} className="bg-[#1C2A10] relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-white/5" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#EAD196]">
                <CountStat target={item.target} suffix={item.suffix} active={visible} />
              </div>
              <div className="text-white/60 text-xs font-bold uppercase tracking-widest mt-2">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountStat({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const count = useCountUp(target, 1600, active);
  return <>{Math.round(count)}{suffix}</>;
}

/* ───────────── COLLECTION CARD ───────────── */
function GalleryCollection({
  event, eventIdx, flatOffset, onOpen, viewLabel, photoLabel, delay,
}: {
  event: GalleryEvent;
  eventIdx: number;
  flatOffset: number;
  onOpen: (globalIdx: number) => void;
  viewLabel: string;
  photoLabel: string;
  delay: number;
}) {
  const { ref, visible } = useScrollReveal();
  const catIcons: Record<GalleryCategory, LucideIcon> = {
    conferences: CalendarDays,
    commemorations: HeartHandshake,
    youth: GraduationCap,
    education: Radio,
  };
  const CategoryIcon = catIcons[event.category] ?? Images;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      ref={ref}
      className="bg-[#F8F9F4] rounded-3xl p-6 sm:p-8 border border-[#4E6132]/10 shadow-[0_2px_12px_rgba(78,97,50,0.08)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#4E6132] flex items-center justify-center">
              <CategoryIcon size={15} className="text-[#EAD196]" />
            </div>
            <div className="h-px w-6 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-[11px] font-bold uppercase tracking-[2px]">
              {event.locationDate}
            </span>
          </div>
          <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-[#4E6132] leading-snug">
            {event.title}
          </h2>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="font-['Outfit'] font-black text-2xl text-[#8B6543] leading-none">
            {String(eventIdx + 1).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-[#4A4A4A]/60 font-bold uppercase tracking-wider mt-1">
            {event.images.length} {photoLabel}
          </div>
        </div>
      </div>

      {/* Featured grid: first image large on md+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {event.images.map((thumb, imgIdx) => {
          const globalIdx = flatOffset + imgIdx;
          const isFeatured = imgIdx === 0;
          return (
            <motion.div
              key={imgIdx}
              onClick={() => onOpen(globalIdx)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + imgIdx * 0.05 }}
              className={`rounded-xl overflow-hidden relative group cursor-pointer transition-all duration-200 hover:shadow-xl ${
                isFeatured
                  ? "aspect-square md:aspect-auto md:col-span-2 md:row-span-2"
                  : "aspect-square"
              }`}
            >
              <img
                src={thumb.src}
                alt={thumb.alt}
                className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full bg-[#4E6132]/85 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>
              {/* Counter badge on featured */}
              {isFeatured && (
                <div className="absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm">
                  {event.images.length} {photoLabel}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-6 flex justify-center"
      >
        <button
          onClick={() => onOpen(flatOffset)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#4E6132] bg-white border border-[#4E6132]/20 px-6 py-2.5 rounded-full hover:bg-[#4E6132] hover:text-white transition-all duration-200 cursor-pointer group"
        >
          <Camera size={14} className="group-hover:text-[#EAD196]" />
          {viewLabel}
        </button>
      </motion.div>
    </motion.div>
  );
}
