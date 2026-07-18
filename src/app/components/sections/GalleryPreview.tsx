import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop&auto=format", alt: "Kwibuka commemoration ceremony", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&auto=format", alt: "Students in classroom", span: "" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&auto=format", alt: "Health outreach program", span: "" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&auto=format", alt: "Community gathering", span: "" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=300&fit=crop&auto=format", alt: "Worship service", span: "" },
];

export function GalleryPreview() {
  const { ref, visible } = useScrollReveal();
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
          {GALLERY_IMAGES.map((img, i) => (
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
