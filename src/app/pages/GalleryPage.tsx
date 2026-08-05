import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";

interface GalleryItem {
  src: string;
  alt: string;
}

interface GalleryEvent {
  title: string;
  locationDate: string;
  images: GalleryItem[];
}

const GALLERY_EVENTS: GalleryEvent[] = [
  {
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

export function GalleryPage() {
  const [activeImage, setActiveImage] = useState<{ eventIdx: number; imgIdx: number } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!activeImage) return;
    if (e.key === "Escape") setActiveImage(null);
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  const handleNext = () => {
    if (!activeImage) return;
    const currentEvent = GALLERY_EVENTS[activeImage.eventIdx];
    if (activeImage.imgIdx < currentEvent.images.length - 1) {
      setActiveImage({ ...activeImage, imgIdx: activeImage.imgIdx + 1 });
    }
  };

  const handlePrev = () => {
    if (!activeImage) return;
    if (activeImage.imgIdx > 0) {
      setActiveImage({ ...activeImage, imgIdx: activeImage.imgIdx - 1 });
    }
  };

  const currentPhoto = activeImage ? GALLERY_EVENTS[activeImage.eventIdx].images[activeImage.imgIdx] : null;
  const currentEventTitle = activeImage ? GALLERY_EVENTS[activeImage.eventIdx].title : "";
  const isFirstPhoto = activeImage ? activeImage.imgIdx === 0 : true;
  const isLastPhoto = activeImage ? activeImage.imgIdx === GALLERY_EVENTS[activeImage.eventIdx].images.length - 1 : true;

  return (
    <main style={{ backgroundColor: "rgba(255, 255, 255, 0.88)" }}>
      {/* Hero — matches Secretariat/Departments pattern */}
      <div
        ref={heroRef}
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(78,97,50,0.45), rgba(78,97,50,0.88)), url('/assets/Bisanzeda.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 5%",
            y: heroBgY,
          }}
        />
        {/* Decorative overlay shimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-7xl w-full mx-auto"
          style={{ opacity: heroOpacity, y: heroContentY }}
        >

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-lg max-w-2xl leading-relaxed"
          >
            A visual journey through CPR Rwanda's ministry, events, community outreach, and commemorations.
          </motion.p>
        </motion.div>
        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>

      {/* Gallery Body */}
      <WatermarkSection variant="default" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-14">
          {GALLERY_EVENTS.map((event, eventIdx) => (
            <motion.div
              key={eventIdx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: eventIdx * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(78,97,50,0.08)] border border-[#4E6132]/5"
            >
              {/* Event Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <div className="h-px w-8 bg-[#8B6543]" />
                    <span className="text-[#8B6543] text-[11px] font-bold uppercase tracking-[2px]">
                      {event.locationDate}
                    </span>
                  </div>
                  <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-[#4E6132] leading-snug">
                    {event.title}
                  </h2>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {event.images.map((thumb, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => setActiveImage({ eventIdx, imgIdx })}
                    className="rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg relative group bg-[#F8F9F4]"
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.alt}
                      className="w-full h-full object-cover object-[center_15%] block transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </WatermarkSection>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center select-none"
            style={{ background: "rgba(0, 0, 0, 0.92)" }}
          >
            {/* Close Button — top right */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-5 right-7 z-20 bg-transparent hover:bg-white/10 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              disabled={isFirstPhoto}
              className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-11 h-11 flex items-center justify-center transition-all ${
                isFirstPhoto
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 opacity-50"
                  : "bg-black/60 hover:bg-black/80 text-white cursor-pointer hover:scale-105 shadow-lg"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              disabled={isLastPhoto}
              className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-11 h-11 flex items-center justify-center transition-all ${
                isLastPhoto
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 opacity-50"
                  : "bg-black/60 hover:bg-black/80 text-white cursor-pointer hover:scale-105 shadow-lg"
              }`}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Full-height flex column: image centered in remaining space, thumbs at bottom edge */}
            <div className="flex flex-col w-full h-full">
              {/* Image area — flex-1 centers the image vertically in whatever space is left */}
              <div className="flex-1 flex items-center justify-center min-h-0 px-16 sm:px-20">
                <div className="relative flex items-center justify-center">
                  <motion.img
                    key={`${activeImage.eventIdx}-${activeImage.imgIdx}`}
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="block rounded-md"
                    style={{
                      maxWidth: "85vw",
                      maxHeight: "calc(100vh - 120px)",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />

                  {/* Counter — overlaid inside the image, bottom center */}
                  <div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm font-medium tracking-wide px-3 py-1 rounded-full"
                    style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(2px)" }}
                  >
                    {activeImage.imgIdx + 1} / {GALLERY_EVENTS[activeImage.eventIdx].images.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail strip — pinned at the very bottom edge */}
              <div
                className="flex-shrink-0 flex gap-2.5 justify-center overflow-x-auto max-w-full px-4 py-2"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.3) transparent" }}
              >
                {GALLERY_EVENTS[activeImage.eventIdx].images.map((thumb, idx) => (
                  <button
                    key={idx}
                    ref={(el) => {
                      if (idx === activeImage.imgIdx && el) {
                        el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
                      }
                    }}
                    onClick={() => setActiveImage({ eventIdx: activeImage.eventIdx, imgIdx: idx })}
                    className={`flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      idx === activeImage.imgIdx
                        ? "border-[#d4af37] opacity-100"
                        : "border-transparent opacity-60 hover:opacity-90"
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
