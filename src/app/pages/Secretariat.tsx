import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import {
  Landmark, CalendarDays, Megaphone, Leaf, BookOpen, Users,
  Phone, Mail, MapPin, ArrowRight, Quote, type LucideIcon
} from "lucide-react";
import { WatermarkSection } from "../components/ui/WatermarkBackground";

interface SubSection {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  body: string[];
  accent: string;
}

export function Secretariat() {
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const { t } = useTranslation("home");
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
    { label: t("secretariatPage.nav.sg"), href: "#sg" },
    { label: t("secretariatPage.nav.events"), href: "#events" },
    { label: t("secretariatPage.nav.meetings"), href: "#meetings" },
    { label: t("secretariatPage.nav.advocacy"), href: "#advocacy" },
    { label: t("secretariatPage.nav.sustainability"), href: "#sustainability" },
    { label: t("secretariatPage.nav.publications"), href: "#publications" },
  ];

  const sections: SubSection[] = [
    {
      id: "sg",
      icon: Landmark,
      tag: t("secretariatPage.sg.tag"),
      title: t("secretariatPage.sg.title"),
      desc: t("secretariatPage.sg.desc"),
      body: t("secretariatPage.sg.body", { returnObjects: true }) as string[],
      accent: "#4E6132",
    },
    {
      id: "events",
      icon: CalendarDays,
      tag: t("secretariatPage.events.tag"),
      title: t("secretariatPage.events.title"),
      desc: t("secretariatPage.events.desc"),
      body: t("secretariatPage.events.body", { returnObjects: true }) as string[],
      accent: "#8B6543",
    },
    {
      id: "meetings",
      icon: Users,
      tag: t("secretariatPage.meetings.tag"),
      title: t("secretariatPage.meetings.title"),
      desc: t("secretariatPage.meetings.desc"),
      body: t("secretariatPage.meetings.body", { returnObjects: true }) as string[],
      accent: "#4E6132",
    },
    {
      id: "advocacy",
      icon: Megaphone,
      tag: t("secretariatPage.advocacy.tag"),
      title: t("secretariatPage.advocacy.title"),
      desc: t("secretariatPage.advocacy.desc"),
      body: t("secretariatPage.advocacy.body", { returnObjects: true }) as string[],
      accent: "#8B6543",
    },
    {
      id: "sustainability",
      icon: Leaf,
      tag: t("secretariatPage.sustainability.tag"),
      title: t("secretariatPage.sustainability.title"),
      desc: t("secretariatPage.sustainability.desc"),
      body: t("secretariatPage.sustainability.body", { returnObjects: true }) as string[],
      accent: "#4E6132",
    },
    {
      id: "publications",
      icon: BookOpen,
      tag: t("secretariatPage.publications.tag"),
      title: t("secretariatPage.publications.title"),
      desc: t("secretariatPage.publications.desc"),
      body: t("secretariatPage.publications.body", { returnObjects: true }) as string[],
      accent: "#8B6543",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-[75vh] lg:min-h-[85vh] flex items-end justify-start pb-16 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(78,97,50,0.45), rgba(78,97,50,0.88)), url('/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
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
            {t("secretariatPage.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-lg max-w-2xl leading-relaxed"
          >
            {t("secretariatPage.heroDesc")}
          </motion.p>
        </motion.div>
        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>

      {/* Sticky Sub-Nav */}
      <div className="bg-[#F5F5DC] border-b border-[#8B6543]/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-start lg:justify-center gap-2 lg:gap-3 overflow-x-auto h-16 lg:h-20 scrollbar-hide">
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
                {t("secretariatPage.introTag")}
              </span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5">
              {t("secretariatPage.introTitle")}
            </h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed">
              {t("secretariatPage.introDesc")}
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
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-4 border-[#4E6132]/20 shadow-xl">
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
                    {t("secretariatPage.sgProfile.role")}
                  </span>
                  <div className="h-px w-8 bg-[#8B6543]" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={sgVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="font-['Outfit'] font-black text-2xl lg:text-3xl text-[#4E6132] mt-1 mb-1"
                >
                  {t("secretariatPage.sgProfile.name")}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={sgVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-[#8B6543] font-semibold text-sm mb-4"
                >
                  {t("secretariatPage.sgProfile.title")}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={sgVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative"
                >
                  <Quote size={28} className="text-[#4E6132]/15 absolute -top-1 -left-1 hidden md:block" />
                  <p className="text-[#4A4A4A] leading-relaxed md:pl-7 italic">
                    {t("secretariatPage.sgProfile.quote")}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={sgVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start"
                >
                  <a
                    href="mailto:cprgs@cpr-rwanda.rw"
                    className="inline-flex items-center gap-2 text-sm text-[#4E6132] font-semibold hover:text-[#8B6543] transition-colors"
                  >
                    <Mail size={14} /> cprgs@cpr-rwanda.rw
                  </a>
                  <span className="text-[#4E6132]/20 hidden md:inline">|</span>
                  <a
                    href="tel:+250788314718"
                    className="inline-flex items-center gap-2 text-sm text-[#4E6132] font-semibold hover:text-[#8B6543] transition-colors"
                  >
                    <Phone size={14} /> +250 788 314 718
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </WatermarkSection>

      {/* Sections */}
      {sections.map((sec, i) => {
        const Icon = sec.icon;
        const isEven = i % 2 === 0;
        return <SectionBlock key={sec.id} sec={sec} Icon={Icon} isEven={isEven} index={i} />;
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
            {t("secretariatPage.cta.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
          >
            {t("secretariatPage.cta.desc")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-white/80 text-sm mb-8"
          >
            <span className="flex items-center gap-2"><Phone size={14} className="text-[#EAD196]" /> +250 788 314 718</span>
            <span className="flex items-center gap-2"><Mail size={14} className="text-[#EAD196]" /> cprgs@cpr-rwanda.rw</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-[#EAD196]" /> KG 2 Av 4, B.P 79, Kigali</span>
          </motion.div>
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#EAD196] text-[#4E6132] font-bold px-8 py-3.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105"
          >
            {t("secretariatPage.cta.btn")} <ArrowRight size={16} />
          </motion.a>
        </div>
      </motion.section>
    </main>
  );
}

function SectionBlock({ sec, Icon, isEven, index }: { sec: SubSection; Icon: LucideIcon; isEven: boolean; index: number }) {
  const { ref, visible } = useScrollReveal();

  return (
    <WatermarkSection
      id={sec.id}
      className={`py-20 lg:py-28 scroll-mt-32 ${isEven ? "bg-white" : "bg-[#F8F9F4]"}`}
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            !isEven ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2">
              <div className="h-px w-8 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{sec.tag}</span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-4">{sec.title}</h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed mb-6">{sec.desc}</p>
            <ul className="space-y-3">
              {sec.body.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.08, ease: "easeOut" }}
                  className="flex items-start gap-3 text-[#4A4A4A]"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={visible ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.15 + idx * 0.08, type: "spring", stiffness: 300 }}
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sec.accent }}
                  />
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: isEven ? 10 : -10 }}
            animate={visible ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex justify-center"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ scale: 1.03, rotateY: 3 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-full max-w-sm aspect-square rounded-3xl flex flex-col items-center justify-center gap-6 shadow-xl cursor-default"
              style={{ backgroundColor: sec.accent }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={visible ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 200 }}
              >
                <Icon size={72} color="white" strokeWidth={1.2} />
              </motion.div>
              <span className="font-['Outfit'] font-black text-2xl text-white text-center px-8 leading-tight">
                {sec.title}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </WatermarkSection>
  );
}
