import { motion } from "motion/react";
import { PARTNERS } from "../../data/partners";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function PartnersSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  return (
    <section ref={ref} className="py-16 bg-white border-t border-[#4E6132]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="text-[#4A4A4A]/60 text-sm font-medium uppercase tracking-widest">{t("partners.trustedBy")}</span>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="px-5 py-3 rounded-xl border border-[#4E6132]/10 text-sm font-semibold text-[#4E6132]/60 hover:text-[#4E6132] hover:border-[#4E6132]/30 hover:bg-[#4E6132]/3 transition-all duration-300 cursor-pointer"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
