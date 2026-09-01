import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client as sanityClient } from "../../lib/sanityClient";

/**
 * Global site settings layer.
 *
 * Staff edit ONE `siteSettings` document in the Sanity Studio to control the
 * hero slides, statistics, contact details, social links, radio info and the
 * partner list across the whole site. The `useSiteSettings()` hook returns
 * `null` while the document is missing or Sanity is unreachable, so every
 * section keeps showing its current hardcoded content until staff fill it in.
 */

export interface LocalizedField {
  en?: string;
  fr?: string;
  rw?: string;
}

export interface HeroSlideSettings {
  image?: string;
  label?: LocalizedField;
  title?: LocalizedField;
  subtitle?: LocalizedField;
  desc?: LocalizedField;
  cta?: LocalizedField;
  ctaHref?: string;
  ctaSecondary?: LocalizedField;
  ctaSecondaryHref?: string;
}

export interface StatSettings {
  value?: number;
  suffix?: string;
  icon?: string;
  label?: LocalizedField;
}

export interface SocialLink {
  platform?: string;
  url?: string;
}

export interface ContactSettings {
  phone?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  socials?: SocialLink[];
}

export interface RadioSettings {
  frequency?: string;
  tagline?: LocalizedField;
  listenUrl?: string;
}

export interface SiteSettings {
  heroSlides?: HeroSlideSettings[];
  stats?: StatSettings[];
  contact?: ContactSettings;
  radio?: RadioSettings;
  partners?: string[];
}

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  heroSlides[] {
    "image": image.asset->url,
    label,
    title,
    subtitle,
    desc,
    cta,
    ctaHref,
    ctaSecondary,
    ctaSecondaryHref
  },
  stats[] { value, suffix, icon, label },
  contact {
    phone,
    email,
    addressLine1,
    addressLine2,
    socials[] { platform, url }
  },
  radio { frequency, tagline, listenUrl },
  partners
}`;

/** Current values used until staff edit them in the CMS. */
export const FALLBACK_CONTACT: Required<Pick<ContactSettings, "phone" | "email" | "addressLine1" | "addressLine2">> & {
  socials?: SocialLink[];
} = {
  phone: "+250 788 314 718",
  email: "cprgs@cpr-rwanda.rw",
  addressLine1: "KG 2 Av 4, B.P 79",
  addressLine2: "Kigali, Rwanda",
  socials: [
    { platform: "facebook", url: "https://www.facebook.com/cprrwanda" },
    { platform: "x", url: "https://x.com/cprrwanda" },
    { platform: "instagram", url: "https://www.instagram.com/cprrwanda" },
    { platform: "youtube", url: "https://youtube.com/@cprrwanda" },
  ],
};

export const FALLBACK_RADIO: RadioSettings = {
  frequency: "107.1",
  tagline: { en: "Voice of the Protestant Council in Rwanda" },
};

export const FALLBACK_PARTNERS: string[] = [
  "ACT Alliance", "AACC", "CWM", "DanChurchAid", "EAPPI",
  "Norwegian Church Aid", "Presbyterian Church USA", "Reformed Church",
  "UNHCR Rwanda", "World Vision", "UNICEF", "GIZ",
];

function pick(obj: LocalizedField | null | undefined, lang: string): string {
  if (!obj) return "";
  const key = lang === "fr" || lang === "rw" ? lang : "en";
  return obj[key] || obj.en || "";
}

export function pickOrUndef(obj: LocalizedField | null | undefined, lang: string): string | undefined {
  const value = pick(obj, lang);
  return value || undefined;
}

/**
 * Loads the global site settings from Sanity. Returns `null` when the
 * document doesn't exist (or Sanity is unreachable) so callers keep showing
 * their hardcoded content. Re-fetches when the UI language changes.
 */
export function useSiteSettings(): SiteSettings | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSettings(null);
    sanityClient
      .fetch<SiteSettings>(SITE_SETTINGS_QUERY)
      .then((doc) => {
        if (cancelled) return;
        if (!doc || (!doc.heroSlides && !doc.stats && !doc.contact && !doc.radio && !doc.partners)) {
          setSettings(null);
          return;
        }
        setSettings({
          heroSlides: (doc.heroSlides || []).map((s) => ({
            image: s.image || undefined,
            label: pickOrUndef(s.label, lang),
            title: pickOrUndef(s.title, lang),
            subtitle: pickOrUndef(s.subtitle, lang),
            desc: pickOrUndef(s.desc, lang),
            cta: pickOrUndef(s.cta, lang),
            ctaHref: s.ctaHref || undefined,
            ctaSecondary: pickOrUndef(s.ctaSecondary, lang),
            ctaSecondaryHref: s.ctaSecondaryHref || undefined,
          })),
          stats: (doc.stats || []).map((s) => ({
            value: s.value,
            suffix: s.suffix || "",
            icon: s.icon || "church",
            label: pickOrUndef(s.label, lang),
          })),
          contact: doc.contact || undefined,
          radio: doc.radio || undefined,
          partners: doc.partners || undefined,
        });
      })
      .catch(() => {
        if (!cancelled) setSettings(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return settings;
}
