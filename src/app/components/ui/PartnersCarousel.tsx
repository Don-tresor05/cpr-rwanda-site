import { useCallback, useEffect, useRef, useState } from "react";

/**
 * "Our Partners" carousel — adapted from the sliding mechanism used on
 * cooperation.rw's "Who We Are" partners strip (a jQuery Slick carousel).
 *
 * Extracted from the live reference site's own Slick instance
 * (`$(el).slick('getSlick').options`):
 *   autoplay: true, autoplaySpeed: 5000, speed: 500, cssEase: "ease",
 *   infinite: true, pauseOnHover: true, arrows: false, dots: true
 *
 * This component reproduces the same timing and behaviour — a 500ms eased
 * slide every 5000ms, paused on hover, dot ("boules") pagination, and a
 * play/stop toggle button — using plain React state instead of jQuery/Slick,
 * since this codebase has neither. Logos are grouped into pages (rather than
 * Slick's single-slide-plus-overflow trick) since CPR currently has far
 * fewer partner logos than cooperation.rw.
 */

export interface PartnerItem {
  name: string;
  image?: string;
}

interface PartnersCarouselProps {
  partners: PartnerItem[];
}

const AUTOPLAY_SPEED = 5000; // ms — matches cooperation.rw's Slick autoplaySpeed
const TRANSITION_SPEED = 500; // ms — matches cooperation.rw's Slick speed

function computeItemsPerPage(width: number): number {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 480) return 2;
  return 1;
}

function useItemsPerPage(): number {
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window === "undefined" ? 1 : computeItemsPerPage(window.innerWidth),
  );
  useEffect(() => {
    const update = () => setItemsPerPage(computeItemsPerPage(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return itemsPerPage;
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const itemsPerPage = useItemsPerPage();
  const pageCount = Math.max(1, Math.ceil(partners.length / itemsPerPage));
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setPage((p) => (p >= pageCount ? 0 : p));
  }, [pageCount]);

  const goTo = useCallback(
    (index: number) => {
      setPage(((index % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  // Autoplay — mirrors Slick's autoplay + pauseOnHover
  useEffect(() => {
    if (!playing || hovered || pageCount <= 1) return;
    intervalRef.current = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, AUTOPLAY_SPEED);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [playing, hovered, pageCount]);

  if (partners.length === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            width: `${pageCount * 100}%`,
            transform: `translateX(-${(100 / pageCount) * page}%)`,
            transition: `transform ${TRANSITION_SPEED}ms ease`,
          }}
        >
          {Array.from({ length: pageCount }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex items-center justify-center flex-wrap gap-x-10 gap-y-6 px-6"
              style={{ width: `${100 / pageCount}%` }}
            >
              {partners
                .slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
                .map((partner, i) => (
                  <div key={`${pageIndex}-${i}`} className="flex items-center justify-center px-4">
                    {partner.image ? (
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="max-h-[70px] max-w-[200px] object-contain cursor-pointer"
                      />
                    ) : (
                      <div className="text-2xl font-black font-['Outfit'] text-[#4E6132] opacity-70 transition-all duration-300 hover:opacity-100 cursor-pointer">
                        {partner.name}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="relative h-8 mt-8">
          {/* Dot ("boules") pagination */}
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === page}
                onClick={() => goTo(i)}
                className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                  i === page
                    ? "bg-[#4E6132] border-[#4E6132] scale-125"
                    : "bg-transparent border-[#4E6132]/40 hover:border-[#4E6132]"
                }`}
              />
            ))}
          </div>

          {/* Play / stop toggle */}
          <button
            type="button"
            aria-pressed={playing}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setPlaying((p) => !p)}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#4E6132] text-white shadow-md transition-colors duration-200 hover:bg-[#3d4d28]"
          >
            {playing ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="0.5" y="0" width="3" height="10" fill="currentColor" />
                <rect x="6.5" y="0" width="3" height="10" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 0L10 5L0 10V0Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
