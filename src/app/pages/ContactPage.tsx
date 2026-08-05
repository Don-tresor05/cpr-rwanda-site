import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import {
  MapPin, Phone, Mail, Radio, ArrowRight, Send,
  Clock, ChevronDown, CheckCircle2, Building2, CalendarDays, MessageSquare,
  type LucideIcon,
} from "lucide-react";

interface Section {
  id: string;
  label: string;
}

export function ContactPage() {
  const location = useLocation();
  const { t } = useTranslation("home");
  const [activeSection, setActiveSection] = useState("");

  const cp = t("contactPage", { returnObjects: true }) as Record<string, unknown>;
  const nav = (cp?.nav as Record<string, string>) ?? {};

  const navLinks: Section[] = [
    { id: "form", label: nav.form ?? "Send a Message" },
    { id: "info", label: nav.info ?? "Contact Info" },
    { id: "hours", label: nav.hours ?? "Office Hours" },
    { id: "faq", label: nav.faq ?? "FAQ" },
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
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 lg:pb-20 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,42,16,0.35), rgba(28,42,16,0.92)), url('/assets/about-us.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
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
            <Link to="/" className="hover:text-[#BC8A5F] transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-[#BC8A5F] font-semibold">{(cp?.heroTag as string) ?? "Contact Us"}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-[#BC8A5F]/40 rounded-full px-4 py-2 mb-6"
          >
            <MessageSquare size={15} className="text-[#BC8A5F]" />
            <span className="text-[#BC8A5F] text-xs font-bold uppercase tracking-widest">
              {(cp?.heroTag as string) ?? "Contact Us"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="font-['Outfit'] text-4xl sm:text-5xl lg:text-7xl font-black text-white drop-shadow-md mb-4 max-w-3xl"
          >
            {(cp?.heroTitle as string) ?? "Let's Start a Conversation"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/75 text-base lg:text-lg max-w-2xl leading-relaxed mb-8"
          >
            {(cp?.heroDesc as string) ?? ""}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: MapPin, label: (cp?.heroChip1 as string) ?? "KG 2 Av 4, Kigali" },
              { icon: Clock, label: (cp?.heroChip2 as string) ?? "Mon – Fri, 8:00 – 17:00" },
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

      {/* ─── STICKY SUB-NAV ─── */}
      <div data-sticky-subnav className="bg-[#F5F5DC] border-b border-[#8B6543]/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-start lg:justify-center gap-2 lg:gap-3 overflow-x-auto h-20 lg:h-24 scrollbar-hide">
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

      {/* ─── CONTACT FORM ─── */}
      <ContactFormBlock />

      {/* ─── INFO CARDS ─── */}
      <InfoCardsBlock />

      {/* ─── OFFICE HOURS ─── */}
      <OfficeHoursBlock />

      {/* ─── FAQ ─── */}
      <FaqBlock />

      {/* ─── CTA ─── */}
      <ContactCtaBlock />
    </main>
  );
}

/* ───────────── CONTACT FORM ───────────── */
function ContactFormBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cp = t("contactPage", { returnObjects: true }) as Record<string, unknown>;
  const form = (cp?.form as Record<string, unknown>) ?? {};
  const errors = (form?.errors as Record<string, string>) ?? {};

  const [values, setValues] = useState({
    name: "", email: "", phone: "", subject: (form.subjectOptions as string[])?.[0] ?? "", message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = errors.name ?? "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errs.email = errors.email ?? "Please enter a valid email address";
    if (!values.message.trim()) errs.message = errors.message ?? "Please write a message";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    const subject = encodeURIComponent(`[CPR Website] ${values.subject}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || "—"}\nSubject: ${values.subject}\n\n${values.message}`
    );
    // Brief delay for the "sending" state to be visible, then open the mail client
    setTimeout(() => {
      window.location.href = `mailto:cprgs@cpr-rwanda.rw?subject=${subject}&body=${body}`;
      setSending(false);
      setSent(true);
    }, 600);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-[#F8F9F4] border rounded-xl px-4 py-3.5 text-sm text-[#4A4A4A] placeholder:text-[#4A4A4A]/40 outline-none transition-all duration-200 focus:border-[#4E6132] focus:ring-2 focus:ring-[#4E6132]/15 ${
      hasError ? "border-red-400 focus:border-red-400 focus:ring-red-400/15" : "border-[#4E6132]/15"
    }`;

  return (
    <WatermarkSection id="form" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Intro */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {(form?.tag as string) ?? "Send a Message"}
              </span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5 leading-tight">
              {(form?.title as string) ?? "We'd Love to Hear From You"}
            </h2>
            <p className="text-[#4A4A4A] text-base leading-relaxed mb-8">
              {(form?.desc as string) ?? ""}
            </p>

            {/* Quick contact list */}
            <div className="space-y-4">
              {[
                { icon: MapPin, line1: "KG 2 Av 4, B.P 79", line2: "Kigali, Rwanda" },
                { icon: Phone, line1: "+250 788 314 718", line2: "" },
                { icon: Mail, line1: "cprgs@cpr-rwanda.rw", line2: "" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#4E6132]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={19} className="text-[#4E6132]" />
                  </div>
                  <div>
                    <div className="text-[#4A4A4A] font-semibold text-sm">{item.line1}</div>
                    {item.line2 && <div className="text-[#4A4A4A]/60 text-xs mt-0.5">{item.line2}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#F5F5DC] rounded-3xl p-6 lg:p-10 shadow-sm border border-[#8B6543]/10 relative overflow-hidden">
              <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-[#4E6132]/5" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#4E6132]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-[#4E6132]" />
                  </div>
                  <h3 className="font-['Outfit'] font-black text-2xl text-[#4E6132] mb-3">
                    {(form?.successTitle as string) ?? "Thank You!"}
                  </h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed max-w-md mx-auto mb-8">
                    {(form?.successDesc as string) ?? ""}
                  </p>
                  <button
                    onClick={() => { setSent(false); setValues({ name: "", email: "", phone: "", subject: (form.subjectOptions as string[])?.[0] ?? "", message: "" }); }}
                    className="inline-flex items-center gap-2 bg-[#4E6132] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#3a4f26] transition-all duration-300 hover:scale-105 text-sm"
                  >
                    {(form?.sendAnother as string) ?? "Send another message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#4E6132] uppercase tracking-wider mb-2">
                        {(form?.name as string) ?? "Full Name"} *
                      </label>
                      <input
                        type="text"
                        value={values.name}
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                        placeholder={(form?.namePh as string) ?? "e.g. Jean Bosco Nkurunziza"}
                        className={inputClass(!!fieldErrors.name)}
                      />
                      {fieldErrors.name && <p className="text-red-500 text-xs mt-1.5">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4E6132] uppercase tracking-wider mb-2">
                        {(form?.email as string) ?? "Email Address"} *
                      </label>
                      <input
                        type="email"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        placeholder={(form?.emailPh as string) ?? "you@example.com"}
                        className={inputClass(!!fieldErrors.email)}
                      />
                      {fieldErrors.email && <p className="text-red-500 text-xs mt-1.5">{fieldErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#4E6132] uppercase tracking-wider mb-2">
                        {(form?.phone as string) ?? "Phone (optional)"}
                      </label>
                      <input
                        type="tel"
                        value={values.phone}
                        onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        placeholder={(form?.phonePh as string) ?? "+250 7XX XXX XXX"}
                        className={inputClass(false)}
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-bold text-[#4E6132] uppercase tracking-wider mb-2">
                        {(form?.subject as string) ?? "Subject"}
                      </label>
                      <select
                        value={values.subject}
                        onChange={(e) => setValues({ ...values, subject: e.target.value })}
                        className={`${inputClass(false)} appearance-none cursor-pointer pr-10`}
                      >
                        {(form?.subjectOptions as string[] ?? []).map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-[38px] text-[#4E6132] pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E6132] uppercase tracking-wider mb-2">
                      {(form?.message as string) ?? "Your Message"} *
                    </label>
                    <textarea
                      rows={5}
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      placeholder={(form?.messagePh as string) ?? "Tell us how we can help you..."}
                      className={`${inputClass(!!fieldErrors.message)} resize-none`}
                    />
                    {fieldErrors.message && <p className="text-red-500 text-xs mt-1.5">{fieldErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#4E6132] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#3a4f26] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100 text-sm"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {(form?.sending as string) ?? "Opening your email app..."}
                      </>
                    ) : (
                      <>
                        <Send size={16} /> {(form?.send as string) ?? "Send Message"}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </WatermarkSection>
  );
}

/* ───────────── INFO CARDS ───────────── */
function InfoCardsBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cp = t("contactPage", { returnObjects: true }) as Record<string, unknown>;
  const info = (cp?.info as Record<string, unknown>) ?? {};
  const cards = (info?.cards as { title: string; line1: string; line2: string }[]) ?? [];

  const icons: LucideIcon[] = [Building2, Phone, Mail, Radio];
  const colors = ["#4E6132", "#8B6543", "#BC8A5F", "#4E6132"];

  return (
    <section id="info" className="py-16 lg:py-24 bg-[#F8F9F4] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 justify-center mb-3">
            <div className="h-px w-8 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
              {(info?.tag as string) ?? "Contact Info"}
            </span>
            <div className="h-px w-8 bg-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132]">
            {(info?.title as string) ?? "Reach Us Any of These Ways"}
          </h2>
          <p className="text-[#4A4A4A] mt-3 max-w-2xl mx-auto">
            {(info?.desc as string) ?? ""}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = icons[i] ?? Building2;
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1.5"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="font-['Outfit'] font-bold text-lg text-[#4E6132] mb-2">{card.title}</h3>
                <div className="text-[#4A4A4A] font-semibold text-sm">{card.line1}</div>
                <div className="text-[#4A4A4A]/60 text-xs mt-1">{card.line2}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OFFICE HOURS ───────────── */
function OfficeHoursBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cp = t("contactPage", { returnObjects: true }) as Record<string, unknown>;
  const hours = (cp?.hours as Record<string, unknown>) ?? {};
  const days = (hours?.days as { day: string; time: string }[]) ?? [];

  return (
    <WatermarkSection id="hours" variant="dense" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
                {(hours?.tag as string) ?? "Office Hours"}
              </span>
              <div className="h-px w-8 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-5 leading-tight">
              {(hours?.title as string) ?? "When You Can Find Us"}
            </h2>
            <p className="text-[#4A4A4A] text-base leading-relaxed mb-8">
              {(hours?.desc as string) ?? ""}
            </p>

            {/* Decorative clock */}
            <div className="relative hidden lg:flex w-56 h-56">
              <div className="absolute inset-0 rounded-full bg-[#4E6132]/5 border border-[#4E6132]/15" />
              <div className="absolute inset-6 rounded-full bg-[#4E6132]/8 border border-[#4E6132]/20 flex items-center justify-center">
                <div className="text-center">
                  <Clock size={40} className="text-[#4E6132] mx-auto mb-2" />
                  <div className="font-['Outfit'] font-black text-[#4E6132] text-lg leading-none">8:00</div>
                  <div className="text-[#8B6543] text-xs font-semibold mt-1">— 17:00</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border border-[#4E6132]/10 animate-ping" style={{ animationDuration: "4s" }} />
            </div>
          </motion.div>

          {/* Hours list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1C2A10] rounded-3xl p-6 lg:p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#BC8A5F]/15 flex items-center justify-center">
                <CalendarDays size={18} className="text-[#BC8A5F]" />
              </div>
              <div className="text-white font-['Outfit'] font-bold">
                {(hours?.title as string) ?? "When You Can Find Us"}
              </div>
            </div>
            <div className="space-y-1">
              {days.map((d, i) => (
                <motion.div
                  key={d.day}
                  initial={{ opacity: 0, x: 15 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm ${
                    d.time.toLowerCase().includes("closed") || d.time.toLowerCase().includes("ferm") || d.time.toLowerCase().includes("ifunze")
                      ? "bg-white/5 text-white/50"
                      : "bg-white/8 hover:bg-white/12 transition-colors"
                  }`}
                >
                  <span className="font-semibold text-white/85">{d.day}</span>
                  <span className="text-[#BC8A5F] font-bold">{d.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </WatermarkSection>
  );
}

/* ───────────── FAQ ───────────── */
function FaqBlock() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const cp = t("contactPage", { returnObjects: true }) as Record<string, unknown>;
  const faq = (cp?.faq as Record<string, unknown>) ?? {};
  const items = (faq?.items as { q: string; a: string }[]) ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F8F9F4] scroll-mt-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 justify-center mb-3">
            <div className="h-px w-8 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">
              {(faq?.tag as string) ?? "FAQ"}
            </span>
            <div className="h-px w-8 bg-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132]">
            {(faq?.title as string) ?? "Frequently Asked Questions"}
          </h2>
          <p className="text-[#4A4A4A] mt-3 max-w-2xl mx-auto">
            {(faq?.desc as string) ?? ""}
          </p>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "shadow-lg border border-[#4E6132]/20" : "shadow-sm border border-[#4E6132]/10 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`font-['Outfit'] font-bold text-sm lg:text-base ${isOpen ? "text-[#4E6132]" : "text-[#4A4A4A]"}`}>
                    {item.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-[#4E6132] text-white rotate-180" : "bg-[#4E6132]/10 text-[#4E6132]"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[#4A4A4A] text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── CTA ───────────── */
function ContactCtaBlock() {
  const { t } = useTranslation("home");
  const cp = t("contactPage", { returnObjects: true }) as Record<string, unknown>;
  const cta = (cp?.cta as Record<string, unknown>) ?? {};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 bg-[#1C2A10] relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
      <div className="absolute inset-0 opacity-[0.04]">
        <img src="/assets/logo.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-4"
        >
          {(cta?.title as string) ?? "Prefer to Talk Directly?"}
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
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="tel:+250788314718"
            className="inline-flex items-center gap-2 bg-[#BC8A5F] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#EAD196] hover:text-[#4E6132] transition-all duration-300 hover:scale-105"
          >
            <Phone size={16} /> {(cta?.callBtn as string) ?? "Call Us"}
          </a>
          <a
            href="mailto:cprgs@cpr-rwanda.rw"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <Mail size={16} /> {(cta?.emailBtn as string) ?? "Email Us"} <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
