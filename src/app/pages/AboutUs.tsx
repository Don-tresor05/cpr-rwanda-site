import { useLocation, Link } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { useTranslation } from "react-i18next";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { useAboutPage } from "../data/pageContent";

export function AboutUs() {
  const [activeSection, setActiveSection] = useState("");
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const location = useLocation();
  const { ref: visionRef, visible: visionVisible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cms = useAboutPage();

  // Scroll to hash on mount or when hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50); // slight delay to allow rendering
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => observer.observe(sec));

    return () => sections.forEach(sec => observer.unobserve(sec));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (historyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [historyModalOpen]);

  // Hide scroll indicator once user scrolls past the hero
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: cms?.nav?.whoWeAre ?? t("aboutPage.nav.whoWeAre"), href: "#who-we-are" },
    { label: cms?.nav?.visionMission ?? t("aboutPage.nav.visionMission"), href: "#vision-mission" },
    { label: cms?.nav?.coreValues ?? t("aboutPage.nav.coreValues"), href: "#core-values" },
    { label: cms?.nav?.execCommittee ?? t("aboutPage.nav.execCommittee"), href: "#executive-committee" },
    { label: cms?.nav?.organigram ?? t("aboutPage.nav.organigram"), href: "#organigram" },
    { label: cms?.nav?.ourPartners ?? t("aboutPage.nav.ourPartners"), href: "#our-partners" },
  ];

  const coreValuesItems =
    cms?.coreValues?.items?.length
      ? cms.coreValues.items
      : (t("aboutPage.coreValues.items", { returnObjects: true }) as { title: string; desc: string }[]) || [];

  return (
    <main className="bg-white">
      {/* Hero */}
      <div
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 px-6 lg:px-12 text-white bg-[#4E6132]"
        style={{
          backgroundImage: "linear-gradient(rgba(78,97,50,0.4), rgba(78,97,50,0.85)), url('/assets/CPR 3 - Copy.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 5%"
        }}
      >
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <h1 className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md">
            {cms?.heroTitle ?? t("aboutPage.heroTitle")}
          </h1>
        </div>
        {!scrolledPastHero && !historyModalOpen && <ScrollIndicator />}
      </div>

      {/* Sub-Navigation */}
      <div data-sticky-subnav className="bg-[#F5F5DC] border-b border-[#8B6543]/10 sticky top-0 z-50 shadow-md transition-all duration-300">
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
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* About */}
      <section id="who-we-are" className="py-16 lg:py-24 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Full Logo */}
            <div className="flex justify-center md:justify-start md:col-span-5 lg:col-span-4">
              <img src="/assets/logo.png" alt="CPR Rwanda Full Logo" className="w-64 md:w-72 lg:w-80 object-contain drop-shadow-xl" />
            </div>

            {/* Right side: Text Content */}
            <div className="md:col-span-7 lg:col-span-8">
              <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-6">
                {cms?.whoWeAre?.title ?? t("aboutPage.whoWeAre.title")}
              </h2>
              <div className="text-[#4A4A4A] text-lg leading-relaxed space-y-4">
                <p>{cms?.whoWeAre?.p1 ?? t("aboutPage.whoWeAre.p1")}</p>
                <p>{cms?.whoWeAre?.p2 ?? t("aboutPage.whoWeAre.p2")}</p>
              </div>

              <button
                onClick={() => setHistoryModalOpen(true)}
                className="inline-flex items-center gap-2 mt-6 text-[#4E6132] font-bold text-sm hover:text-[#8B6543] transition-colors group"
              >
                {cms?.historyModal?.learnMore ?? t("aboutPage.historyModal.learnMore")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <WatermarkSection id="vision-mission" className="pt-16 lg:pt-20 pb-20 lg:pb-24 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
              {cms?.visionMission?.title ?? t("aboutPage.visionMission.title")}
            </h2>
          </div>

          <div ref={visionRef} className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={visionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group bg-[#F8F9FA] border border-[#4E6132]/10 rounded-2xl p-8 lg:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#4E6132] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {cms?.visionMission?.visionTag ?? t("aboutPage.visionMission.visionTag")}
              </span>
              <h3 className="font-['Outfit'] font-black text-2xl text-[#4E6132] mt-2 mb-4">
                {cms?.visionMission?.visionSub ?? t("aboutPage.visionMission.visionSub")}
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed">
                {cms?.visionMission?.visionDesc ?? t("aboutPage.visionMission.visionDesc")}
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={visionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="group bg-[#F8F9FA] border border-[#4E6132]/10 rounded-2xl p-8 lg:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#BC8A5F] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {cms?.visionMission?.missionTag ?? t("aboutPage.visionMission.missionTag")}
              </span>
              <h3 className="font-['Outfit'] font-black text-2xl text-[#4E6132] mt-2 mb-4">
                {cms?.visionMission?.missionSub ?? t("aboutPage.visionMission.missionSub")}
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed">
                {cms?.visionMission?.missionDesc ?? t("aboutPage.visionMission.missionDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </WatermarkSection>

      {/* Model */}
      <WatermarkSection className="pt-16 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
              {cms?.model?.title ?? t("aboutPage.model.title")}
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto mt-4 leading-relaxed">
              {cms?.model?.desc ?? t("aboutPage.model.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-[#4E6132]/15" />

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#4E6132] flex items-center justify-center mb-6 relative z-10 shadow-md">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest mb-2">
                {cms?.model?.step1Tag ?? t("aboutPage.model.step1Tag")}
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">
                {cms?.model?.step1Title ?? t("aboutPage.model.step1Title")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {cms?.model?.step1Desc ?? t("aboutPage.model.step1Desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#BC8A5F] flex items-center justify-center mb-6 relative z-10 shadow-md">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest mb-2">
                {cms?.model?.step2Tag ?? t("aboutPage.model.step2Tag")}
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">
                {cms?.model?.step2Title ?? t("aboutPage.model.step2Title")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {cms?.model?.step2Desc ?? t("aboutPage.model.step2Desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#4E6132] flex items-center justify-center mb-6 relative z-10 shadow-md">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest mb-2">
                {cms?.model?.step3Tag ?? t("aboutPage.model.step3Tag")}
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">
                {cms?.model?.step3Title ?? t("aboutPage.model.step3Title")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {cms?.model?.step3Desc ?? t("aboutPage.model.step3Desc")}
              </p>
            </div>
          </div>
        </div>
      </WatermarkSection>

      {/* Values */}
      <section id="core-values" className="py-20 bg-[#4E6132] scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-10">
            {cms?.coreValues?.title ?? t("aboutPage.coreValues.title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValuesItems.map((val, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white hover:bg-white/10 transition-colors">
                <h3 className="font-['Outfit'] font-bold text-xl text-[#EAD196] mb-3">{val.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="executive-committee" className="py-20 bg-[#F8F9FA] scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-4">
              {cms?.execCommittee?.title ?? t("aboutPage.execCommittee.title")}
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              {cms?.execCommittee?.desc ?? t("aboutPage.execCommittee.desc")}
            </p>
          </div>
          {/* Board Members */}
          <div className="mb-8">
            <h3 className="font-['Outfit'] font-bold text-2xl text-[#8B6543] mb-8 text-center lg:text-left border-b border-[#8B6543]/20 pb-3">
              {cms?.execCommittee?.boardMembers ?? t("aboutPage.execCommittee.boardMembers")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                { name: "Samuel Mutabazi", role: "", img: "/assets/Mutabazi_Samuel.webp" },
                { name: "Jael", role: "", img: "/assets/Jael.webp" },
                { name: "Peter Mukunzi", role: "", img: "/assets/Mukunzi Peter.jpg" },
                { name: "Joselyne Iragena", role: "", img: "/assets/IRAGENA Joselyne.webp" },
                { name: t("aboutPage.execCommittee.bnepRep"), role: t("aboutPage.execCommittee.bnepRep"), img: "/assets/BNEP Representative.webp" },
              ].map((member, i) => (
                <div key={i} className="bg-white rounded-none overflow-hidden border border-[#4E6132]/10 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                  <div className="h-[3px] bg-[#8B6543]/80 w-full shrink-0" />
                  <div className="relative w-full aspect-[4/5] bg-[#EDF1F7] flex items-center justify-center overflow-hidden shrink-0">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full bg-[#E5E9F0] flex flex-col items-center justify-center text-[#8B6543]/40">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-left bg-white grow flex flex-col justify-center">
                    <h3 className="font-['Outfit'] font-black text-[#4E6132] text-base mb-5 leading-tight">
                      {member.name || (cms?.execCommittee?.defaultName ?? t("aboutPage.execCommittee.defaultName"))}
                    </h3>
                    <span className="text-[#8B6543] text-xs font-semibold">
                      {member.role || (cms?.execCommittee?.defaultRole ?? t("aboutPage.execCommittee.defaultRole"))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-2xl text-[#8B6543] mb-8 text-center lg:text-left border-b border-[#8B6543]/20 pb-3">
              {cms?.execCommittee?.staff ?? t("aboutPage.execCommittee.staff")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "Eric Mugwaneza", role: "", img: "/assets/MUGWANEZA Eric.webp" },
                { name: "Anne Marie", role: "", img: "/assets/Anne Marie PP.webp" },
                { name: "Felicien", role: "", img: "/assets/Sec Photo.webp" },
                { name: t("aboutPage.execCommittee.staffMember"), role: "", img: "/assets/Passport ed.png" },
              ].map((member, i) => (
                <div key={i} className="bg-white rounded-none overflow-hidden border border-[#4E6132]/10 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                  <div className="h-[3px] bg-[#8B6543]/80 w-full shrink-0" />
                  <div className="relative w-full aspect-[4/5] bg-[#EDF1F7] flex items-center justify-center overflow-hidden shrink-0">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full bg-[#E5E9F0] flex flex-col items-center justify-center text-[#8B6543]/40">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-left bg-white grow flex flex-col justify-center">
                    <h3 className="font-['Outfit'] font-black text-[#4E6132] text-base mb-5 leading-tight">
                      {member.name || (cms?.execCommittee?.defaultName ?? t("aboutPage.execCommittee.defaultName"))}
                    </h3>
                    <span className="text-[#8B6543] text-xs font-semibold">
                      {member.role || (cms?.execCommittee?.defaultRole ?? t("aboutPage.execCommittee.defaultRole"))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organigram */}
      <WatermarkSection id="organigram" className="py-20 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-12">
            {cms?.organigram?.title ?? t("aboutPage.organigram.title")}
          </h2>
          <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-[#F8F9FA] border border-[#8B6543]/20 rounded-2xl flex items-center justify-center text-[#8B6543] font-bold shadow-inner">
            {cms?.organigram?.comingSoon ?? t("aboutPage.organigram.comingSoon")}
          </div>
        </div>
      </WatermarkSection>

      {/* Partners */}
      <section id="our-partners" className="py-16 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132] mb-10">
            {cms?.partners?.title ?? t("aboutPage.partners.title")}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">WCC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">AACC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">FECLAC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">CBF</div>
          </div>
        </div>
      </section>
      {/* History Modal */}
      <AnimatePresence>
        {historyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-8"
            onClick={() => setHistoryModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl relative"
            >
              {/* Close button */}
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#4E6132]/5 hover:bg-[#4E6132]/10 flex items-center justify-center text-[#4E6132] transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="p-6 lg:p-8">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#8B6543]" />
                  <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                    {cms?.historyModal?.badge ?? t("aboutPage.historyModal.badge")}
                  </span>
                  <div className="h-px w-8 bg-[#8B6543]" />
                </div>
                <h2 className="font-['Outfit'] font-black text-2xl lg:text-3xl text-[#4E6132] mt-2 mb-4">
                  {cms?.historyModal?.title ?? t("aboutPage.historyModal.title")}
                </h2>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                  {/* Text content */}
                  <div className="md:col-span-2 text-[#4A4A4A] leading-relaxed space-y-4">
                    <p>
                      {cms?.historyModal?.p1 ?? t("aboutPage.historyModal.p1")}
                    </p>
                    <p>
                      {cms?.historyModal?.p2 ?? t("aboutPage.historyModal.p2")}
                    </p>
                  </div>

                  {/* Image + caption */}
                  <div className="md:col-span-1">
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-[#4E6132]/10">
                      <img
                        src="/assets/Mutabazi_Samuel.webp"
                        alt="Rev. Samuel Mutabazi"
                        className="w-full aspect-[4/5] object-cover object-top"
                      />
                    </div>
                    <p className="text-center mt-3">
                      <span className="block font-['Outfit'] font-bold text-[#4E6132] text-sm">
                        {cms?.historyModal?.personName ?? t("aboutPage.historyModal.personName")}
                      </span>
                      <span className="block text-[#8B6543] text-xs font-semibold mt-0.5">
                        {cms?.historyModal?.personRole ?? t("aboutPage.historyModal.personRole")}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Learn More -> Departments */}
                <div className="mt-4 pt-4 border-t border-[#4E6132]/10">
                  <Link
                    to="/departments"
                    onClick={() => setHistoryModalOpen(false)}
                    className="inline-flex items-center gap-2 bg-[#4E6132] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#3b4b26] transition-all duration-300 hover:scale-105 text-sm"
                  >
                    {cms?.historyModal?.cta ?? t("aboutPage.historyModal.cta")} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

