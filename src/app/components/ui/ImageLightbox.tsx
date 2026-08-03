import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export function ImageLightbox({ images, selectedIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    if (selectedIndex !== null) {
      setCurrentIdx(selectedIndex);
    }
  }, [selectedIndex]);

  const handleIndexChange = (newIndex: number) => {
    setCurrentIdx(newIndex);
    if (onNavigate) {
      onNavigate(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIdx < images.length - 1) {
      handleIndexChange(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      handleIndexChange(currentIdx - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, currentIdx, images.length]);

  if (selectedIndex === null || !images[currentIdx] || typeof document === "undefined") return null;

  const currentPhoto = images[currentIdx];
  const isFirstPhoto = currentIdx === 0;
  const isLastPhoto = currentIdx === images.length - 1;
  const showNav = images.length > 1;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center select-none"
        style={{ background: "rgba(0, 0, 0, 0.92)" }}
      >
        {/* Close Button — top right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-7 z-20 bg-transparent hover:bg-white/10 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
          aria-label="Close lightbox"
        >
          <X size={22} />
        </button>

        {/* Prev Button */}
        {showNav && (
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={isFirstPhoto}
            className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-11 h-11 flex items-center justify-center transition-all ${
              isFirstPhoto
                ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 opacity-50"
                : "bg-black/60 hover:bg-black/80 text-white cursor-pointer hover:scale-105 shadow-lg"
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Next Button */}
        {showNav && (
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            disabled={isLastPhoto}
            className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-11 h-11 flex items-center justify-center transition-all ${
              isLastPhoto
                ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 opacity-50"
                : "bg-black/60 hover:bg-black/80 text-white cursor-pointer hover:scale-105 shadow-lg"
            }`}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Full-height flex column: image centered in remaining space, thumbs at bottom edge */}
        <div className="flex flex-col w-full h-full">
          {/* Image area — flex-1 centers the image vertically in whatever space is left */}
          <div className="flex-1 flex items-center justify-center min-h-0 px-16 sm:px-20 py-6">
            <div className="relative flex items-center justify-center">
              <motion.img
                key={currentIdx}
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                src={currentPhoto.src}
                alt={currentPhoto.alt || ""}
                className="block rounded-md shadow-2xl"
                style={{
                  maxWidth: "68vw",
                  maxHeight: showNav ? "56vh" : "64vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* Counter — overlaid inside the image, bottom center */}
              {showNav && (
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm font-medium tracking-wide px-3 py-1 rounded-full"
                  style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(2px)" }}
                >
                  {currentIdx + 1} / {images.length}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail strip — pinned at the very bottom edge */}
          {showNav && (
            <div
              className="flex-shrink-0 flex gap-2.5 justify-center overflow-x-auto max-w-full px-4 py-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.3) transparent" }}
            >
              {images.map((thumb, idx) => (
                <button
                  key={idx}
                  ref={(el) => {
                    if (idx === currentIdx && el) {
                      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
                    }
                  }}
                  onClick={() => handleIndexChange(idx)}
                  className={`flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    idx === currentIdx
                      ? "border-[#d4af37] opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={thumb.src} alt={thumb.alt || ""} className="w-full h-full object-cover block" />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
