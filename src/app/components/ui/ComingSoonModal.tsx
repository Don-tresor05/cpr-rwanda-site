import { createContext, useContext, useState, type ReactNode } from "react";
import { Construction, Clock, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "./dialog";

interface ComingSoonContextType {
  showComingSoon: (title: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType>({
  showComingSoon: () => {},
});

export function useComingSoon() {
  return useContext(ComingSoonContext);
}

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const showComingSoon = (title: string) => {
    setPageTitle(title);
    setOpen(true);
  };

  return (
    <ComingSoonContext.Provider value={{ showComingSoon }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-[#F5F5DC] border-[#4E6132]/20 p-0 overflow-hidden rounded-2xl shadow-2xl">
          {/* Decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-[#4E6132] via-[#8B6543] to-[#BC8A5F]" />

          <div className="p-8 text-center relative">
            {/* Close button */}
            <DialogClose className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#4E6132]/10 hover:bg-[#4E6132]/20 flex items-center justify-center transition-colors">
              <X size={14} className="text-[#4E6132]" />
            </DialogClose>

            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#4E6132]/5 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#8B6543]/5 blur-2xl pointer-events-none" />

            {/* Icon */}
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 rounded-2xl bg-[#4E6132]/10 border border-[#4E6132]/20 flex items-center justify-center">
                <div className="relative">
                  <Construction size={28} className="text-[#4E6132]" />
                  <Sparkles
                    size={14}
                    className="text-[#BC8A5F] absolute -top-2 -right-3"
                  />
                </div>
              </div>
              <div
                className="absolute -inset-2 rounded-2xl animate-ping opacity-20"
                style={{ border: "1px solid #4E6132", animationDuration: "3s" }}
              />
            </div>

            {/* Tag */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#4E6132]/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4E6132]/50">
                Coming Soon
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#4E6132]/30" />
            </div>

            {/* Title */}
            <h3 className="font-['Outfit'] font-black text-2xl text-[#4E6132] mb-3 leading-tight">
              {pageTitle}
            </h3>

            {/* Description */}
            <p className="text-[#4A4A4A]/70 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
              This page is currently under development. We&apos;re working hard to bring you this content soon.
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-[#4E6132]/8 border border-[#4E6132]/15 rounded-full px-4 py-2">
              <Clock size={13} className="text-[#4E6132]" />
              <span className="text-xs font-medium text-[#4E6132]/70">
                We&apos;ll notify you once it&apos;s ready
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ComingSoonContext.Provider>
  );
}
