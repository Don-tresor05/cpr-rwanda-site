import { motion } from "motion/react";
import { Church } from "lucide-react";
import { MEMBER_CHURCHES } from "../../data/departments";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function MemberChurchesSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Community</span>
            <div className="h-px w-10 bg-[#EAD196]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132] leading-tight">
            Member Churches &amp; Organizations
          </h2>
          <p className="text-[#4A4A4A] mt-4 max-w-2xl mx-auto text-base">
            The Conseil Protestant du Rwanda unites <strong className="text-[#4E6132]">25+</strong> Protestant churches and
            Christian organizations across Rwanda, working together in faith, service, and national transformation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEMBER_CHURCHES.map((church, i) => (
            <motion.div
              key={church}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.02 * i, duration: 0.4 }}
              className="group bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md border border-transparent hover:border-[#4E6132]/15 transition-all duration-300 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-[#4E6132]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E6132] transition-colors duration-300">
                <Church size={16} className="text-[#4E6132] group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-sm text-[#4A4A4A] group-hover:text-[#4E6132] font-medium transition-colors leading-snug">
                {church}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-[#4E6132]/10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#4E6132]/10 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-[9px] font-bold text-[#4E6132]">{String.fromCharCode(64 + i)}</span>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-[#EAD196] border-2 border-white flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#4E6132]">+{MEMBER_CHURCHES.length - 4}</span>
              </div>
            </div>
            <span className="text-sm text-[#4A4A4A]/70">
              <strong className="text-[#4E6132]">{MEMBER_CHURCHES.length}</strong> churches and organizations united in Christ
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
