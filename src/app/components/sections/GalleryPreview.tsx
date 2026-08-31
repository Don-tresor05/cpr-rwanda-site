import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { ImageLightbox } from "../ui/ImageLightbox";

const GALLERY_IMAGES = [
  { src: "/cpr/assets/Bisanzeda.webp", alt: "Bisanzeda Activity", span: "col-span-2 row-span-2" },
  { src: "/cpr/assets/2.jpeg", alt: "CPR Community Work", span: "" },
  { src: "/cpr/assets/3.jpeg", alt: "Kwibuka Commemoration", span: "" },
  { src: "/cpr/assets/preacher-site-logo-dcd17-1.webp", alt: "Preacher Ministry", span: "" },
  { src: "/cpr/assets/news-trauma.jpg", alt: "Trauma Healing Program", span: "" },
];

export function GalleryPreview() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-10 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{t("gallery.galleryLabel")}</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">{t("gallery.title")}</h2>
          </motion.div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4E6132] border-2 border-[#4E6132]/15 px-5 py-2.5 rounded-xl hover:border-[#4E6132] transition-all whitespace-nowrap">
            {t("gallery.viewAllBtn")} <ExternalLink size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedImgIdx(i)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`${img.span ?? ""} rounded-2xl overflow-hidden bg-[#EDF1F7] group relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block" />
            </motion.div>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={GALLERY_IMAGES}
        selectedIndex={selectedImgIdx}
        onClose={() => setSelectedImgIdx(null)}
      />
    </section>
  );
}
