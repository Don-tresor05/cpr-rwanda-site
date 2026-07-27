import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";
import {
  Menu, X, ChevronDown, ChevronRight, Phone, Mail,
  MapPin
} from "lucide-react";
import { getNavItems } from "../../data/navigation";
import type { NavItem } from "../../types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function MegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (!item.children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[720px] max-w-[95vw] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 z-[60] grid gap-6"
      style={{ gridTemplateColumns: `repeat(${item.children.length}, 1fr)` }}
      onMouseLeave={onClose}
    >
      {item.children.map((col) => (
        <div key={col.heading}>
          {col.heading && (
            <div className="text-xs font-semibold text-[#4E6132]/70 uppercase tracking-widest mb-3 pb-2 border-b border-[#4E6132]/10">
              {col.heading}
            </div>
          )}
          <ul className="space-y-1">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="group flex flex-col gap-0.5 px-3.5 py-2.5 rounded-xl hover:bg-[#8B6543]/15 transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-[#4E6132] group-hover:text-[#8B6543] transition-colors flex items-center justify-between">
                    <span>{link.label}</span>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#8B6543]" />
                  </span>
                  {link.desc && (
                    <span className="text-xs text-[#4E6132]/75 group-hover:text-[#8B6543]/90 leading-tight transition-colors">{link.desc}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

export function Header() {
  const { t } = useTranslation("common");
  const navItems = getNavItems(t);
  const location = useLocation();
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
            {t("nav.donate")}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5F5DC]/95 backdrop-blur-2xl shadow-lg border-b border-[#4E6132]/10"
            : "bg-[#F5F5DC] shadow-sm"
        }`}
      >
        <div className="w-full px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center justify-center flex-shrink-0 text-center">
            <img
              src="/assets/logo-1.jpg"
              alt="CPR Rwanda - Conseil Protestant du Rwanda"
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <span className="text-[10px] lg:text-xs font-bold text-[#8B6543] mt-0.5 leading-none tracking-wide">
              Conseil Protestant du Rwanda (CPR)
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeMenu === item.label || (item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href));
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#8B6543]/20 text-[#8B6543] font-bold shadow-sm"
                        : "text-[#4E6132] font-semibold hover:bg-[#8B6543]/20 hover:text-[#8B6543] hover:font-bold"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                  <AnimatePresence>
                    {activeMenu === item.label && item.children && (
                      <MegaMenu item={item} onClose={() => setActiveMenu(null)} />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/#contact"
              className="bg-[#4E6132] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#3a4f26] transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              {t("nav.contact")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#4E6132]/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} className="text-[#4E6132]" /> : <Menu size={22} className="text-[#4E6132]" />}
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
              className="lg:hidden overflow-hidden border-t border-[#4E6132]/10 bg-[#F5F5DC]"
            >
              <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#4E6132] hover:bg-[#4E6132]/15 transition-colors"
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#4E6132] hover:bg-[#4E6132]/15 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
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
                              <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 text-sm font-semibold text-[#4E6132] hover:bg-[#4E6132]/15 rounded-xl transition-colors"
                              >
                                {link.label}
                              </Link>
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
                  <a href="#donate" className="bg-[#EAD196] text-[#4E6132] text-sm font-bold px-5 py-3 rounded-xl text-center">{t("nav.donate")}</a>
                  <a href="#contact" className="bg-[#4E6132] text-white text-sm font-bold px-5 py-3 rounded-xl text-center">{t("nav.contact")}</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
