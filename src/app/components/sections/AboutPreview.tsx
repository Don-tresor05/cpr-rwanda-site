import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function AboutPreview() {
  const { ref, visible } = useScrollReveal();
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
              <div className="h-px w-10 bg-[#EAD196]" />
              <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Story</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132] leading-tight mb-6">
              Six Decades of<br />Faith &amp; Service
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-5 text-base">
              Founded in <strong className="text-[#4E6132]">1963</strong>, the Conseil Protestant du Rwanda (CPR) is the umbrella body uniting Rwanda's 19 Protestant churches. Since its inception, CPR has been at the heart of Rwanda's social fabric — rebuilding communities after conflict, championing education, and upholding the dignity of every person.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-8 text-base">
              Today, through its departments in education, health, evangelism, and communications, CPR touches every province of Rwanda. Our motto — <em className="text-[#4E6132] font-semibold">&ldquo;Bose Babe Umwe&rdquo; (That All of Them May Be One)</em> — guides every initiative.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="inline-flex items-center gap-2 bg-[#4E6132] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1a3f7a] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                Our Full History <ArrowRight size={15} />
              </a>
              <a href="#vision" className="inline-flex items-center gap-2 text-[#4E6132] font-semibold px-6 py-3 rounded-xl border-2 border-[#4E6132]/20 hover:border-[#4E6132] transition-all duration-300 text-sm">
                Vision &amp; Mission
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
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=300&fit=crop&auto=format"
                    alt="Community worship service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop&auto=format"
                    alt="Community health outreach"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop&auto=format"
                    alt="Children in school"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 bg-[#EDF1F7] group">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&auto=format"
                    alt="Church community gathering"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#EAD196] rounded-2xl px-5 py-4 shadow-xl">
              <div className="font-['Outfit'] font-black text-[#4E6132] text-3xl">19</div>
              <div className="text-[#4E6132]/70 text-xs font-semibold">Member<br />Churches</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
