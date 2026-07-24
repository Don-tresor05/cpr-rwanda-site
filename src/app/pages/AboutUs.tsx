import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function AboutUs() {
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const { ref: visionRef, visible: visionVisible } = useScrollReveal();
  const { t } = useTranslation("home");

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

  const navLinks = [
    { label: t("aboutPage.nav.whoWeAre"), href: "#who-we-are" },
    { label: t("aboutPage.nav.visionMission"), href: "#vision-mission" },
    { label: t("aboutPage.nav.coreValues"), href: "#core-values" },
    { label: t("aboutPage.nav.execCommittee"), href: "#executive-committee" },
    { label: t("aboutPage.nav.organigram"), href: "#organigram" },
    { label: t("aboutPage.nav.ourPartners"), href: "#our-partners" },
  ];

  const coreValuesItems = (t("aboutPage.coreValues.items", { returnObjects: true }) as { title: string; desc: string }[]) || [];

  return (
    <main className="bg-white">
      {/* Hero */}
      <div
        className="relative min-h-[75vh] lg:min-h-[85vh] flex items-end justify-start pb-16 px-6 lg:px-12 text-white bg-[#4E6132]"
        style={{
          backgroundImage: "linear-gradient(rgba(78,97,50,0.4), rgba(78,97,50,0.85)), url('/assets/CPR 3 - Copy.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 15%"
        }}
      >
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <h1 className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md">
            {t("aboutPage.heroTitle")}
          </h1>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="bg-[#F5F5DC] border-b border-[#8B6543]/10 sticky top-0 z-50 shadow-md transition-all duration-300">
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
                {t("aboutPage.whoWeAre.title")}
              </h2>
              <div className="text-[#4A4A4A] text-lg leading-relaxed space-y-4">
                <p>{t("aboutPage.whoWeAre.p1")}</p>
                <p>{t("aboutPage.whoWeAre.p2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section id="vision-mission" className="pt-2 pb-20 lg:pb-24 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
              {t("aboutPage.visionMission.title")}
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
                {t("aboutPage.visionMission.visionTag")}
              </span>
              <h3 className="font-['Outfit'] font-black text-2xl text-[#4E6132] mt-2 mb-4">
                {t("aboutPage.visionMission.visionSub")}
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed">
                {t("aboutPage.visionMission.visionDesc")}
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
                {t("aboutPage.visionMission.missionTag")}
              </span>
              <h3 className="font-['Outfit'] font-black text-2xl text-[#4E6132] mt-2 mb-4">
                {t("aboutPage.visionMission.missionSub")}
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed">
                {t("aboutPage.visionMission.missionDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Model */}
      <section className="pt-16 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">
              {t("aboutPage.model.title")}
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto mt-4 leading-relaxed">
              {t("aboutPage.model.desc")}
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
                {t("aboutPage.model.step1Tag")}
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">
                {t("aboutPage.model.step1Title")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {t("aboutPage.model.step1Desc")}
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
                {t("aboutPage.model.step2Tag")}
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">
                {t("aboutPage.model.step2Title")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {t("aboutPage.model.step2Desc")}
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
                {t("aboutPage.model.step3Tag")}
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-3">
                {t("aboutPage.model.step3Title")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {t("aboutPage.model.step3Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="core-values" className="py-20 bg-[#4E6132] scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-10">
            {t("aboutPage.coreValues.title")}
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
              {t("aboutPage.execCommittee.title")}
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              {t("aboutPage.execCommittee.desc")}
            </p>
          </div>
          {/* Board Members */}
          <div className="mb-8">
            <h3 className="font-['Outfit'] font-bold text-2xl text-[#8B6543] mb-8 text-center lg:text-left border-b border-[#8B6543]/20 pb-3">
              {t("aboutPage.execCommittee.boardMembers")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "Samuel Mutabazi", role: "", img: "/assets/Mutabazi_Samuel.webp" },
                { name: "Jael", role: "", img: "/assets/Jael.webp" },
                { name: "Peter Mukunzi", role: "", img: "/assets/Mukunzi Peter.jpg" },
                { name: "Joselyne Iragena", role: "", img: "/assets/IRAGENA Joselyne.webp" },
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
                      {member.name || t("aboutPage.execCommittee.defaultName")}
                    </h3>
                    <span className="text-[#8B6543] text-xs font-semibold">
                      {member.role || t("aboutPage.execCommittee.defaultRole")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-2xl text-[#8B6543] mb-8 text-center lg:text-left border-b border-[#8B6543]/20 pb-3">
              {t("aboutPage.execCommittee.staff")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "Eric Mugwaneza", role: "", img: "/assets/MUGWANEZA Eric.webp" },
                { name: "Name", role: "", img: "/assets/Passport ed.png" },
                { name: "Felicien", role: "", img: "/assets/Sec Photo.webp" },
                { name: "", role: "", img: "" },
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
                      {member.name || t("aboutPage.execCommittee.defaultName")}
                    </h3>
                    <span className="text-[#8B6543] text-xs font-semibold">
                      {member.role || t("aboutPage.execCommittee.defaultRole")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organigram */}
      <section id="organigram" className="py-20 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-12">
            {t("aboutPage.organigram.title")}
          </h2>
          <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-[#F8F9FA] border border-[#8B6543]/20 rounded-2xl flex items-center justify-center text-[#8B6543] font-bold shadow-inner">
            {t("aboutPage.organigram.comingSoon")}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="our-partners" className="py-16 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132] mb-10">
            {t("aboutPage.partners.title")}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">WCC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">AACC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">FECLAC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">CBF</div>
          </div>
        </div>
      </section>
    </main>
  );
}

