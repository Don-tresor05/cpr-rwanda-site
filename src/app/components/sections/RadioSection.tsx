import { motion } from "motion/react";
import { Radio, BookOpen, Shield, Globe, PlayCircle } from "lucide-react";
import { Link } from "react-router";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function RadioSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation("home");
  return (
    <section id="radio" ref={ref} className="relative py-24 overflow-hidden bg-[#1C2A10]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&h=800&fit=crop&auto=format"
          alt="Radio studio"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2A10] via-[#1C2A10]/85 to-[#4E6132]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 bg-[#BC8A5F]/15 border border-[#BC8A5F]/30 rounded-full px-4 py-2 mb-6">
              <Radio size={14} className="text-[#BC8A5F]" />
              <span className="text-[#BC8A5F] text-xs font-bold uppercase tracking-widest">{t("radio.nowPlaying")}</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            <img 
              src="/assets/Inkoramutima-Logo.jpg" 
              alt={t("radio.title")} 
              className="h-16 lg:h-20 w-auto mb-6"
            />
            <p className="text-white/60 text-lg italic mb-2">&ldquo;Voice of the Heart&rdquo;</p>
            <p 
              className="text-white/75 text-base leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: t("radio.desc") }}
            />

            <div className="grid grid-cols-3 gap-4 mb-8">
              {([
                { icon: BookOpen, label: "Evangelization" },
                { icon: Shield, label: "Unity" },
                { icon: Globe, label: "Development" },
              ] as const).map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/8 border border-white/10 rounded-xl p-4 text-center">
                  <Icon size={20} className="text-[#BC8A5F] mx-auto mb-2" />
                  <div className="text-white text-xs font-semibold">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link to="/radio" className="inline-flex items-center gap-2 bg-[#BC8A5F] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#4E6132] transition-all duration-300 hover:scale-105 text-sm">
                <PlayCircle size={16} /> {t("radio.listenBtn")}
              </Link>
              <Link
                to="/radio#programs"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm"
              >
                {t("radio.scheduleBtn")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-[#BC8A5F]/10 border border-[#BC8A5F]/20 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-[#BC8A5F]/15 border border-[#BC8A5F]/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-[#BC8A5F]/20 border border-[#BC8A5F]/40 flex items-center justify-center">
                    <div className="text-center">
                      <Radio size={40} className="text-[#BC8A5F] mx-auto mb-2" />
                      <div className="font-['Outfit'] font-black text-white text-3xl">107.1</div>
                      <div className="text-[#BC8A5F] text-sm font-semibold">FM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-[#BC8A5F]/20 animate-ping" style={{ animationDuration: "3s" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
