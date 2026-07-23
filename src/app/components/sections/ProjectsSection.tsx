import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../../data/departments";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function ProjectsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="projects" ref={ref} className="py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Initiatives</span>
            <div className="h-px w-10 bg-[#EAD196]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132] leading-tight">
            Projects &amp; Programs
          </h2>
          <p className="text-[#4A4A4A] mt-4 max-w-xl mx-auto text-base">
            Impact-driven initiatives transforming communities through capacity building, trauma healing, and sustainable development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.2, duration: 0.6 }}
                className="group relative bg-gradient-to-br from-[#F8F9FA] to-white rounded-3xl p-8 shadow-lg border border-[#4E6132]/5 hover:shadow-xl transition-all duration-400 hover:border-[#4E6132]/20 overflow-hidden"
              >
                {/* Decorative bg */}
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#4E6132]/5 group-hover:bg-[#4E6132]/10 transition-all duration-700" />
                <div className="absolute -bottom-20 -left-20 w-36 h-36 rounded-full bg-[#EAD196]/8 group-hover:bg-[#EAD196]/12 transition-all duration-700" />

                <div className="relative">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#4E6132]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E6132] transition-colors duration-300">
                      <Icon size={26} className="text-[#4E6132] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-xl mb-1">{project.title}</h3>
                      <div className="inline-flex items-center gap-1.5 bg-[#EAD196]/15 text-[#EAD196] text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EAD196]" />
                        {project.period}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6">{project.desc}</p>

                  <ul className="space-y-3 mb-6">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#4E6132]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#4E6132]" />
                        </span>
                        <span className="text-sm text-[#4A4A4A]/80">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E6132] hover:text-[#EAD196] transition-colors group/link"
                  >
                    View Full Details <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
