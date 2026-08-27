import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";
import {
  Menu, X, ChevronDown, ChevronRight, Phone, Mail,
  MapPin
} from "lucide-react";
import { getNavItems } from "../../data/navigation";
import { FALLBACK_CONTACT, useSiteSettings } from "../../data/siteSettings";
import type { NavItem } from "../../types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useComingSoon } from "../ui/ComingSoonModal";
import { useTranslation } from "react-i18next";

const COMING_SOON = new Set<string>([]);

function MegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const { t } = useTranslation("common");
  const { showComingSoon } = useComingSoon();
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
            <div className="text-xs font-bold text-[#4E6132]/75 uppercase tracking-widest mb-3 pb-2 border-b border-[#4E6132]/15">
              {col.heading}
            </div>
          )}
          <ul className="space-y-1">
            {col.links.map((link) => (
              <li key={link.label}>
                {COMING_SOON.has(link.href) ? (
                  <button
                    onClick={() => {
                      onClose();
                      showComingSoon(link.label);
                    }}
                    className="w-full text-left group flex flex-col gap-1 px-3.5 py-2.5 rounded-xl hover:bg-[#8B6543]/15 transition-all duration-200"
                  >
                    <span className="text-[15px] font-bold text-[#4E6132] group-hover:text-[#8B6543] transition-colors flex items-center justify-between">
                      <span>{link.label}</span>
                      <span className="text-[10px] font-medium text-[#BC8A5F]/60 group-hover:text-[#BC8A5F] transition-colors">{t("nav.comingSoon")}</span>
                    </span>
                    {link.desc && (
                      <span className="text-[13px] text-[#4E6132]/90 font-medium group-hover:text-[#8B6543] leading-snug transition-colors">{link.desc}</span>
                    )}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="group flex flex-col gap-1 px-3.5 py-2.5 rounded-xl hover:bg-[#8B6543]/15 transition-all duration-200"
                  >
                    <span className="text-[15px] font-bold text-[#4E6132] group-hover:text-[#8B6543] transition-colors flex items-center justify-between">
                      <span>{link.label}</span>
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#8B6543]" />
                    </span>
                    {link.desc && (
                      <span className="text-[13px] text-[#4E6132]/90 font-medium group-hover:text-[#8B6543] leading-snug transition-colors">{link.desc}</span>
                    )}
                  </Link>
                )}
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
  const { showComingSoon } = useComingSoon();
  const navItems = getNavItems(t);
  const settings = useSiteSettings();
  const contact = settings?.contact ?? FALLBACK_CONTACT;
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const mobileOpenRef = useRef(false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handler = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      const stickyNav = document.querySelector("[data-sticky-subnav]");
      let isStickyActive = false;
      if (stickyNav) {
        const rect = stickyNav.getBoundingClientRect();
        if (rect.top <= 100) {
          isStickyActive = true;
        }
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileOpenRef.current) {
        setHidden(true);
        setActiveMenu(null);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        if (!isStickyActive || currentScrollY <= 100) {
          setHidden(false);
        } else {
          setHidden(true);
        }
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);


  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:flex relative z-[80] bg-[#4E6132] text-white/70 text-sm py-2 px-6 items-center justify-between">
        <div className="flex items-center gap-5 font-medium">
          <span className="flex items-center gap-1.5"><Phone size={14} /><span>{contact.phone}</span></span>
          <span className="flex items-center gap-1.5"><Mail size={14} /><span>{contact.email}</span></span>
          <span className="flex items-center gap-1.5"><MapPin size={14} /><span>{contact.addressLine1}, {contact.addressLine2}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="full" />
          {/* Donate button - temporarily hidden
          <div className="h-4 w-px bg-white/20" />
          <button
            onClick={() => showComingSoon(t("nav.donate"))}
            className="bg-[#EAD196] text-[#4E6132] text-xs font-bold px-4 py-1 rounded-full hover:bg-[#d4b87a] transition-colors"
          >
            {t("nav.donate")}
          </button>
          */}
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-[70] transition-all duration-300 ${
          hidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[#F5F5DC]/95 backdrop-blur-2xl shadow-lg border-b border-[#4E6132]/10"
            : "bg-[#F5F5DC] shadow-sm"
        }`}
      >
        <div className="w-full px-4 lg:px-8 flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center justify-center flex-shrink-0 text-center">
            <img
              src="/assets/logo-1.jpg"
              alt="CPR Rwanda - Conseil Protestant du Rwanda"
              className="h-14 lg:h-16 w-auto object-contain"
            />
            <span className="text-[11.5px] lg:text-[13.5px] font-extrabold text-[#8B6543] mt-1 leading-none tracking-wide">
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
                  {COMING_SOON.has(item.href) ? (
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        showComingSoon(item.label);
                      }}
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
                    </button>
                  ) : (
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
                  )}
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
              to="/contact"
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
                    {COMING_SOON.has(item.href) ? (
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#4E6132] hover:bg-[#4E6132]/15 transition-colors"
                        onClick={() => {
                          setMobileOpen(false);
                          showComingSoon(item.label);
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
                    ) : item.children ? (
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
                      COMING_SOON.has(link.href) ? (
                        <button
                          key={link.label}
                          onClick={() => {
                            setMobileOpen(false);
                            showComingSoon(link.label);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#4E6132] hover:bg-[#4E6132]/15 rounded-xl transition-colors flex items-center justify-between"
                        >
                          <span>{link.label}</span>
                          <span className="text-[10px] font-medium text-[#BC8A5F]/50">{t("nav.comingSoon")}</span>
                        </button>
                      ) : (
                        <Link
                          key={link.label}
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2.5 text-sm font-semibold text-[#4E6132] hover:bg-[#4E6132]/15 rounded-xl transition-colors"
                        >
                          {link.label}
                        </Link>
                      )
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
                  <button
                    onClick={() => showComingSoon(t("nav.donate"))}
                    className="bg-[#EAD196] text-[#4E6132] text-sm font-bold px-5 py-3 rounded-xl text-center"
                  >
                    {t("nav.donate")}
                  </button>
                  <Link to="/contact" onClick={() => setMobileOpen(false)} className="bg-[#4E6132] text-white text-sm font-bold px-5 py-3 rounded-xl text-center">{t("nav.contact")}</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
