import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const [active, setActive] = useState(0);
  const { t } = useTranslation("home");
  
  // Cast the translated array (it won't have the image/id properties initially, so we merge them or just rely on the static ones)
  const translatedSlides: any[] = t("hero.slides", { returnObjects: true }) as any[] || [];
  
  // We can merge the translated strings with the images from the static slides if we want,
  // but we can also just define the images inline here since we only have 3 slides.
  const slides = [
    { id: 1, image: "/assets/1.jpeg", ...translatedSlides[0] },
    { id: 2, image: "/assets/Primary.jpg", ...translatedSlides[1] },
    { id: 3, image: "/assets/Inkoramutima-Logo.jpg", ...translatedSlides[2] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    slides.forEach((s) => {
      if (s.image) {
        const img = new Image();
        img.src = s.image;
      }
    });
  }, []);

  const goTo = (idx: number) => {
    setActive(idx);
  };

  const slide = slides[active];

  return (
    <section id="home" className="relative h-[88vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-[#4E6132] bg-cover bg-center bg-no-repeat"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4E6132]/90 via-[#4E6132]/60 to-[#4E6132]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A35]/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EAD196] shadow-lg shadow-[#EAD196]/40" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#EAD196]/20 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-[#EAD196]/20 animate-spin" style={{ animationDuration: "6s" }} />
                </div>
                <span className="font-['Alex_Brush'] text-2xl lg:text-3xl text-[#EAD196]">{slide.label}</span>
              </div>

              <h1 className="font-['Outfit'] font-black text-5xl lg:text-7xl text-white leading-none tracking-tight mb-3">
                {slide.title}
              </h1>
              <p className="font-['Alex_Brush'] text-2xl lg:text-3xl text-[#EAD196] mb-5">
                &ldquo;{slide.subtitle}&rdquo;
              </p>
              <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                {slide.desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 bg-[#8B6543] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#a6784f] transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm"
                >
                  {slide.cta}
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#departments"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  {slide.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-500 rounded-full ${
              i === active ? "w-8 h-2 bg-[#BC8A5F]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 z-10 flex flex-col items-center gap-2 hidden lg:flex">
        <span className="text-white/40 text-[10px] tracking-widest uppercase rotate-90 origin-center translate-y-6">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
      </div>
    </section>
  );
}
