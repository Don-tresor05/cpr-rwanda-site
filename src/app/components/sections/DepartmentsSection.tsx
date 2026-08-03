import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getDepartments } from "../../data/departments";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

export function DepartmentsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const departments = getDepartments(t);
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
            <div className="h-px w-10 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">{t("departments.ourWork")}</span>
            <div className="h-px w-10 bg-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-4xl lg:text-5xl text-[#4E6132] leading-tight">
            {t("departments.title")}
          </h2>
          <p className="text-[#4A4A4A] mt-4 max-w-xl mx-auto text-base">
            {t("departments.desc")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.title}
                onClick={() => navigate(dept.link)}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 border border-transparent hover:border-[#EAD196]/30 cursor-pointer flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#4E6132]/10 text-[#4E6132] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-lg mb-2 leading-tight">{dept.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5 line-clamp-3">{dept.desc}</p>
                <Link
                  to={dept.link}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B6543] hover:text-[#784B24] transition-colors mt-auto"
                >
                  {t("departments.learnMore")} <ArrowRight size={13} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
