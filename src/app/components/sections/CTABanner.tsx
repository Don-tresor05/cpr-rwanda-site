import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function CTABanner() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-20 bg-[#4E6132] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#EAD196] blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#EAD196] blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Partner With Us in<br />
            <span className="text-[#EAD196]">Transforming Rwanda</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your support empowers churches, educates children, heals trauma survivors, and broadcasts hope across Rwanda's thousand hills.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#donate" className="inline-flex items-center gap-2 bg-[#EAD196] text-[#4E6132] font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Donate Now <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300">
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
