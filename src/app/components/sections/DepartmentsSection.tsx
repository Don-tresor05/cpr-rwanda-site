import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { DEPARTMENTS } from "../../data/departments";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function DepartmentsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="departments" ref={ref} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Work</span>
            <div className="h-px w-10 bg-[#EAD196]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#0F2C59] leading-tight">
            Departments &amp; Projects
          </h2>
          <p className="text-[#4A4A4A] mt-4 max-w-xl mx-auto text-base">
            CPR's work spans four strategic departments, each addressing a critical dimension of Rwanda's transformation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 border border-transparent hover:border-[#EAD196]/30 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${dept.accent}15` }}
                >
                  <Icon size={22} style={{ color: dept.accent }} />
                </div>
                <h3 className="font-['Outfit'] font-bold text-[#0F2C59] text-lg mb-2 leading-tight">{dept.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5">{dept.desc}</p>
                <a
                  href={dept.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F2C59] hover:text-[#EAD196] transition-colors"
                >
                  Learn More <ArrowRight size={13} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
