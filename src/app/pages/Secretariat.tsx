import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import {
  Landmark, CalendarDays, Megaphone, Leaf, BookOpen, Users,
  Phone, Mail, MapPin, ArrowRight, Quote, type LucideIcon
} from "lucide-react";

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
        className="relative min-h-[75vh] lg:min-h-[89vh] flex items-end justify-start pb-16 px-6 lg:px-12 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(78,97,50,0.45), rgba(78,97,50,0.88)), url('/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <span className="inline-block text-[#EAD196] text-sm font-semibold uppercase tracking-widest mb-4">
            {t("secretariatPage.heroTag")}
          </span>
          <h1 className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md mb-4">
            {t("secretariatPage.heroTitle")}
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            {t("secretariatPage.heroDesc")}
          </p>
        </div>
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
      <div ref={introRef} className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
              {t("secretariatPage.introTag")}
            </span>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5">
              {t("secretariatPage.introTitle")}
            </h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed">
              {t("secretariatPage.introDesc")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Secretary General Profile */}
      <div ref={sgRef} className="pb-16 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sgVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-[#F8F9F4] border border-[#4E6132]/10 rounded-3xl p-8 lg:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-4 border-[#4E6132]/20 shadow-xl">
                  <img
                    src="/assets/Mutabazi_Samuel.webp"
                    alt="Rev. Samuel Mutabazi"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                  {t("secretariatPage.sgProfile.role")}
                </span>
                <h3 className="font-['Outfit'] font-black text-2xl lg:text-3xl text-[#4E6132] mt-1 mb-1">
                  {t("secretariatPage.sgProfile.name")}
                </h3>
                <p className="text-[#8B6543] font-semibold text-sm mb-4">
                  {t("secretariatPage.sgProfile.title")}
                </p>
                <div className="relative">
                  <Quote size={28} className="text-[#4E6132]/15 absolute -top-1 -left-1 hidden md:block" />
                  <p className="text-[#4A4A4A] leading-relaxed md:pl-7 italic">
                    {t("secretariatPage.sgProfile.quote")}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
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
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((sec, i) => {
        const Icon = sec.icon;
        const isEven = i % 2 === 0;
        return <SectionBlock key={sec.id} sec={sec} Icon={Icon} isEven={isEven} />;
      })}

      {/* Contact CTA */}
      <section className="py-20 bg-[#4E6132]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-4">
            {t("secretariatPage.cta.title")}
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            {t("secretariatPage.cta.desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm mb-8">
            <span className="flex items-center gap-2"><Phone size={14} className="text-[#EAD196]" /> +250 788 314 718</span>
            <span className="flex items-center gap-2"><Mail size={14} className="text-[#EAD196]" /> cprgs@cpr-rwanda.rw</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-[#EAD196]" /> KG 2 Av 4, B.P 79, Kigali</span>
          </div>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#EAD196] text-[#4E6132] font-bold px-8 py-3.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105"
          >
            {t("secretariatPage.cta.btn")} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

function SectionBlock({ sec, Icon, isEven }: { sec: SubSection; Icon: LucideIcon; isEven: boolean }) {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id={sec.id}
      className={`py-20 lg:py-28 scroll-mt-32 ${isEven ? "bg-white" : "bg-[#F8F9F4]"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            !isEven ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{sec.tag}</span>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-4">{sec.title}</h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed mb-6">{sec.desc}</p>
            <ul className="space-y-3">
              {sec.body.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#4A4A4A]">
                  <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sec.accent }} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div
              className="w-full max-w-sm aspect-square rounded-3xl flex flex-col items-center justify-center gap-6 shadow-xl"
              style={{ backgroundColor: sec.accent }}
            >
              <Icon size={72} color="white" strokeWidth={1.2} />
              <span className="font-['Outfit'] font-black text-2xl text-white text-center px-8 leading-tight">
                {sec.title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
