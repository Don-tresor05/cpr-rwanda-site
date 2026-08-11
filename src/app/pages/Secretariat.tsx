import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import {
  Landmark, CalendarDays, Megaphone, Leaf, BookOpen, Users,
  Phone, Mail, MapPin, ArrowRight, Quote, type LucideIcon
} from "lucide-react";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { ImageLightbox } from "../components/ui/ImageLightbox";
import { FALLBACK_CONTACT, useSiteSettings } from "../data/siteSettings";
import { useSecretariatPage } from "../data/pageContent";

interface SubSection {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  body: string[];
  accent: string;
  image: string;
}

const secImages: Record<string, string> = {
  sg: "/assets/secretariat-sg.webp",
  events: "/assets/secretariat-events.webp",
  meetings: "/assets/secretariat-meetings.webp",
  advocacy: "/assets/secretariat-advocacy.webp",
  sustainability: "/assets/secretariat-sustainability.webp",
  publications: "/assets/secretariat-publications.webp",
};

const getSecStats = (lang: string): Record<string, { label: string; value: string }[]> => {
  const isFr = lang === "fr";
  const isRw = lang === "rw";
  return {
    sg: [
      { label: isFr ? "Églises Membres" : isRw ? "Amatorera Nyamuryango" : "Member Churches", value: "25+" },
      { label: isFr ? "Membres du Personnel" : isRw ? "Abakozi b'Umuryango" : "Staff Members", value: "50+" },
      { label: isFr ? "Années d'Activité" : isRw ? "Imyaka Imarijeho" : "Years Active", value: "60+" },
    ],
    events: [
      { label: isFr ? "Assemblées Annuelles" : isRw ? "Inteko z'Umwaka" : "Annual Assemblies", value: "1" },
      { label: isFr ? "Synodes Biennaux" : isRw ? "Sinode z'Amatora" : "Biennial Synods", value: "1" },
      { label: isFr ? "Sommets des Jeunes" : isRw ? "Inama z'Urubyiruko" : "Youth Summits", value: "5+" },
    ],
    meetings: [
      { label: isFr ? "Sessions Com." : isRw ? "Inama z'Ihuriro" : "Comm. Sessions", value: isFr ? "4/an" : isRw ? "4/umwaka" : "4/yr" },
      { label: isFr ? "Réunions du Conseil" : isRw ? "Inama z'Inzego" : "Board Meetings", value: isFr ? "6/an" : isRw ? "6/umwaka" : "6/yr" },
      { label: isFr ? "Retraites" : isRw ? "Umwiherero" : "Retreats", value: isFr ? "1/an" : isRw ? "1/umwaka" : "1/yr" },
    ],
    advocacy: [
      { label: isFr ? "Domaines Politiques" : isRw ? "Inzego z'Amategeko" : "Policy Areas", value: "5+" },
      { label: isFr ? "Forums Nationaux" : isRw ? "Inama z'Igihugu" : "Nat. Forums", value: "10+" },
      { label: isFr ? "Plateformes Intern." : isRw ? "Inzego Mpuzamahanga" : "Intl. Platforms", value: "3+" },
    ],
    sustainability: [
      { label: isFr ? "Initiatives Arbres" : isRw ? "Imishinga y'Ibiti" : "Tree Initiatives", value: "15+" },
      { label: isFr ? "Écoles Vertes" : isRw ? "Amashuri Arengera Isi" : "Green Schools", value: "50+" },
      { label: isFr ? "Partenaires" : isRw ? "Abafatanyabikorwa" : "Partners", value: "8+" },
    ],
    publications: [
      { label: isFr ? "Rapports Annuels" : isRw ? "Raporu z'Umwaka" : "Annual Reports", value: "60+" },
      { label: isFr ? "Bulletins" : isRw ? "Utumenyesha" : "Newsletters", value: "200+" },
      { label: isFr ? "Communiqués" : isRw ? "Amatangazo" : "Communiqués", value: "100+" },
    ],
  };
};

export function Secretariat() {
  const [activeSection, setActiveSection] = useState("");
  const [sgPhotoOpen, setSgPhotoOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation("home");
  const lang = i18n.language ? i18n.language.substring(0, 2) : "en";
  const secStats = getSecStats(lang);
  const contact = useSiteSettings()?.contact ?? FALLBACK_CONTACT;
  const cms = useSecretariatPage();
  /** Returns the CMS section for a key, if staff filled it in. */
  const cmsSec = (key: string) => cms?.sections?.find((s) => s.key === key);
  const { ref: introRef, visible: introVisible } = useScrollReveal();
  const { ref: sgRef, visible: sgVisible } = useScrollReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 80]);

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

  const navLinks = [
    { label: cmsSec("sg")?.nav ?? t("secretariatPage.nav.sg"), href: "#sg" },
    { label: cmsSec("events")?.nav ?? t("secretariatPage.nav.events"), href: "#events" },
    { label: cmsSec("meetings")?.nav ?? t("secretariatPage.nav.meetings"), href: "#meetings" },
    { label: cmsSec("advocacy")?.nav ?? t("secretariatPage.nav.advocacy"), href: "#advocacy" },
    { label: cmsSec("sustainability")?.nav ?? t("secretariatPage.nav.sustainability"), href: "#sustainability" },
    { label: cmsSec("publications")?.nav ?? t("secretariatPage.nav.publications"), href: "#publications" },
  ];

  const sectionDefs: { id: string; icon: LucideIcon; accent: string }[] = [
    { id: "sg", icon: Landmark, accent: "#4E6132" },
    { id: "events", icon: CalendarDays, accent: "#8B6543" },
    { id: "meetings", icon: Users, accent: "#4E6132" },
    { id: "advocacy", icon: Megaphone, accent: "#8B6543" },
    { id: "sustainability", icon: Leaf, accent: "#4E6132" },
    { id: "publications", icon: BookOpen, accent: "#8B6543" },
  ];

  const sections: SubSection[] = sectionDefs.map(({ id, icon, accent }) => {
    const c = cmsSec(id);
    return {
      id,
      icon,
      tag: c?.tag ?? t(`secretariatPage.${id}.tag`),
      title: c?.title ?? t(`secretariatPage.${id}.title`),
      desc: c?.desc ?? t(`secretariatPage.${id}.desc`),
      body: c?.body?.length
        ? c.body
        : (t(`secretariatPage.${id}.body`, { returnObjects: true }) as string[]),
      accent,
      image: secImages[id] ?? "",
    };
  });

  return (
    <main className="bg-white">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(78,97,50,0.45), rgba(78,97,50,0.88)), url('/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 10%",
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
            {cms?.heroTitle ?? t("secretariatPage.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-lg max-w-2xl leading-relaxed"
          >
            {cms?.heroDesc ?? t("secretariatPage.heroDesc")}
          </motion.p>
        </motion.div>
        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>

      {/* Sticky Sub-Nav */}
      <div data-sticky-subnav className="bg-[#F5F5DC] border-b border-[#8B6543]/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-start lg:justify-center gap-2 lg:gap-3 overflow-x-auto h-20 lg:h-24 scrollbar-hide">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "bg-[#8B6543]/20 text-[#8B6543] font-bold shadow-sm"
                    : "text-[#4E6132] font-semibold hover:bg-[#8B6543]/20 hover:text-[#8B6543] hover:font-bold"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Intro */}
      <WatermarkSection className="py-16 lg:py-20 bg-white">
        <div ref={introRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2">
              <div className="h-px w-8 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {cms?.introTag ?? t("secretariatPage.introTag")}
              </span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5">
              {cms?.introTitle ?? t("secretariatPage.introTitle")}
            </h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed">
              {cms?.introDesc ?? t("secretariatPage.introDesc")}
            </p>
          </motion.div>
        </div>
      </WatermarkSection>

      {/* Secretary General Profile */}
      <WatermarkSection className="pb-16 lg:pb-20 bg-white">
        <div ref={sgRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sgVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-[#F8F9F4] border border-[#4E6132]/10 rounded-3xl p-8 lg:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={sgVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="flex-shrink-0"
              >
                <div
                  onClick={() => setSgPhotoOpen(true)}
                  className="w-40 h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden border-4 border-[#4E6132]/20 shadow-xl cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img
                    src="/assets/Mutabazi_Samuel.webp"
                    alt="Rev. Samuel Mutabazi"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </motion.div>
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={sgVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-flex items-center gap-2 md:justify-start justify-center w-full md:w-auto"
                >
                  <div className="h-px w-8 bg-[#8B6543]" />
                  <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                    {cms?.sgProfile?.role ?? t("secretariatPage.sgProfile.role")}
                  </span>
                  <div className="h-px w-8 bg-[#8B6543]" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={sgVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="font-['Outfit'] font-black text-2xl lg:text-3xl text-[#4E6132] mt-1 mb-1"
                >
                  {cms?.sgProfile?.name ?? t("secretariatPage.sgProfile.name")}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={sgVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-[#8B6543] font-semibold text-sm mb-4"
                >
                  {cms?.sgProfile?.title ?? t("secretariatPage.sgProfile.title")}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={sgVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative"
                >
                  <Quote size={28} className="text-[#4E6132]/15 absolute -top-1 -left-1 hidden md:block" />
                  <p className="text-[#4A4A4A] leading-relaxed md:pl-7 italic">
                    {cms?.sgProfile?.quote ?? t("secretariatPage.sgProfile.quote")}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={sgVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start"
                >
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-sm text-[#4E6132] font-semibold hover:text-[#8B6543] transition-colors"
                  >
                    <Mail size={14} /> {contact.email}
                  </a>
                  <span className="text-[#4E6132]/20 hidden md:inline">|</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-[#4E6132] font-semibold hover:text-[#8B6543] transition-colors"
                  >
                    <Phone size={14} /> {contact.phone}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </WatermarkSection>

      {/* Sections */}
      {sections.map((sec, i) => {
        const isEven = i % 2 === 0;
        return <SectionBlock key={sec.id} sec={sec} stats={secStats[sec.id] ?? []} isEven={isEven} index={i} />;
      })}

      {/* Contact CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-[#4E6132] relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-4"
          >
            {cms?.cta?.title ?? t("secretariatPage.cta.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
          >
            {cms?.cta?.desc ?? t("secretariatPage.cta.desc")}
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
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#EAD196] text-[#4E6132] font-bold px-8 py-3.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105"
            >
              {cms?.cta?.btn ?? t("secretariatPage.cta.btn")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <ImageLightbox
        images={[{ src: "/assets/Mutabazi_Samuel.webp", alt: "Rev. Samuel Mutabazi" }]}
        selectedIndex={sgPhotoOpen ? 0 : null}
        onClose={() => setSgPhotoOpen(false)}
      />
    </main>
  );
}

function SectionBlock({ sec, stats, isEven, index }: { sec: SubSection; stats: { label: string; value: string }[]; isEven: boolean; index: number }) {
  const { ref, visible } = useScrollReveal();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const Icon = sec.icon;

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id={sec.id}
      ref={blockRef}
      className={`relative scroll-mt-20 overflow-hidden ${
        isEven ? "bg-white" : "bg-[#F8F9F4]"
      }`}
    >
      {/* Decorative side accent bar */}
      <div
        className="absolute top-0 left-0 w-1.5 h-full"
        style={{ backgroundColor: sec.accent }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            !isEven ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Content side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div
                className="h-px w-8"
                style={{ backgroundColor: sec.accent }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: sec.accent }}
              >
                {sec.tag}
              </span>
              <div
                className="h-px w-8"
                style={{ backgroundColor: sec.accent }}
              />
            </div>

            {/* Title with icon */}
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ backgroundColor: sec.accent }}
              >
                <Icon size={28} color="white" strokeWidth={1.5} />
              </div>
              <h2 
                className="font-['Outfit'] font-black text-3xl lg:text-4xl leading-tight pt-1"
                style={{ color: sec.accent }}
              >
                {sec.title}
              </h2>
            </div>

            <p className="text-[#4A4A4A] text-base lg:text-lg leading-relaxed mb-8">
              {sec.desc}
            </p>

            {/* Stats mini-cards */}
            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    className="bg-white rounded-xl p-3.5 text-center shadow-sm border border-[#4E6132]/15 border-l-4"
                    style={{ borderLeftColor: sec.accent }}
                  >
                    <div
                      className="text-lg font-black"
                      style={{ color: sec.accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#4A4A4A]/75 font-bold uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bullet list */}
            <ul className="space-y-2.5">
              {sec.body.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + idx * 0.07,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 text-[#4A4A4A] text-sm lg:text-base"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={visible ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + idx * 0.07,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sec.accent }}
                  />
                  <span className="leading-relaxed">{item.replace(/^\d+[\.\)]\s*/, "")}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Image with overlay */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative rounded-lg overflow-hidden shadow-2xl aspect-[4/3] cursor-pointer hover:opacity-95 transition-opacity"
              style={{ backgroundColor: `${sec.accent}20` }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${sec.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  y: imageY,
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${sec.accent}40 0%, transparent 50%, ${sec.accent}20 100%)`,
                }}
              />
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl -z-10"
              style={{ backgroundColor: `${sec.accent}15` }}
            />
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      {index < 5 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#4E6132]/10 to-transparent" />
        </div>
      )}

      <ImageLightbox
        images={[{ src: sec.image, alt: sec.title }]}
        selectedIndex={lightboxOpen ? 0 : null}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
