import {
  ChevronRight, ArrowRight, Phone, Mail,
  MapPin, Radio, Facebook, Instagram, Youtube
} from "lucide-react";
import { useComingSoon } from "../ui/ComingSoonModal";
import { getNavItems } from "../../data/navigation";
import { useTranslation } from "react-i18next";

function XIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation("common");
  const { showComingSoon } = useComingSoon();
  const navItems = getNavItems(t);
  
  return (
    <footer id="contact" className="bg-[#1C2A10] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center text-center mb-5">
              <img
                src="/assets/logo-1.jpg"
                alt="CPR Rwanda - Conseil Protestant du Rwanda"
                className="h-20 w-auto object-contain"
              />
              <span className="text-base font-bold text-[#8B6543] mt-3 leading-tight tracking-wide">
                Conseil Protestant du Rwanda (CPR)
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              {t("footer.desc")}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://www.facebook.com/cprrwanda" },
                { icon: XIcon, href: "https://x.com/cprrwanda" },
                { icon: Instagram, href: "https://www.instagram.com/cprrwanda" },
                { icon: Youtube, href: "https://youtube.com/@cprrwanda" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={`social-${index}`}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#8B6543] hover:text-[#060F1F] text-white/60 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#8B6543] mb-5">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/55 hover:text-[#8B6543] transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#8B6543] mb-5">{t("nav.departments")}</h4>
            <ul className="space-y-2.5">
              {[
                t("nav.generalSecretary"),
                t("nav.education"),
                t("nav.diakonia"),
                t("nav.finance"),
                t("nav.youthProgram"),
                t("nav.genderPromotion"),
                t("nav.radioStation")
              ].map((l) => (
                <li key={l}>
                  <a href="#departments" className="text-white/55 hover:text-[#8B6543] transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#8B6543] mb-5">{t("footer.contactUs")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#8B6543] mt-0.5 flex-shrink-0" />
                <span className="text-white/55 text-sm leading-relaxed">KG 2 Av 4, B.P 79<br />Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#8B6543] flex-shrink-0" />
                <a href="tel:+250788314718" className="text-white/55 hover:text-[#8B6543] transition-colors text-sm">+250 788 314 718</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#8B6543] flex-shrink-0" />
                <a href="mailto:cprgs@cpr-rwanda.rw" className="text-white/55 hover:text-[#8B6543] transition-colors text-sm">cprgs@cpr-rwanda.rw</a>
              </li>
              <li className="flex items-center gap-3">
                <Radio size={14} className="text-[#8B6543] flex-shrink-0" />
                <span className="text-white/55 text-sm">Radio Inkoramutima 107.1 FM</span>
              </li>
            </ul>

            {/* Contact form trigger */}
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 bg-[#8B6543] text-[#060F1F] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 w-full justify-center"
            >
              Send a Message <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>© {new Date().getFullYear()} Conseil Protestant du Rwanda. {t("footer.rights")}</span>
          <div className="flex gap-5">
            <button
              onClick={() => showComingSoon("Privacy Policy")}
              className="hover:text-white/70 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => showComingSoon("Terms of Service")}
              className="hover:text-white/70 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
