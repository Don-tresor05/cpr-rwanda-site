import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { NEWS } from "../../data/news";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function NewsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="news" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-10 bg-[#EAD196]" />
              <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Latest Updates</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132]">News &amp; Events</h2>
          </motion.div>
          <a href="#news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4E6132] border-2 border-[#4E6132]/15 px-5 py-2.5 rounded-xl hover:border-[#4E6132] transition-all whitespace-nowrap">
            All News <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {NEWS.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#4E6132]/8 hover:shadow-xl transition-all duration-400 cursor-pointer"
            >
              <div className="overflow-hidden h-52 bg-[#EDF1F7]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-[#EAD196] bg-[#EAD196]/15 px-3 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-[#4A4A4A]/60">{article.date}</span>
                </div>
                <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-base leading-snug mb-2 group-hover:text-[#1a3f7a] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4E6132] hover:text-[#EAD196] transition-colors">
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
