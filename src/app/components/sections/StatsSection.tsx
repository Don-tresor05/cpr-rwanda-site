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
    <div className="flex flex-col items-center gap-3 p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group h-full justify-center">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#EAD196]/15 text-[#EAD196] transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} />
      </div>
      <div className="text-4xl font-extrabold text-white font-['Outfit'] tracking-tight mt-2">
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-white/70 uppercase tracking-widest font-bold text-center mt-1">{stat.label}</div>
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
    <section ref={ref} className="bg-[#4E6132] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
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
