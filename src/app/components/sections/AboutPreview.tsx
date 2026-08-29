import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { WatermarkSection } from "../ui/WatermarkBackground";
import { ImageLightbox } from "../ui/ImageLightbox";

const ABOUT_IMAGES = [
  { src: "/cpr/assets/CPR 3 - Copy.webp", alt: "CPR History and Leadership", heightClass: "h-48" },
  { src: "/cpr/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp", alt: "Ensemble Biryogo Event", heightClass: "h-32" },
  { src: "/cpr/assets/Gahini 2.webp", alt: "Gahini Community Gathering", heightClass: "h-32" },
  { src: "/cpr/assets/Gahini 3.webp", alt: "Gahini Fellowship and Outreach", heightClass: "h-48" },
];

export function AboutPreview() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  return (
    <WatermarkSection id="about" ref={ref} className="py-24 bg-white overflow-hidden">
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
              <Link to="/about" className="inline-flex items-center gap-2 bg-[#BC8A5F] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4E6132] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                {t("about.historyBtn")} <ArrowRight size={15} />
              </Link>
              <Link
                to="/about#vision-mission"
                className="inline-flex items-center gap-2 text-[#4E6132] font-semibold px-6 py-3 rounded-xl border-2 border-[#4E6132]/20 hover:border-[#4E6132] transition-all duration-300 text-sm cursor-pointer"
              >
                {t("about.visionBtn")}
              </Link>
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
                {[0, 1].map((idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`rounded-2xl overflow-hidden ${ABOUT_IMAGES[idx].heightClass} bg-[#EDF1F7] group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                  >
                    <img
                      src={ABOUT_IMAGES[idx].src}
                      alt={ABOUT_IMAGES[idx].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-8">
                {[2, 3].map((idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`rounded-2xl overflow-hidden ${ABOUT_IMAGES[idx].heightClass} bg-[#EDF1F7] group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                  >
                    <img
                      src={ABOUT_IMAGES[idx].src}
                      alt={ABOUT_IMAGES[idx].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#BC8A5F] rounded-2xl px-5 py-4 shadow-xl pointer-events-none">
              <div className="font-['Outfit'] font-black text-white text-3xl">25</div>
              <div 
                className="text-white/70 text-xs font-semibold"
                dangerouslySetInnerHTML={{ __html: t("stats.churches", { ns: "common" }).replace(' ', '<br />') }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <ImageLightbox
        images={ABOUT_IMAGES}
        selectedIndex={selectedImgIdx}
        onClose={() => setSelectedImgIdx(null)}
      />
    </WatermarkSection>
  );
}
