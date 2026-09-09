import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  Shield, FileText, Database, Lock, Share2, Server,
  Globe, UserCheck, Baby, RefreshCw, Mail, ArrowLeft, Cookie,
  type LucideIcon,
} from "lucide-react";

interface PolicySection {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export function PrivacyPolicy() {
  const { t } = useTranslation("common");

  const raw = t("privacyPolicy.sections", { returnObjects: true }) as unknown;
  const sections = (Array.isArray(raw) ? raw : []) as PolicySection[];

  const heroDesc = t("privacyPolicy.heroDesc");
  const lastUpdated = t("privacyPolicy.lastUpdated");
  const contactIntro = t("privacyPolicy.contactIntro");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white">
      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="relative min-h-[45vh] lg:min-h-[55vh] flex items-end pb-14 lg:pb-20 px-6 lg:px-12 text-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,42,16,0.55), rgba(28,42,16,0.95))",
            y: heroBgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A10] via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl w-full mx-auto"
          style={{ opacity: heroOpacity, y: heroContentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-[#EAD196]/40 rounded-full px-4 py-2 mb-6"
          >
            <Shield size={15} className="text-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">
              {t("privacyPolicy.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-md mb-4"
          >
            {t("privacyPolicy.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            {heroDesc}
          </motion.p>
        </motion.div>
      </div>

      {/* ─── BODY ─── */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-gray-400 mb-12 pb-6 border-b border-gray-100 italic"
        >
          {lastUpdated}
        </motion.p>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon ? ICON_MAP[section.icon] ?? FileText : FileText;
            return (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="group"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4E6132]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E6132] transition-colors duration-300">
                    <Icon size={18} className="text-[#4E6132] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-[#1C2A10]">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-0 sm:pl-[54px] space-y-3">
                  {section.paragraphs?.map((p, i) => (
                    <p key={i} className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-2 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#4A4A4A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#BC8A5F] mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-16 bg-[#F8F9FA] rounded-2xl border border-gray-100 p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#BC8A5F]/15 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-[#BC8A5F]" />
            </div>
            <div>
              <h3 className="font-['Outfit'] text-lg font-bold text-[#1C2A10] mb-1.5">
                {t("privacyPolicy.contactTitle")}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-3">{contactIntro}</p>
              <a
                href="mailto:cprgs@cpr-rwanda.rw"
                className="text-[#4E6132] font-semibold text-sm hover:text-[#BC8A5F] transition-colors"
              >
                cprgs@cpr-rwanda.rw
              </a>
            </div>
          </div>
        </motion.div>

        {/* Back to home */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4E6132] text-white font-semibold text-sm hover:bg-[#3d4e29] transition-colors"
          >
            <ArrowLeft size={16} />
            {t("privacyPolicy.backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  file: FileText,
  database: Database,
  lock: Lock,
  share: Share2,
  server: Server,
  globe: Globe,
  user: UserCheck,
  baby: Baby,
  refresh: RefreshCw,
  mail: Mail,
  cookie: Cookie,
};
