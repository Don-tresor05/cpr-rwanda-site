import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  label: string;
  flag: React.ReactNode;
}

const UKFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm flex-shrink-0">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>
);

const FranceFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm flex-shrink-0">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <path fill="#002654" d="M0 0h213.3v480H0z"/>
      <path fill="#CE1126" d="M426.7 0H640v480H426.7z"/>
    </g>
  </svg>
);

const RwandaFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm flex-shrink-0">
    <path fill="#20603D" d="M0 0h640v480H0z"/>
    <path fill="#FAD201" d="M0 300h640v180H0z"/>
    <path fill="#00A1DE" d="M0 420h640v60H0z"/>
    <path fill="#E5BE01" d="M380 152.4a172.4 172.4 0 1 1-344.8 0 172.4 172.4 0 0 1 344.8 0z"/>
    <path fill="#E5BE01" d="m414.8 107.4-51.4 43.9-63.6-27.5 27.8 63.3-43.3 51.8 64.2-26.6 63.1 28.6-27.3-63.8 42.4-52.4z"/>
  </svg>
);

const LANGUAGES: Language[] = [
  { code: "en", label: "EN", flag: <UKFlag /> },
  { code: "fr", label: "FR", flag: <FranceFlag /> },
  { code: "rw", label: "RW", flag: <RwandaFlag /> },
];

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  className?: string;
}

export function LanguageSwitcher({ variant = "compact", className = "" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Language>(LANGUAGES[0]);

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    setOpen(false);
    // Future: trigger language change here
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium"
        aria-label={`Language: ${selected.label}. Click to change`}
      >
        {selected.flag}
        <span className={`${variant === "full" ? "inline" : "inline lg:hidden"}`}>
          {selected.label}
        </span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 w-32 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-[#4E6132]/10 overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-[#4A4A4A] hover:bg-[#4E6132]/5 transition-colors"
              >
                {lang.flag}
                <span>{lang.label}</span>
                {selected.code === lang.code && (
                  <Check size={12} className="ml-auto text-[#4E6132]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
