import { motion } from "motion/react";
import { STATS } from "../../data/stats";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCountUp } from "../../hooks/useCountUp";

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

export function StatsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[#4E6132] py-16">
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
