import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown, ChevronRight, Phone, Mail,
  MapPin, Radio
} from "lucide-react";
import { NAV_ITEMS } from "../../data/navigation";
import type { NavItem } from "../../types";
import { LanguageSwitcher } from "./LanguageSwitcher";

function MegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (!item.children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[720px] max-w-[95vw] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 z-50 grid gap-6"
      style={{ gridTemplateColumns: `repeat(${item.children.length}, 1fr)` }}
      onMouseLeave={onClose}
    >
      {item.children.map((col) => (
        <div key={col.heading}>
          {col.heading && (
            <div className="text-xs font-semibold text-[#BC8A5F]/50 uppercase tracking-widest mb-3 pb-2 border-b border-[#BC8A5F]/10">
              {col.heading}
            </div>
          )}
          <ul className="space-y-1">
            {col.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-[#BC8A5F]/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-[#BC8A5F] group-hover:text-[#4E6132] transition-colors flex items-center gap-1.5">
                    {link.label}
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  {link.desc && (
                    <span className="text-xs text-[#4A4A4A]/70 leading-tight">{link.desc}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:flex bg-[#4E6132] text-white/80 text-xs py-2 px-6 items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Phone size={11} /><span>+250 788 314 718</span></span>
          <span className="flex items-center gap-1.5"><Mail size={11} /><span>cprgs@cpr-rwanda.rw</span></span>
          <span className="flex items-center gap-1.5"><MapPin size={11} /><span>KG 2 Av 4, B.P 79, Kigali-Rwanda</span></span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="full" />
          <div className="h-4 w-px bg-white/20" />
          <a href="#donate" className="bg-[#EAD196] text-[#4E6132] text-xs font-bold px-4 py-1 rounded-full hover:bg-[#d4b87a] transition-colors">
            Donate Now
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5F5DC]/95 backdrop-blur-2xl shadow-lg border-b border-[#BC8A5F]/10"
            : "bg-[#F5F5DC] shadow-sm"
        }`}
      >
        <div className="w-full px-4 lg:px-8 flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#home" className="flex flex-col items-center justify-center flex-shrink-0 text-center">
            <img
              src="/assets/logo.jpg"
              alt="CPR Rwanda - Conseil Protestant du Rwanda"
              className="h-14 lg:h-18 w-auto object-contain"
            />
            <span className="text-sm lg:text-base font-bold text-[#BC8A5F] mt-1 leading-none tracking-wide">
              Conseil Protestant du Rwanda (CPR)
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeMenu === item.label
                      ? "bg-[#BC8A5F]/8 text-[#BC8A5F]"
                      : "text-[#BC8A5F]/80 hover:text-[#BC8A5F] hover:bg-[#BC8A5F]/5"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </a>
                <AnimatePresence>
                  {activeMenu === item.label && item.children && (
                    <MegaMenu item={item} onClose={() => setActiveMenu(null)} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="bg-[#4E6132] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#3a4f26] transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#BC8A5F]/8 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} className="text-[#BC8A5F]" /> : <Menu size={22} className="text-[#BC8A5F]" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-[#BC8A5F]/10 bg-[#F5F5DC]"
            >
              <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#BC8A5F] hover:bg-[#BC8A5F]/5 transition-colors"
                      onClick={() => {
                        if (item.children) {
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && item.children && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-0.5">
                            {item.children.flatMap((col) => col.links).map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 text-sm text-[#4A4A4A] hover:text-[#BC8A5F] hover:bg-[#BC8A5F]/5 rounded-lg transition-colors"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="pt-3 pb-1 flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2 px-4 py-2">
                    <LanguageSwitcher />
                  </div>
                  <a href="#donate" className="bg-[#EAD196] text-[#4E6132] text-sm font-bold px-5 py-3 rounded-xl text-center">Donate Now</a>
                  <a href="#contact" className="bg-[#4E6132] text-white text-sm font-bold px-5 py-3 rounded-xl text-center">Contact Us</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
