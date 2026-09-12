import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { ImageLightbox } from "../components/ui/ImageLightbox";
import { FALLBACK_CONTACT, useSiteSettings } from "../data/siteSettings";
import { useRadioPrograms } from "../data/cmsContent";
import { useRadioPage } from "../data/pageContent";
import {
  Radio, RadioTower, PlayCircle, Clock,
  BookOpen, Shield, Sprout, MapPin, Phone, Mail,
  ArrowRight, AudioLines, CalendarDays, Users,
  Eye, Compass, type LucideIcon,
} from "lucide-react";

interface Section {
  id: string;
  label: string;
}

export function RadioPage() {
  const location = useLocation();
  const { t } = useTranslation("home");
  const [activeSection, setActiveSection] = useState("");
  const cms = useRadioPage();

  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const nav = (rp?.nav as Record<string, string>) ?? {};
  const heroDesc = cms?.heroDesc ?? (rp?.heroDesc as string) ?? "";

  const navLinks: Section[] = [
    { id: "about", label: cms?.nav?.about ?? nav.about ?? "About Radio" },
    { id: "vision", label: cms?.nav?.vision ?? nav.vision ?? "Vision & Mission" },
    { id: "editorial", label: cms?.nav?.editorial ?? nav.editorial ?? "Editorial Line" },
    { id: "programs", label: cms?.nav?.programs ?? nav.programs ?? "Programs" },
    { id: "coverage", label: cms?.nav?.coverage ?? nav.coverage ?? "Coverage & Reach" },
    { id: "beneficiaries", label: cms?.nav?.beneficiaries ?? nav.beneficiaries ?? "Beneficiaries" },
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-20% 0px -60% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <main className="bg-white">
      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[65vh] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 lg:pb-20 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(28,42,16,0.35), rgba(28,42,16,0.92)), url('${cms?.heroImage ?? "/cpr/assets/radio-hero.webp"}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 10%",
            y: heroBgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A10] via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-7xl w-full mx-auto"
          style={{ opacity: heroOpacity, y: heroContentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-[#EAD196]/40 rounded-full px-4 py-2 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAD196] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EAD196]" />
            </span>
            <RadioTower size={15} className="text-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">
              {cms?.heroTag ?? (rp?.heroTag as string) ?? "Radio Inkoramutima"}
            </span>
          </motion.div>

          <motion.img
            src="/cpr/assets/Inkoramutima-Logo.jpg"
            alt={cms?.heroTitle ?? (rp?.heroTitle as string) ?? "Radio Inkoramutima"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="h-20 lg:h-24 w-auto mb-6 drop-shadow-2xl"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-md mb-4"
          >
            {cms?.heroTitle ?? (rp?.heroTitle as string) ?? "107.1 FM — Broadcasting Hope"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-base lg:text-lg max-w-2xl leading-relaxed mb-8"
          >
            {heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://www.youtube.com/@inkoramutimaradiotv7564"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#BC8A5F] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#4E6132] transition-all duration-300 hover:scale-105 text-sm shadow-lg"
            >
              <PlayCircle size={18} /> {cms?.heroCta ?? (rp?.heroCta as string) ?? "Listen Live"}
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm"
              onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              {cms?.heroCtaSecondary ?? (rp?.heroCtaSecondary as string) ?? "About the Radio"}
            </a>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </div>

      {/* ─── STICKY SUB-NAV ─── */}
      <div data-sticky-subnav className="bg-[#F5F5DC] border-b border-[#8B6543]/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-start lg:justify-center gap-2 lg:gap-3 overflow-x-auto h-14 lg:h-20 scrollbar-hide">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-[#8B6543]/20 text-[#8B6543] font-bold shadow-sm"
                    : "text-[#4E6132] font-semibold hover:bg-[#8B6543]/20 hover:text-[#8B6543] hover:font-bold"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ─── ABOUT / HISTORY ─── */}
      <RadioHistoryBlock />

      {/* ─── VISION & MISSION ─── */}
      <VisionMissionBlock />

      {/* ─── EDITORIAL LINE ─── */}
      <EditorialLineBlock />

      {/* ─── PROGRAMS SCHEDULE ─── */}
      <ProgramsBlock />

      {/* ─── COVERAGE & BENEFICIARIES ─── */}
      <CoverageBlock />

      {/* ─── CTA ─── */}
      <RadioCtaBlock />
    </main>
  );
}

/* ───────────── ABOUT / HISTORY ───────────── */
function RadioHistoryBlock() {
  const { ref, visible } = useScrollReveal();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { t } = useTranslation("home");
  const cms = useRadioPage();
  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const about = (rp?.about as Record<string, unknown>) ?? {};
  const cmsAbout = cms?.about;
  const body = cmsAbout?.body?.length ? cmsAbout.body : ((about?.body as string[]) ?? []);

  return (
    <WatermarkSection id="about" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {cmsAbout?.tag ?? (about?.tag as string) ?? "Historical Background"}
              </span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5 leading-tight">
              {cmsAbout?.title ?? (about?.title as string) ?? "From a Long-Cherished Dream to Reality"}
            </h2>
            <p className="text-[#4A4A4A] text-base lg:text-lg leading-relaxed mb-8">
              {cmsAbout?.desc ?? (about?.desc as string) ?? ""}
            </p>

            {/* History timeline */}
            <div className="space-y-0">
              {body.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + idx * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#BC8A5F]/15 border border-[#BC8A5F]/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#BC8A5F] text-xs font-black">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    {idx < body.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-[#BC8A5F]/30 to-transparent my-1" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-[#4A4A4A] text-sm lg:text-base leading-relaxed">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative lg:sticky lg:top-32"
          >
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-[#1C2A10] cursor-pointer hover:opacity-95 transition-opacity"
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/cpr/assets/radio-studio.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A10]/85 via-transparent to-transparent" />
              {/* Live badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                </span>
                <span className="text-white text-xs font-bold">107.1 FM</span>
              </div>
              {/* Studio GIF */}
              <div className="absolute bottom-4 right-4">
                <img
                  src="/cpr/assets/radio-studio.gif"
                  alt="Radio Inkoramutima studio"
                  className="w-44 lg:w-56 rounded-xl shadow-2xl border border-white/20"
                />
              </div>
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-4 lg:-left-8 bg-[#F5F5DC] rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 border border-[#8B6543]/10"
            >
              <div className="w-11 h-11 rounded-xl bg-[#4E6132] flex items-center justify-center">
                <Clock size={22} className="text-white" />
              </div>
              <div>
                <div className="font-['Outfit'] font-black text-[#4E6132] leading-none">17h</div>
                <div className="text-xs text-[#4A4A4A]/70 mt-1">{cmsAbout?.hours ?? (about?.hours as string) ?? "5:00 — 22:00 daily"}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <ImageLightbox
        images={[{ src: "/cpr/assets/radio-studio.webp", alt: "Radio Inkoramutima Studio" }]}
        selectedIndex={lightboxOpen ? 0 : null}
        onClose={() => setLightboxOpen(false)}
      />
    </WatermarkSection>
  );
}

/* ───────────── VISION & MISSION ───────────── */
function VisionMissionBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cms = useRadioPage();
  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const vision = (rp?.vision as Record<string, unknown>) ?? {};
  const cmsVision = cms?.vision;

  const cards = [
    {
      icon: Eye,
      tag: cmsVision?.visionTag ?? (vision?.visionTag as string) ?? "Our Vision",
      sub: cmsVision?.visionSub ?? (vision?.visionSub as string) ?? "Where we're headed",
      desc: cmsVision?.visionDesc ?? (vision?.visionDesc as string) ?? "",
      color: "#4E6132",
    },
    {
      icon: Compass,
      tag: cmsVision?.missionTag ?? (vision?.missionTag as string) ?? "Our Mission",
      sub: cmsVision?.missionSub ?? (vision?.missionSub as string) ?? "What we do every day",
      desc: cmsVision?.missionDesc ?? (vision?.missionDesc as string) ?? "",
      color: "#8B6543",
    },
  ];

  return (
    <section id="vision" className="py-16 lg:py-24 bg-[#F8F9F4] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 justify-center mb-3">
            <div className="h-px w-8 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{cmsVision?.tag ?? (vision?.tag as string) ?? "Vision & Mission"}</span>
            <div className="h-px w-8 bg-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132]">
            {cms?.introTitle ?? (rp?.introTitle as string) ?? "The Voice of the Heart"}
          </h2>
          <p className="text-[#4A4A4A] mt-3 max-w-2xl mx-auto">
            {cms?.introDesc ?? (rp?.introDesc as string) ?? ""}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1.5"
                  style={{ backgroundColor: card.color }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${card.color}15`, color: card.color }}
                >
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: card.color }}>
                  {card.tag}
                </div>
                <div className="text-sm text-[#8B6543] font-semibold mb-4">{card.sub}</div>
                <p className="text-[#4A4A4A] text-base leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── EDITORIAL LINE ───────────── */
function EditorialLineBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cms = useRadioPage();
  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const editorial = (rp?.editorial as Record<string, unknown>) ?? {};
  const cmsEditorial = cms?.editorial;
  const items = cmsEditorial?.items?.length
    ? cmsEditorial.items
    : ((editorial?.items as { title: string; desc: string }[]) ?? []);

  const icons: LucideIcon[] = [BookOpen, Shield, Sprout];
  const colors = ["#4E6132", "#8B6543", "#BC8A5F"];

  return (
    <WatermarkSection id="editorial" variant="dense" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 justify-center mb-3">
            <div className="h-px w-8 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
              {cmsEditorial?.tag ?? (editorial?.tag as string) ?? "Editorial Line"}
            </span>
            <div className="h-px w-8 bg-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132]">
            {cmsEditorial?.title ?? (editorial?.title as string) ?? "Evangelization, Unity & Holistic Development"}
          </h2>
          <p className="text-[#4A4A4A] mt-3 max-w-2xl mx-auto">
            {cmsEditorial?.desc ?? (editorial?.desc as string) ?? ""}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Radio;
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative rounded-3xl p-8 border border-[#4E6132]/8 bg-[#F8F9F4] hover:bg-white hover:shadow-2xl hover:border-[#4E6132]/20 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">{item.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WatermarkSection>
  );
}

/* ───────────── PROGRAMS SCHEDULE ───────────── */
function ProgramsBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cms = useRadioPage();
  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const programs = (rp?.programs as Record<string, unknown>) ?? {};
  const cmsProgramsCopy = cms?.programs;
  // CMS schedule when staff have created one; otherwise the translated default.
  const cmsScheduleItems = useRadioPrograms();
  const items =
    cmsScheduleItems ??
    ((programs?.items as { time: string; title: string; desc: string }[]) ?? []);

  return (
    <section id="programs" ref={ref} className="relative py-16 lg:py-24 scroll-mt-20 overflow-hidden bg-[#1C2A10]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&h=800&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2A10] via-[#1C2A10]/90 to-[#1C2A10]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 bg-white/8 border border-[#BC8A5F]/30 rounded-full px-4 py-2 mb-5">
            <CalendarDays size={14} className="text-[#BC8A5F]" />
            <span className="text-[#BC8A5F] text-xs font-bold uppercase tracking-widest">
              {cmsProgramsCopy?.tag ?? (programs?.tag as string) ?? "Programs"}
            </span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white">
            {cmsProgramsCopy?.title ?? (programs?.title as string) ?? "A Full Day of Hope on 107.1 FM"}
          </h2>
          <p className="text-white/65 mt-3 max-w-2xl mx-auto">
            {cmsProgramsCopy?.desc ?? (programs?.desc as string) ?? ""}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-[#BC8A5F]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-[#BC8A5F] text-xs font-bold mb-3">
                <Clock size={13} />
                <span>{item.time}</span>
              </div>
              <div className="font-['Outfit'] font-bold text-white text-sm lg:text-base mb-2 leading-snug group-hover:text-[#BC8A5F] transition-colors">
                {item.title}
              </div>
              <p className="text-white/55 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-white/50 text-xs mt-10 flex items-center justify-center gap-2"
        >
          <AudioLines size={14} className="text-[#BC8A5F]" />
          {cmsProgramsCopy?.footerTag ?? (programs?.footerTag as string) ?? "107.1 FM — Voice of the Heart"}
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────── COVERAGE & BENEFICIARIES ───────────── */
function CoverageBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cms = useRadioPage();
  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const coverage = (rp?.coverage as Record<string, unknown>) ?? {};
  const beneficiaries = (rp?.beneficiaries as Record<string, unknown>) ?? {};
  const cmsCoverage = cms?.coverage;
  const cmsBeneficiaries = cms?.beneficiaries;
  const coverageStats: { value: string; label: string }[] = cmsCoverage?.stats?.length
    ? cmsCoverage.stats.map((s) => ({ value: s.value, label: s.label ?? "" }))
    : ((coverage?.stats as { value: string; label: string }[]) ?? []);
  const regions = cmsCoverage?.regions?.length ? cmsCoverage.regions : ((coverage?.regions as string[]) ?? []);
  const benefStats: { value: string; label: string }[] = cmsBeneficiaries?.stats?.length
    ? cmsBeneficiaries.stats.map((s) => ({ value: s.value, label: s.label ?? "" }))
    : ((beneficiaries?.stats as { value: string; label: string }[]) ?? []);

  return (
    <section id="coverage" className="py-16 lg:py-24 bg-[#F8F9F4] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {cmsCoverage?.tag ?? (coverage?.tag as string) ?? "Coverage & Reach"}
              </span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5 leading-tight">
              {cmsCoverage?.title ?? (coverage?.title as string) ?? "A Voice That Crosses Borders"}
            </h2>
            <p className="text-[#4A4A4A] text-base leading-relaxed mb-8">
              {cmsCoverage?.desc ?? (coverage?.desc as string) ?? ""}
            </p>

            {/* Coverage stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {coverageStats.map((stat, i) => (
                <CoverageStat key={stat.label} stat={stat} index={i} active={visible} />
              ))}
            </div>

            {/* Regions */}
            <div className="flex flex-wrap gap-3">
              {regions.map((region, i) => (
                <motion.span
                  key={region}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                  className="inline-flex items-center gap-2 bg-white border border-[#4E6132]/20 rounded-full px-5 py-2.5 text-sm font-bold text-[#4E6132] shadow-sm hover:shadow-md transition-shadow"
                >
                  <MapPin size={15} className="text-[#8B6543]" /> {region}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Visual: concentric radio rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-[#BC8A5F]/8 border border-[#BC8A5F]/15 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-[#BC8A5F]/12 border border-[#BC8A5F]/25 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-[#BC8A5F]/15 border border-[#BC8A5F]/35 flex items-center justify-center">
                    <div className="text-center">
                      <RadioTower size={44} className="text-[#BC8A5F] mx-auto mb-3" />
                      <div className="font-['Outfit'] font-black text-[#4E6132] text-4xl">107.1</div>
                      <div className="text-[#8B6543] text-sm font-semibold">FM</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border border-[#BC8A5F]/15 animate-ping" style={{ animationDuration: "3.5s" }} />
            </div>
          </motion.div>
        </div>

        {/* Beneficiaries */}
        <section id="beneficiaries" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="bg-[#4E6132] rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/5" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Users size={15} className="text-[#EAD196]" />
                  <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">
                    {cmsBeneficiaries?.tag ?? (beneficiaries?.tag as string) ?? "Beneficiaries"}
                  </span>
                </div>
                <h3 className="font-['Outfit'] font-black text-2xl lg:text-3xl text-white mb-4">
                  {cmsBeneficiaries?.title ?? (beneficiaries?.title as string) ?? "Serving the Church and the Nation"}
                </h3>
                <p className="text-white/75 text-sm lg:text-base leading-relaxed">
                  {cmsBeneficiaries?.desc ?? (beneficiaries?.desc as string) ?? ""}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {benefStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 border-l-4 border-l-[#8B6543] rounded-2xl p-4 text-center"
                  >
                    <div className="font-['Outfit'] font-black text-2xl lg:text-3xl text-[#EAD196]">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/75 font-bold uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </section>
  );
}

function CoverageStat({ stat, index, active }: { stat: { value: string; label: string }; index: number; active: boolean }) {
  const numeric = parseFloat(stat.value.replace(/[^0-9.]/g, "")) || 0;
  const isDecimal = stat.value.includes(".");
  const count = useCountUp(numeric, 1800, active);
  const display = isDecimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
      className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#4E6132]/15 border-l-4 border-l-[#8B6543] hover:shadow-lg transition-shadow"
    >
      <div className="font-['Outfit'] font-black text-xl lg:text-2xl text-[#4E6132]">
        {display}
        {stat.value.includes(".") ? "" : stat.value.includes("%") ? "%" : stat.value.includes("h") ? "h" : ""}
      </div>
      <div className="text-[10px] text-[#4A4A4A]/75 font-bold uppercase tracking-wider mt-0.5">{stat.label}</div>
    </motion.div>
  );
}

/* ───────────── CTA ───────────── */
function RadioCtaBlock() {
  const { t } = useTranslation("home");
  const cms = useRadioPage();
  const contact = useSiteSettings()?.contact ?? FALLBACK_CONTACT;
  const rp = t("radioPage", { returnObjects: true }) as Record<string, unknown>;
  const cta = (rp?.cta as Record<string, unknown>) ?? {};
  const cmsCta = cms?.cta;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-14 sm:py-20 bg-[#1C2A10] relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
      <div className="absolute inset-0 opacity-[0.04]">
        <img src="/cpr/assets/Inkoramutima-Logo.jpg" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white mb-4"
        >
          {cmsCta?.title ?? (cta?.title as string) ?? "Tune In to Radio Inkoramutima"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto"
        >
          {cmsCta?.desc ?? (cta?.desc as string) ?? ""}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 text-white/80 text-sm mb-8"
        >
          <span className="flex items-center gap-2"><Phone size={14} className="text-[#EAD196]" /> {contact.phone}</span>
          <span className="flex items-center gap-2"><Mail size={14} className="text-[#EAD196]" /> {contact.email}</span>
          <span className="flex items-center gap-2"><MapPin size={14} className="text-[#EAD196]" /> {contact.addressLine1}, {contact.addressLine2}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://www.youtube.com/@inkoramutimaradiotv7564"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#BC8A5F] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#EAD196] hover:text-[#4E6132] transition-all duration-300 hover:scale-105"
          >
            <PlayCircle size={16} /> {cmsCta?.btn ?? (cta?.btn as string) ?? "Listen Live"}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            {cmsCta?.btnSecondary ?? (cta?.btnSecondary as string) ?? "Contact Us"} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
