import { useCallback, useEffect, useRef, useState } from "react";

/**
 * "Our Partners" carousel — adapted from the sliding mechanism used on
 * cooperation.rw's "Who We Are" partners strip (a jQuery Slick carousel).
 *
 * Extracted from the live reference site's own Slick instance
 * (`$(el).slick('getSlick').options`):
 *   autoplay: true, autoplaySpeed: 5000, speed: 500, cssEase: "ease",
 *   infinite: true, pauseOnHover: true, arrows: false, dots: true,
 *   slidesToShow: 1, slidesToScroll: 1
 *
 * This component reproduces the same timing and behaviour using plain React
 * state instead of jQuery/Slick (this codebase has neither): a 500ms eased
 * slide every 5000ms, paused on hover, one dot per partner (matching
 * cooperation.rw's slidesToScroll: 1), and a play/stop toggle button. Several
 * logos stay visible at once (responsive, like cooperation.rw's overflow
 * effect) but the carousel advances one logo at a time, seamlessly looping
 * from the last logo back to the first.
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

function computeItemsPerView(width: number): number {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 480) return 2;
  return 1;
}

function useItemsPerView(): number {
  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window === "undefined" ? 1 : computeItemsPerView(window.innerWidth),
  );
  useEffect(() => {
    const update = () => setItemsPerView(computeItemsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return itemsPerView;
}

/**
 * True only on devices with a real mouse. Touch browsers fire a synthetic
 * mouseenter on tap (and often no matching mouseleave), which otherwise gets
 * "hover" stuck on and permanently pauses the autoplay on mobile.
 */
function usesRealHover(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const itemsPerView = useItemsPerView();
  const count = partners.length;
  const canSlide = count > itemsPerView;

  // One extra lap of the first `itemsPerView` items appended to the end so
  // the track can slide seamlessly from the last real logo back to the first.
  const track = canSlide ? [...partners, ...partners.slice(0, itemsPerView)] : partners;
  const trackLength = track.length;

  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const hoverCapable = useRef(usesRealHover());

  // Reset position whenever the responsive item count or the partner list changes.
  useEffect(() => {
    setIndex(0);
    setAnimated(false);
  }, [itemsPerView, count]);

  // Re-enable the transition on the next frame after any instant (no-transition) jump.
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // Autoplay — one logo at a time, on cooperation.rw's exact timing.
  useEffect(() => {
    if (!playing || hovered || !canSlide) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTOPLAY_SPEED);
    return () => window.clearInterval(id);
  }, [playing, hovered, canSlide]);

  // Seamless loop: once we've slid past the last real logo (into the
  // duplicated lead-in), snap back to index 0 without a visible jump.
  const handleTransitionEnd = useCallback(() => {
    if (index >= count) {
      setAnimated(false);
      setIndex(0);
    }
  }, [index, count]);

  const goTo = useCallback((i: number) => {
    setAnimated(true);
    setIndex(i);
  }, []);

  if (count === 0) return null;

  const activeDot = ((index % count) + count) % count;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => hoverCapable.current && setHovered(true)}
      onMouseLeave={() => hoverCapable.current && setHovered(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${(trackLength * 100) / itemsPerView}%`,
            transform: `translateX(-${(index * 100) / trackLength}%)`,
            transition: animated ? `transform ${TRANSITION_SPEED}ms ease` : "none",
          }}
        >
          {track.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center px-4"
              style={{ width: `${100 / trackLength}%` }}
            >
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
      </div>

      {canSlide && (
        <div className="relative h-8 mt-8">
          {/* Dot ("boules") pagination — one dot per partner, matching cooperation.rw */}
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            {partners.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeDot}
                onClick={() => goTo(i)}
                className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                  i === activeDot
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
