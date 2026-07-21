import {
  ChevronRight, ArrowRight, Phone, Mail,
  MapPin, Radio, Facebook, Twitter, Instagram, Youtube, Linkedin
} from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#1C2A10] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#4E6132] border border-[#EAD196]/30 flex items-center justify-center">
                <span className="text-[#EAD196] font-['Outfit'] font-black text-lg">C</span>
              </div>
              <div>
                <div className="font-['Outfit'] font-black text-white text-base leading-tight">CPR Rwanda</div>
                <div className="text-white/50 text-xs">Conseil Protestant du Rwanda</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Uniting Rwanda's Protestant churches since 1963 through faith, education, health, and sustainable community development.
            </p>
            <div className="flex gap-3">{([
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Linkedin, href: "#" },
] as const).map(({ icon: Icon, href }, index) => (
  <a
    key={`social-${index}`}
    href={href}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#EAD196] hover:text-[#4E6132] text-white/60 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#BC8A5F] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {["About CPR", "Vision & Mission", "Executive Committee", "SG Publications", "Our Partners", "Photo Gallery"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/55 hover:text-[#BC8A5F] transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#BC8A5F] mb-5">Departments</h4>
            <ul className="space-y-2.5">
              {["Education (BNEP)", "Gender & Health", "Evangelism", "Radio Inkoramutima", "Advocacy", "Sustainability"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/55 hover:text-[#BC8A5F] transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-widest text-[#BC8A5F] mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#BC8A5F] mt-0.5 flex-shrink-0" />
                <span className="text-white/55 text-sm leading-relaxed">KG 2 Av 4, B.P 79<br />Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#BC8A5F] flex-shrink-0" />
                <a href="tel:+250788314718" className="text-white/55 hover:text-[#BC8A5F] transition-colors text-sm">+250 788 314 718</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#BC8A5F] flex-shrink-0" />
                <a href="mailto:cprgs@cpr-rwanda.rw" className="text-white/55 hover:text-[#BC8A5F] transition-colors text-sm">cprgs@cpr-rwanda.rw</a>
              </li>
              <li className="flex items-center gap-3">
                <Radio size={14} className="text-[#BC8A5F] flex-shrink-0" />
                <span className="text-white/55 text-sm">Radio Inkoramutima 107.1 FM</span>
              </li>
            </ul>

            {/* Contact form trigger */}
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 bg-[#BC8A5F] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 w-full justify-center"
            >
              Send a Message <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>© {new Date().getFullYear()} Conseil Protestant du Rwanda. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
