import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import {
  Crown, GraduationCap, Handshake, Coins, Heart, Scale, Radio,
  Phone, Mail, MapPin, ArrowRight, CheckCircle2, Building2, type LucideIcon
} from "lucide-react";

interface DepartmentSection {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  body: string[];
  accent: string;
  image: string;
}

const deptImages: Record<string, string> = {
  gs: "/assets/cpr-members.webp",
  bnep: "/assets/education.webp",
  diakonia: "/assets/handover.webp",
  finance: "/assets/autorites.webp",
  youth: "/assets/Youth2.webp",
  gender: "/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp",
  radio: "/assets/radio-studio.webp",
};

const deptStats: Record<string, { label: string; value: string }[]> = {
  gs: [
    { label: "Member Churches", value: "25+" },
    { label: "Years Established", value: "1963" },
    { label: "Staff Members", value: "50+" },
  ],
  bnep: [
    { label: "Primary Schools", value: "595+" },
    { label: "Students Reached", value: "300K+" },
    { label: "Teachers Trained", value: "1,200+" },
  ],
  diakonia: [
    { label: "Churches Supported", value: "20+" },
    { label: "Counselors Certified", value: "200+" },
    { label: "Programs Active", value: "6+" },
  ],
  finance: [
    { label: "Donor Partners", value: "10+" },
    { label: "Years Operating", value: "60+" },
    { label: "Audit Rating", value: "AAA" },
  ],
  youth: [
    { label: "Youth Reached", value: "10,000+" },
    { label: "Annual Summits", value: "1" },
    { label: "Leadership Camps", value: "5+" },
  ],
  gender: [
    { label: "Women Empowered", value: "5,000+" },
    { label: "GBV Trainings", value: "100+" },
    { label: "Cooperatives", value: "25+" },
  ],
  radio: [
    { label: "FM Frequency", value: "107.1" },
    { label: "Broadcasting Since", value: "2005" },
    { label: "Daily Listeners", value: "1M+" },
  ],
};

export function Departments() {
  const [activeSection, setActiveSection] = useState("");
  const [overviewVisible, setOverviewVisible] = useState(false);
  const location = useLocation();
  const { t } = useTranslation("home");
  const { ref: introRef, visible: introVisible } = useScrollReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!overviewRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setOverviewVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(overviewRef.current);
    return () => observer.disconnect();
  }, []);

  const dp = t("departmentsPage", { returnObjects: true }) as Record<string, unknown>;

  const navLinks = [
    { label: (dp?.nav as Record<string, string>)?.gs ?? "General Secretary", href: "#gs" },
    { label: (dp?.nav as Record<string, string>)?.bnep ?? "Education/BNEP", href: "#bnep" },
    { label: (dp?.nav as Record<string, string>)?.diakonia ?? "Diakonia", href: "#diakonia" },
    { label: (dp?.nav as Record<string, string>)?.finance ?? "Finance", href: "#finance" },
    { label: (dp?.nav as Record<string, string>)?.youth ?? "Youth", href: "#youth" },
    { label: (dp?.nav as Record<string, string>)?.gender ?? "Gender", href: "#gender" },
    { label: (dp?.nav as Record<string, string>)?.radio ?? "Radio", href: "#radio" },
  ];

  const deptKeys = ["gs", "bnep", "diakonia", "finance", "youth", "gender", "radio"] as const;
  const icons: LucideIcon[] = [Crown, GraduationCap, Handshake, Coins, Heart, Scale, Radio];

  const sections: DepartmentSection[] = deptKeys.map((key, i) => {
    const deptData = (dp?.[key] as Record<string, unknown>) ?? {};
    return {
      id: key,
      icon: icons[i],
      tag: (deptData?.tag as string) ?? "",
      title: (deptData?.title as string) ?? "",
      desc: (deptData?.desc as string) ?? "",
      body: (deptData?.body as string[]) ?? [],
      accent: i % 2 === 0 ? "#4E6132" : "#8B6543",
      image: deptImages[key] ?? "",
    };
  });

  const cta = (dp?.cta as Record<string, string>) ?? {};

  return (
    <main className="bg-white">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-[75vh] lg:min-h-[85vh] flex items-end justify-start pb-16 lg:pb-20 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(78,97,50,0.45), rgba(78,97,50,0.88)), url('/assets/departments-hero.webp')",
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
            {(dp?.heroTitle as string) ?? "Our Departments"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-lg max-w-2xl leading-relaxed"
          >
            {(dp?.heroDesc as string) ?? ""}
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

      {/* Intro Section */}
      <WatermarkSection className="py-16 lg:py-20 bg-white">
        <div ref={introRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={introVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center gap-2">
                <div className="h-px w-8 bg-[#8B6543]" />
                <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                  {(dp?.introTag as string) ?? ""}
                </span>
                <div className="h-px w-8 bg-[#8B6543]" />
              </div>
              <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5">
                {(dp?.introTitle as string) ?? ""}
              </h2>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                {(dp?.introDesc as string) ?? ""}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={introVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#4E6132]/5 rounded-3xl p-8 border border-[#4E6132]/10">
                <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-lg mb-4 flex items-center gap-2">
                  <Building2 size={20} /> Quick Facts
                </h3>
                <ul className="space-y-3">
                  {[
                    "7 specialized departments serving all provinces",
                    "595+ Protestant primary schools nationwide",
                    "200+ certified trauma counselors across Rwanda",
                    "10,000+ youth reached through annual programs",
                    "5,000+ women empowered through gender initiatives",
                    "107.1 FM — broadcasting hope since 2005",
                  ].map((fact, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={introVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-3 text-sm text-[#4A4A4A]"
                    >
                      <CheckCircle2 size={16} className="text-[#4E6132] mt-0.5 flex-shrink-0" />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </WatermarkSection>

      {/* Department Overview Cards Grid */}
      <div ref={overviewRef} className="py-20 lg:py-24 bg-[#F8F9F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={overviewVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132]">
              Explore Our Departments
            </h2>
            <p className="text-[#4A4A4A] mt-3 max-w-xl mx-auto">
              Click any department to jump to its detailed section below
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {sections.map((sec, i) => {
              const Icon = sec.icon;
              const statData = deptStats[sec.id]?.[0];
              return (
                <motion.a
                  key={sec.id}
                  href={`#${sec.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={overviewVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#4E6132]/20 flex flex-col items-center text-center gap-3 cursor-pointer hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: `${sec.accent}15`, color: sec.accent }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="font-['Outfit'] font-bold text-sm text-[#4E6132] leading-tight">
                    {sec.title}
                  </span>
                  {statData && (
                    <div className="text-xs text-[#8B6543] font-semibold mt-auto">
                      {statData.value} {statData.label}
                    </div>
                  )}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Department Sections */}
      {sections.map((sec, i) => {
        const isEven = i % 2 === 0;
        return (
          <DepartmentDetailBlock
            key={sec.id}
            sec={sec}
            stats={deptStats[sec.id] ?? []}
            isEven={isEven}
            index={i}
          />
        );
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
            {(cta?.title as string) ?? "Partner with Our Departments"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
          >
            {(cta?.desc as string) ?? ""}
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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[#EAD196] text-[#4E6132] font-bold px-8 py-3.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105"
            >
              {(cta?.btn as string) ?? "Contact Us"} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}

/* ─── Department Detail Block ─── */
function DepartmentDetailBlock({
  sec,
  stats,
  isEven,
  index,
}: {
  sec: DepartmentSection;
  stats: { label: string; value: string }[];
  isEven: boolean;
  index: number;
}) {
  const { ref, visible } = useScrollReveal();
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
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                    className="bg-white rounded-xl p-3.5 text-center shadow-sm border border-[#4E6132]/5"
                  >
                    <div
                      className="text-lg font-black"
                      style={{ color: sec.accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#4A4A4A]/60 uppercase tracking-wider mt-0.5">
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
                  <span className="leading-relaxed">{item}</span>
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
            <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[4/3]" style={{ backgroundColor: `${sec.accent}20` }}>
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
              {/* Badge */}
              <div className="absolute bottom-4 left-4">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <Icon size={14} style={{ color: sec.accent }} />
                  <span
                    className="text-xs font-bold"
                    style={{ color: sec.accent }}
                  >
                    {sec.tag}
                  </span>
                </div>
              </div>
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
      {index < 6 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#4E6132]/10 to-transparent" />
        </div>
      )}
    </section>
  );
}
