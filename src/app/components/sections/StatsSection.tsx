import { useMemo } from "react";
import { motion } from "motion/react";
import { getStats, Stat } from "../../data/stats";
import { useSiteSettings } from "../../data/siteSettings";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCountUp } from "../../hooks/useCountUp";
import { useTranslation } from "react-i18next";
import { Radio, Users, Heart, Scale, Briefcase } from "lucide-react";
import { ChurchIcon, SchoolIcon, ServiceRibbonIcon } from "../icons/StatsIcons";
import type { ComponentType } from "react";

/** Maps the icon keys staff pick in the CMS to the site's icon components. */
const STAT_ICON_MAP: Record<string, ComponentType<any>> = {
  church: ChurchIcon,
  school: SchoolIcon,
  radio: Radio,
  ribbon: ServiceRibbonIcon,
  users: Users,
  heart: Heart,
  scale: Scale,
  briefcase: Briefcase,
};

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active);
  const Icon = stat.icon;
  return (
    <div className="group relative flex flex-col items-center gap-4 p-8 lg:p-10 rounded-3xl overflow-hidden text-center h-full justify-center">
      {/* Glass panel */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/[0.04] to-white/[0.02] border border-white/15 rounded-3xl backdrop-blur-md shadow-[0_15px_50px_-12px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:border-[#EAD196]/40 group-hover:shadow-[0_25px_70px_-15px_rgba(234,209,150,0.25)]" />

      {/* Gold corner glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#EAD196]/10 blur-2xl transition-all duration-700 group-hover:bg-[#EAD196]/25 group-hover:scale-125" />

      {/* Top hairline accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-[#EAD196]/70 to-transparent transition-all duration-500 group-hover:w-full group-hover:via-[#EAD196]" />

      {/* Icon chip with glow */}
      <div className="relative mt-1">
        <span className="absolute inset-0 rounded-2xl bg-[#EAD196]/30 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EAD196]/25 to-[#EAD196]/5 border border-[#EAD196]/25 flex items-center justify-center text-[#EAD196] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#EAD196]/50">
          <Icon size={24} />
        </div>
      </div>

      {/* Number */}
      <div className="text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight leading-none bg-gradient-to-b from-white to-[#EAD196] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(234,209,150,0.3)]">
        {count}
        <span className="text-[#EAD196]">{stat.suffix}</span>
      </div>

      {/* Label */}
      <div className="relative text-[11px] lg:text-xs text-[#EAD196]/80 uppercase tracking-[0.2em] font-bold text-center mt-1">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("common");
  const settings = useSiteSettings();

  const stats = useMemo<Stat[]>(() => {
    const cmsStats = settings?.stats?.filter((s) => typeof s.value === "number" && s.label);
    if (cmsStats && cmsStats.length > 0) {
      return cmsStats.map((s) => ({
        value: s.value as number,
        label: s.label as string,
        suffix: s.suffix || "",
        icon: STAT_ICON_MAP[s.icon || "church"] || ChurchIcon,
      }));
    }
    return getStats(t);
  }, [settings, t]);

  return (
    <section ref={ref} className="relative bg-[#4E6132] py-20 lg:py-24 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#EAD196]/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#BC8A5F]/10 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-white/[0.03] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="h-full"
            >
              <StatCard stat={stat} active={visible} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
