import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown, ChevronRight, ArrowRight, Phone, Mail,
  MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin,
  Radio, BookOpen, Heart, Users, Megaphone, GraduationCap,
  Globe, Shield, Star, PlayCircle, Quote, ExternalLink
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  children?: {
    heading?: string;
    links: { label: string; href: string; desc?: string }[];
  }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  {
    label: "About Us",
    href: "#about",
    children: [
      {
        heading: "Organization",
        links: [
          { label: "Who We Are", href: "#who", desc: "Founded in 1963, uniting Rwanda's Protestant churches" },
          { label: "Vision & Mission", href: "#vision", desc: "Our guiding principles and long-term goals" },
          { label: "Core Values", href: "#values", desc: "Faith, unity, service, and transformation" },
        ],
      },
      {
        heading: "Leadership",
        links: [
          { label: "Executive Committee", href: "#exec", desc: "Board of directors and governance structure" },
          { label: "Organigram", href: "#org", desc: "Organizational structure and departments" },
        ],
      },
      {
        heading: "Partnerships",
        links: [
          { label: "Our Partners", href: "#partners", desc: "National and international partner organizations" },
        ],
      },
    ],
  },
  {
    label: "Secretariat",
    href: "#secretariat",
    children: [
      {
        heading: "General Secretariat",
        links: [
          { label: "SG Office", href: "#sg", desc: "Office of the Secretary General" },
          { label: "CPR Events", href: "#events", desc: "Conferences, synods, and assemblies" },
          { label: "Advocacy", href: "#advocacy", desc: "Policy engagement and civic leadership" },
          { label: "Sustainability", href: "#sustain", desc: "Environmental and institutional sustainability" },
        ],
      },
      {
        heading: "Publications",
        links: [
          { label: "SG Publications", href: "#publications", desc: "Reports, newsletters, and communiqués" },
        ],
      },
    ],
  },
  {
    label: "Departments",
    href: "#departments",
    children: [
      {
        heading: "Education (BNEP)",
        links: [
          { label: "Protestant Education Bureau", href: "#bnep", desc: "Managing 595 primary schools across Rwanda" },
          { label: "Active Pedagogy (PAP)", href: "#pap", desc: "Modern participatory teaching methods" },
          { label: "Education Partners", href: "#edu-partners", desc: "Partners supporting education programs" },
        ],
      },
      {
        heading: "Gender & Health",
        links: [
          { label: "Fight Against GBV", href: "#gbv", desc: "Gender-based violence prevention and response" },
          { label: "Trauma Counseling", href: "#trauma", desc: "Post-genocide healing and reconciliation" },
          { label: "HIV/AIDS Awareness", href: "#hiv", desc: "Community health education programs" },
        ],
      },
      {
        heading: "Evangelism",
        links: [
          { label: "Youth Projects", href: "#youth", desc: "Empowering Rwanda's next generation" },
          { label: "Evangelism Centers", href: "#centers", desc: "Outreach and church planting" },
        ],
      },
    ],
  },
  {
    label: "Radio Inkoramutima",
    href: "#radio",
    children: [
      {
        heading: "Radio Station",
        links: [
          { label: "About the Radio", href: "#radio-about", desc: "107.1 FM — Voice of the Heart" },
          { label: "Editorial Line", href: "#editorial", desc: "Evangelization, unity & development" },
          { label: "Programs & Activities", href: "#programs", desc: "Schedule, shows, and podcasts" },
        ],
      },
    ],
  },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format",
    label: "Serving Rwanda Since 1963",
    title: "Bose Babe Umwe",
    subtitle: "That All of Them May Be One",
    desc: "Uniting 19 Protestant member churches to serve Rwanda's communities through faith, education, health, and sustainable development.",
    cta: "Explore Our Mission",
    ctaSecondary: "Meet Our Team",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=1080&fit=crop&auto=format",
    label: "Education Department (BNEP)",
    title: "Shaping Rwanda's Future",
    subtitle: "595 Protestant Primary Schools",
    desc: "The Bureau National de l'Éducation Protestante oversees quality education across Rwanda, empowering 300,000+ learners every year.",
    cta: "Learn About BNEP",
    ctaSecondary: "View Statistics",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&auto=format",
    label: "Radio Inkoramutima",
    title: "Voice of the Heart",
    subtitle: "107.1 FM — Broadcasting Hope",
    desc: "Radio Inkoramutima — 'Voice of the Heart' — reaches communities across Rwanda with messages of faith, unity, and holistic development.",
    cta: "Listen Live",
    ctaSecondary: "Program Guide",
  },
];

const STATS = [
  { value: 19, label: "Member Churches", suffix: "", icon: Users },
  { value: 595, label: "Primary Schools", suffix: "+", icon: GraduationCap },
  { value: 107.1, label: "FM Frequency", suffix: " FM", icon: Radio },
  { value: 60, label: "Years of Service", suffix: "+", icon: Star },
];

const DEPARTMENTS = [
  {
    icon: GraduationCap,
    title: "Education (BNEP)",
    desc: "The Protestant Education Bureau manages 595 primary schools, implementing modern pedagogy to transform learning outcomes for thousands of Rwandan children.",
    color: "bg-blue-50",
    accent: "#0F2C59",
    link: "#departments",
  },
  {
    icon: Heart,
    title: "Gender & Health",
    desc: "Combating gender-based violence, providing trauma counseling for genocide survivors, empowering women, and raising HIV/AIDS awareness across communities.",
    color: "bg-amber-50",
    accent: "#B8860B",
    link: "#departments",
  },
  {
    icon: Megaphone,
    title: "Evangelism & Communication",
    desc: "Youth empowerment projects, Christian education programs, and strategic evangelism centers spreading the Gospel across Rwanda's hills and valleys.",
    color: "bg-emerald-50",
    accent: "#065F46",
    link: "#departments",
  },
  {
    icon: Globe,
    title: "Advocacy & Sustainability",
    desc: "Engaging policymakers, championing human rights, and building institutional resilience to ensure CPR's impact endures for future generations.",
    color: "bg-purple-50",
    accent: "#4C1D95",
    link: "#departments",
  },
];

const NEWS = [
  {
    date: "June 28, 2025",
    category: "Event",
    title: "Kwibuka 31 Memorial Commemoration at Gahini Diocese",
    excerpt: "CPR member churches joined thousands across Rwanda to remember the 1994 Genocide against the Tutsi, reaffirming their commitment to never again.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "May 14, 2025",
    category: "Education",
    title: "BNEP Launches Active Pedagogy Training for 1,200 Teachers",
    excerpt: "The Bureau National de l'Éducation Protestante rolled out its flagship Participatory Active Pedagogy program in partnership with international donors.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "April 3, 2025",
    category: "Health",
    title: "Gender & Health Department Completes Trauma Counselor Certification",
    excerpt: "Forty-two community health workers across five provinces were certified as trauma counselors, strengthening CPR's mental health outreach capacity.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
  },
];

const PARTNERS = [
  "ACT Alliance", "AACC", "CWM", "DanChurchAid", "EAPPI",
  "Norwegian Church Aid", "Presbyterian Church USA", "Reformed Church",
  "UNHCR Rwanda", "World Vision", "UNICEF", "GIZ",
];

const TESTIMONIALS = [
  {
    quote: "The CPR scholarship program transformed my life. As a child of genocide survivors, I had no hope of attending university. Today I am a medical doctor serving my community.",
    author: "Dr. Claudine Uwimana",
    role: "CPR Scholarship Beneficiary, Class of 2018",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
  },
  {
    quote: "Radio Inkoramutima reaches our village every morning. The trauma counseling programs on air have helped our whole congregation find peace and reconciliation.",
    author: "Pastor Emmanuel Nkusi",
    role: "Member Church Pastor, Eastern Province",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
  },
  {
    quote: "Through the BNEP Active Pedagogy training, our teachers now create joyful classrooms where every child participates. Student performance has increased by 40% in two years.",
    author: "Marie-Louise Ingabire",
    role: "Head Teacher, EPRK Primary School, Kigali",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format",
  },
];

// ─── Utility ──────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ─── Components ──────────────────────────────────────────────────────────────

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active);
  const Icon = stat.icon;
  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#EAD196]/20">
        <Icon size={22} className="text-[#EAD196]" />
      </div>
      <div className="text-4xl font-bold text-white font-['Outfit'] tracking-tight">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-white/70 uppercase tracking-widest font-medium">{stat.label}</div>
    </div>
  );
}

function MegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (!item.children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[720px] max-w-[95vw] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 z-50 grid gap-6"
      style={{ gridTemplateColumns: `repeat(${item.children.length}, 1fr)` }}
      onMouseLeave={onClose}
    >
      {item.children.map((col) => (
        <div key={col.heading}>
          {col.heading && (
            <div className="text-xs font-semibold text-[#0F2C59]/50 uppercase tracking-widest mb-3 pb-2 border-b border-[#0F2C59]/10">
              {col.heading}
            </div>
          )}
          <ul className="space-y-1">
            {col.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-[#0F2C59]/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-[#0F2C59] group-hover:text-[#EAD196] transition-colors flex items-center gap-1.5">
                    {link.label}
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  {link.desc && (
                    <span className="text-xs text-[#4A4A4A]/70 leading-tight">{link.desc}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:flex bg-[#0F2C59] text-white/80 text-xs py-2 px-6 items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Phone size={11} /><span>+250 788 314 718</span></span>
          <span className="flex items-center gap-1.5"><Mail size={11} /><span>cprgs@cpr-rwanda.rw</span></span>
          <span className="flex items-center gap-1.5"><MapPin size={11} /><span>KG 2 Av 4, B.P 79, Kigali-Rwanda</span></span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#donate" className="bg-[#EAD196] text-[#0F2C59] text-xs font-bold px-4 py-1 rounded-full hover:bg-[#d4b87a] transition-colors">
            Donate Now
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-lg border-b border-[#0F2C59]/10"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#0F2C59] flex items-center justify-center shadow-md">
              <span className="text-[#EAD196] font-['Outfit'] font-black text-lg">C</span>
            </div>
            <div>
              <div className="font-['Outfit'] font-black text-[#0F2C59] text-base lg:text-lg leading-tight">CPR Rwanda</div>
              <div className="text-[10px] lg:text-xs text-[#4A4A4A]/70 font-medium leading-tight hidden sm:block">
                Conseil Protestant du Rwanda
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeMenu === item.label
                      ? "bg-[#0F2C59]/8 text-[#0F2C59]"
                      : "text-[#1A1A1A]/80 hover:text-[#0F2C59] hover:bg-[#0F2C59]/5"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </a>
                <AnimatePresence>
                  {activeMenu === item.label && item.children && (
                    <MegaMenu item={item} onClose={() => setActiveMenu(null)} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#radio"
              className="flex items-center gap-2 text-sm font-semibold text-[#0F2C59] hover:text-[#EAD196] transition-colors"
            >
              <Radio size={15} className="text-[#EAD196]" />
              <span>107.1 FM</span>
            </a>
            <a
              href="#contact"
              className="bg-[#0F2C59] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1a3f7a] transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#0F2C59]/8 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} className="text-[#0F2C59]" /> : <Menu size={22} className="text-[#0F2C59]" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-[#0F2C59]/10 bg-white"
            >
              <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#0F2C59] hover:bg-[#0F2C59]/5 transition-colors"
                      onClick={() => {
                        if (item.children) {
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && item.children && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-0.5">
                            {item.children.flatMap((col) => col.links).map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 text-sm text-[#4A4A4A] hover:text-[#0F2C59] hover:bg-[#0F2C59]/5 rounded-lg transition-colors"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="pt-3 pb-1 flex flex-col gap-2">
                  <a href="#donate" className="bg-[#EAD196] text-[#0F2C59] text-sm font-bold px-5 py-3 rounded-xl text-center">Donate Now</a>
                  <a href="#contact" className="bg-[#0F2C59] text-white text-sm font-bold px-5 py-3 rounded-xl text-center">Contact Us</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function HeroSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActive((a) => (a + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const slide = HERO_SLIDES[active];

  return (
    <section id="home" className="relative h-[92vh] min-h-[600px] overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-[#0F2C59]"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2C59]/90 via-[#0F2C59]/60 to-[#0F2C59]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A35]/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-[#EAD196]/20 backdrop-blur-sm border border-[#EAD196]/30 rounded-full px-4 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EAD196] animate-pulse" />
                <span className="text-[#EAD196] text-xs font-semibold tracking-widest uppercase">{slide.label}</span>
              </div>

              <h1 className="font-['Outfit'] font-black text-5xl lg:text-7xl text-white leading-none tracking-tight mb-3">
                {slide.title}
              </h1>
              <p className="font-['Outfit'] font-light text-xl lg:text-2xl text-[#EAD196] mb-5 tracking-wide italic">
                "{slide.subtitle}"
              </p>
              <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                {slide.desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 bg-[#EAD196] text-[#0F2C59] font-bold px-7 py-3.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm"
                >
                  {slide.cta}
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#departments"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  {slide.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-500 rounded-full ${
              i === active ? "w-8 h-2 bg-[#EAD196]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 z-10 flex flex-col items-center gap-2 hidden lg:flex">
        <span className="text-white/40 text-[10px] tracking-widest uppercase rotate-90 origin-center translate-y-6">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[#0F2C59] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <StatCard stat={stat} active={visible} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-10 bg-[#EAD196]" />
              <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Story</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#0F2C59] leading-tight mb-6">
              Six Decades of<br />Faith & Service
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-5 text-base">
              Founded in <strong className="text-[#0F2C59]">1963</strong>, the Conseil Protestant du Rwanda (CPR) is the umbrella body uniting Rwanda's 19 Protestant churches. Since its inception, CPR has been at the heart of Rwanda's social fabric — rebuilding communities after conflict, championing education, and upholding the dignity of every person.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-8 text-base">
              Today, through its departments in education, health, evangelism, and communications, CPR touches every province of Rwanda. Our motto — <em className="text-[#0F2C59] font-semibold">"Bose Babe Umwe" (That All of Them May Be One)</em> — guides every initiative.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="inline-flex items-center gap-2 bg-[#0F2C59] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1a3f7a] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                Our Full History <ArrowRight size={15} />
              </a>
              <a href="#vision" className="inline-flex items-center gap-2 text-[#0F2C59] font-semibold px-6 py-3 rounded-xl border-2 border-[#0F2C59]/20 hover:border-[#0F2C59] transition-all duration-300 text-sm">
                Vision & Mission
              </a>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=300&fit=crop&auto=format"
                    alt="Community worship service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop&auto=format"
                    alt="Community health outreach"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop&auto=format"
                    alt="Children in school"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&auto=format"
                    alt="Church community gathering"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#EAD196] rounded-2xl px-5 py-4 shadow-xl">
              <div className="font-['Outfit'] font-black text-[#0F2C59] text-3xl">19</div>
              <div className="text-[#0F2C59]/70 text-xs font-semibold">Member<br />Churches</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DepartmentsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="departments" ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Work</span>
            <div className="h-px w-10 bg-[#EAD196]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#0F2C59] leading-tight">
            Departments & Projects
          </h2>
          <p className="text-[#4A4A4A] mt-4 max-w-xl mx-auto text-base">
            CPR's work spans four strategic departments, each addressing a critical dimension of Rwanda's transformation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 border border-transparent hover:border-[#EAD196]/30 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${dept.accent}15` }}
                >
                  <Icon size={22} style={{ color: dept.accent }} />
                </div>
                <h3 className="font-['Outfit'] font-bold text-[#0F2C59] text-lg mb-2 leading-tight">{dept.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5">{dept.desc}</p>
                <a
                  href={dept.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F2C59] hover:text-[#EAD196] transition-colors"
                >
                  Learn More <ArrowRight size={13} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="news" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-10 bg-[#EAD196]" />
              <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Latest Updates</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#0F2C59]">News & Events</h2>
          </motion.div>
          <a href="#news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2C59] border-2 border-[#0F2C59]/15 px-5 py-2.5 rounded-xl hover:border-[#0F2C59] transition-all whitespace-nowrap">
            All News <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {NEWS.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#0F2C59]/8 hover:shadow-xl transition-all duration-400 cursor-pointer"
            >
              <div className="overflow-hidden h-52 bg-[#EDF1F7]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-[#EAD196] bg-[#EAD196]/15 px-3 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-[#4A4A4A]/60">{article.date}</span>
                </div>
                <h3 className="font-['Outfit'] font-bold text-[#0F2C59] text-base leading-snug mb-2 group-hover:text-[#1a3f7a] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2C59] hover:text-[#EAD196] transition-colors">
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RadioSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="radio" ref={ref} className="relative py-24 overflow-hidden bg-[#0B1A35]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&h=800&fit=crop&auto=format"
          alt="Radio studio"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A35] via-[#0B1A35]/85 to-[#0F2C59]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 bg-[#EAD196]/15 border border-[#EAD196]/30 rounded-full px-4 py-2 mb-6">
              <Radio size={14} className="text-[#EAD196]" />
              <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">On Air 24/7</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            <h2 className="font-['Outfit'] font-black text-4xl lg:text-6xl text-white leading-tight mb-2">
              Radio
            </h2>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-6xl text-[#EAD196] leading-tight mb-6">
              Inkoramutima
            </h2>
            <p className="text-white/60 text-lg italic mb-2">"Voice of the Heart"</p>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              Broadcasting at <strong className="text-[#EAD196]">107.1 FM</strong> across Rwanda, Radio Inkoramutima carries messages of evangelization, national unity, and holistic community development — healing hearts and building bridges since its founding.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: BookOpen, label: "Evangelization" },
                { icon: Shield, label: "Unity" },
                { icon: Globe, label: "Development" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/8 border border-white/10 rounded-xl p-4 text-center">
                  <Icon size={20} className="text-[#EAD196] mx-auto mb-2" />
                  <div className="text-white text-xs font-semibold">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a href="#radio" className="inline-flex items-center gap-2 bg-[#EAD196] text-[#0F2C59] font-bold px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 text-sm">
                <PlayCircle size={16} /> Listen Live
              </a>
              <a href="#programs" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm">
                Program Guide
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-[#EAD196]/10 border border-[#EAD196]/20 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-[#EAD196]/15 border border-[#EAD196]/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-[#EAD196]/20 border border-[#EAD196]/40 flex items-center justify-center">
                    <div className="text-center">
                      <Radio size={40} className="text-[#EAD196] mx-auto mb-2" />
                      <div className="font-['Outfit'] font-black text-white text-3xl">107.1</div>
                      <div className="text-[#EAD196] text-sm font-semibold">FM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-[#EAD196]/20 animate-ping" style={{ animationDuration: "3s" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Impact Stories</span>
            <div className="h-px w-10 bg-[#EAD196]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#0F2C59]">
            Lives Transformed
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-10 shadow-lg border border-[#0F2C59]/5 relative"
          >
            <Quote size={48} className="text-[#EAD196]/30 absolute top-6 left-8" />
            <p className="text-[#1A1A1A] text-xl leading-relaxed mb-8 relative z-10 italic">
              "{TESTIMONIALS[active].quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={TESTIMONIALS[active].avatar}
                alt={TESTIMONIALS[active].author}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#EAD196]/30"
              />
              <div className="text-left">
                <div className="font-['Outfit'] font-bold text-[#0F2C59] text-sm">{TESTIMONIALS[active].author}</div>
                <div className="text-[#4A4A4A]/70 text-xs">{TESTIMONIALS[active].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-2 bg-[#EAD196]" : "w-2 h-2 bg-[#0F2C59]/20 hover:bg-[#0F2C59]/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-16 bg-white border-t border-[#0F2C59]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="text-[#4A4A4A]/60 text-sm font-medium uppercase tracking-widest">Trusted Partners & Supporters</span>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="px-5 py-3 rounded-xl border border-[#0F2C59]/10 text-sm font-semibold text-[#0F2C59]/60 hover:text-[#0F2C59] hover:border-[#0F2C59]/30 hover:bg-[#0F2C59]/3 transition-all duration-300 cursor-pointer"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const { ref, visible } = useScrollReveal();
  const images = [
    { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop&auto=format", alt: "Kwibuka commemoration ceremony", span: "col-span-2 row-span-2" },
    { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&auto=format", alt: "Students in classroom" },
    { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&auto=format", alt: "Health outreach program" },
    { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&auto=format", alt: "Community gathering" },
    { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=300&fit=crop&auto=format", alt: "Worship service" },
  ];

  return (
    <section id="gallery" ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-10 bg-[#EAD196]" />
              <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Moments</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#0F2C59]">Gallery</h2>
          </motion.div>
          <a href="#gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2C59] border-2 border-[#0F2C59]/15 px-5 py-2.5 rounded-xl hover:border-[#0F2C59] transition-all whitespace-nowrap">
            View All <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`${img.span ?? ""} rounded-2xl overflow-hidden bg-[#EDF1F7] group relative cursor-pointer`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#0F2C59]/0 group-hover:bg-[#0F2C59]/30 transition-all duration-300 flex items-end p-4">
                <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-20 bg-[#0F2C59] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#EAD196] blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#EAD196] blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Partner With Us in<br />
            <span className="text-[#EAD196]">Transforming Rwanda</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your support empowers churches, educates children, heals trauma survivors, and broadcasts hope across Rwanda's thousand hills.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#donate" className="inline-flex items-center gap-2 bg-[#EAD196] text-[#0F2C59] font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Donate Now <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300">
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#060F1F] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0F2C59] border border-[#EAD196]/30 flex items-center justify-center">
                <span className="text-[#EAD196] font-['Outfit'] font-black text-lg">C</span>
              </div>
              <div>
                <div className="font-['Outfit'] font-black text-white text-base leading-tight">CPR Rwanda</div>
                <div className="text-white/50 text-xs">Conseil Protestant du Rwanda</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Uniting Rwanda's Protestant churches since 1963 through faith, education, health, and sustainable community development.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#EAD196] hover:text-[#0F2C59] text-white/60 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#EAD196] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {["About CPR", "Vision & Mission", "Executive Committee", "SG Publications", "Our Partners", "Photo Gallery"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/55 hover:text-[#EAD196] transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#EAD196] mb-5">Departments</h4>
            <ul className="space-y-2.5">
              {["Education (BNEP)", "Gender & Health", "Evangelism", "Radio Inkoramutima", "Advocacy", "Sustainability"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/55 hover:text-[#EAD196] transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#EAD196] mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#EAD196] mt-0.5 flex-shrink-0" />
                <span className="text-white/55 text-sm leading-relaxed">KG 2 Av 4, B.P 79<br />Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#EAD196] flex-shrink-0" />
                <a href="tel:+250788314718" className="text-white/55 hover:text-[#EAD196] transition-colors text-sm">+250 788 314 718</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#EAD196] flex-shrink-0" />
                <a href="mailto:cprgs@cpr-rwanda.rw" className="text-white/55 hover:text-[#EAD196] transition-colors text-sm">cprgs@cpr-rwanda.rw</a>
              </li>
              <li className="flex items-center gap-3">
                <Radio size={14} className="text-[#EAD196] flex-shrink-0" />
                <span className="text-white/55 text-sm">Radio Inkoramutima 107.1 FM</span>
              </li>
            </ul>

            {/* Contact form trigger */}
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 bg-[#EAD196] text-[#0F2C59] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 w-full justify-center"
            >
              Send a Message <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>© {new Date().getFullYear()} Conseil Protestant du Rwanda. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen font-['Inter']" style={{ scrollBehavior: "smooth" }}>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <DepartmentsSection />
        <NewsSection />
        <RadioSection />
        <TestimonialsSection />
        <PartnersSection />
        <GalleryPreview />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
