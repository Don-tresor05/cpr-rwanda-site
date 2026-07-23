import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function AboutPreview() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
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
              <div className="h-px w-10 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{t("about.ourStory")}</span>
            </div>
            <h2 
              className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132] leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: t("about.title") }}
            />
            <p 
              className="text-[#4A4A4A] leading-relaxed mb-5 text-base"
              dangerouslySetInnerHTML={{ __html: t("about.p1") }}
            />
            <p className="text-[#4A4A4A] leading-relaxed mb-8 text-base">
              {t("about.p2Start")}<em className="text-[#4E6132] font-semibold" dangerouslySetInnerHTML={{ __html: t("about.motto") }} />{t("about.p2End")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="inline-flex items-center gap-2 bg-[#4E6132] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#BC8A5F] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                {t("about.historyBtn")} <ArrowRight size={15} />
              </a>
              <a href="#vision" className="inline-flex items-center gap-2 text-[#4E6132] font-semibold px-6 py-3 rounded-xl border-2 border-[#4E6132]/20 hover:border-[#4E6132] transition-all duration-300 text-sm">
                {t("about.visionBtn")}
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
                    src="/assets/CPR 3 - Copy.webp"
                    alt="CPR History and Leadership"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-[#EDF1F7] group">
                  <img
                    src="/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp"
                    alt="Ensemble Biryogo Event"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32 bg-[#EDF1F7] group">
                  <img
                    src="/assets/Gahini 2.webp"
                    alt="Gahini Community Gathering"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 bg-[#EDF1F7] group">
                  <img
                    src="/assets/Gahini 3.webp"
                    alt="Gahini Fellowship and Outreach"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#BC8A5F] rounded-2xl px-5 py-4 shadow-xl">
              <div className="font-['Outfit'] font-black text-white text-3xl">28</div>
              <div 
                className="text-white/70 text-xs font-semibold"
                dangerouslySetInnerHTML={{ __html: t("stats.churches", { ns: "common" }).replace(' ', '<br />') }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
