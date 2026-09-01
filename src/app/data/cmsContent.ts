import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client as sanityClient } from "../../lib/sanityClient";
import { pickOrUndef, type LocalizedField } from "./siteSettings";
import {
  Crown,
  GraduationCap,
  Handshake,
  Coins,
  Users,
  Scale,
  Radio,
  Briefcase,
  Heart,
  type LucideIcon,
} from "lucide-react";
import type { MemberChurch, Department, Project } from "./departments";
import type { Testimonial } from "./testimonials";
import type { GalleryEvent, GalleryCategory } from "../pages/GalleryPage";

/**
 * Member churches & departments CMS layer.
 *
 * Staff edit `memberChurch` and `department` documents in the Sanity Studio
 * to control the two content grids on the home page. Both hooks return
 * `null` while the documents are missing or Sanity is unreachable, so the
 * sections keep showing the current hardcoded content until staff fill
 * the CMS in.
 */

const MEMBER_CHURCH_QUERY = `*[_type == "memberChurch"] | order(order asc) { name, url }`;

const DEPARTMENT_QUERY = `*[_type == "department"] | order(order asc) {
  icon,
  title,
  desc,
  link
}`;

/** Maps the icon keys staff pick in the CMS to the site's Lucide icons. */
const DEPT_ICON_MAP: Record<string, LucideIcon> = {
  crown: Crown,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  coins: Coins,
  users: Users,
  scale: Scale,
  radio: Radio,
};

/**
 * Loads the member church list from Sanity. Returns `null` when no church
 * documents exist yet (or Sanity is unreachable) so the section keeps
 * showing the hardcoded list.
 */
export function useMemberChurches(): MemberChurch[] | null {
  const [churches, setChurches] = useState<MemberChurch[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<{ name: string; url?: string | null }[]>(MEMBER_CHURCH_QUERY)
      .then((docs) => {
        if (cancelled) return;
        if (!docs || docs.length === 0) {
          setChurches(null);
          return;
        }
        setChurches(
          docs.map((d) => ({ name: d.name, url: d.url || undefined }))
        );
      })
      .catch(() => {
        if (!cancelled) setChurches(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return churches;
}

/**
 * Loads the department cards from Sanity, resolving each localized field to
 * the current UI language (empty languages fall back to English). Returns
 * `null` when no department documents exist yet so the section keeps showing
 * the translated hardcoded cards. Re-fetches when the language changes.
 */
export function useDepartments(): Department[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [departments, setDepartments] = useState<Department[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<
        { icon?: string; title?: LocalizedField; desc?: LocalizedField; link?: string }[]
      >(DEPARTMENT_QUERY)
      .then((docs) => {
        if (cancelled) return;
        // Only keep departments that have a title in at least one language,
        // so an incomplete draft can't render a broken card.
        const valid = (docs || []).filter(
          (d) => typeof d.title === "string" ? d.title : (d.title?.en || d.title?.fr || d.title?.rw)
        );
        if (valid.length === 0) {
          setDepartments(null);
          return;
        }
        setDepartments(
          valid.map((d) => ({
            icon: DEPT_ICON_MAP[d.icon || ""] || Crown,
            title: (typeof d.title === "string" ? d.title : pickOrUndef(d.title, lang)) || "",
            desc: pickOrUndef(d.desc, lang) || "",
            link: d.link || "/departments",
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setDepartments(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return departments;
}

const GALLERY_QUERY = `*[_type == "galleryCollection"] | order(publishedAt desc) {
  order,
  category,
  title,
  locationDate,
  images[] {
    "src": image.asset->url,
    alt
  }
}`;

/** The category keys the site's gallery filters understand. */
const VALID_GALLERY_CATEGORIES: GalleryCategory[] = [
  "conferences",
  "commemorations",
  "youth",
  "education",
];

interface GalleryRawEvent {
  category?: string;
  title?: LocalizedField | string;
  locationDate?: LocalizedField | string;
  images?: { src?: string | null; alt?: string }[];
}

/**
 * Loads the gallery collections from Sanity, resolving localized fields to
 * the current UI language and keeping only collections with a title in at
 * least one language. Returns `null` when no collections exist yet so the
 * page keeps showing the hardcoded photo albums.
 */
export function useGalleryEvents(): GalleryEvent[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [events, setEvents] = useState<GalleryEvent[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<GalleryRawEvent[]>(GALLERY_QUERY)
      .then((docs) => {
        if (cancelled) return;
        const valid = (docs || []).filter(
          (d) => typeof d.title === "string" ? d.title : (d.title?.en || d.title?.fr || d.title?.rw)
        );
        if (valid.length === 0) {
          setEvents(null);
          return;
        }
        setEvents(
          valid
            .map((d) => ({
              category: VALID_GALLERY_CATEGORIES.includes(d.category as GalleryCategory)
                ? (d.category as GalleryCategory)
                : "conferences",
              title: (typeof d.title === "string" ? d.title : pickOrUndef(d.title, lang)) || "",
              locationDate: (typeof d.locationDate === "string" ? d.locationDate : pickOrUndef(d.locationDate, lang)) || "",
              images: (d.images || [])
                .filter((img) => img.src)
                .map((img) => ({ src: img.src as string, alt: img.alt || "" })),
            }))
            // Drop collections that end up with no usable photos (e.g. all drafts).
            .filter((e) => e.images.length > 0)
        );
      })
      .catch(() => {
        if (!cancelled) setEvents(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return events;
}

export interface RadioProgram {
  time: string;
  title: string;
  desc: string;
}

const RADIO_PROGRAM_QUERY = `*[_type == "radioProgram"] | order(order asc) {
  time,
  title,
  desc
}`;

/**
 * Loads the radio programme schedule from Sanity, resolving localized
 * fields to the current UI language and keeping only programmes with a
 * title in at least one language. Returns `null` when no programmes exist
 * yet so the page keeps showing the hardcoded schedule.
 */
export function useRadioPrograms(): RadioProgram[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [programs, setPrograms] = useState<RadioProgram[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<{ time?: string; title?: LocalizedField; desc?: LocalizedField }[]>(
        RADIO_PROGRAM_QUERY
      )
      .then((docs) => {
        if (cancelled) return;
        const valid = (docs || []).filter(
          (d) => d.title?.en || d.title?.fr || d.title?.rw
        );
        if (valid.length === 0) {
          setPrograms(null);
          return;
        }
        setPrograms(
          valid.map((d) => ({
            time: d.time || "",
            title: pickOrUndef(d.title, lang) || "",
            desc: pickOrUndef(d.desc, lang) || "",
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setPrograms(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return programs;
}

const TESTIMONIAL_QUERY = `*[_type == "testimonial"] | order(order asc) {
  order,
  quote,
  author,
  role,
  "avatar": avatar.asset->url
}`;

/** Default profile photos used when a testimonial has no photo in the CMS. */
const FALLBACK_TESTIMONIAL_AVATARS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format",
];

/**
 * Loads the testimonials from Sanity, keeping only ones with a quote in at
 * least one language. Returns `null` when none exist yet so the section
 * keeps showing the hardcoded testimonials.
 */
export function useTestimonials(): Testimonial[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<
        { quote?: LocalizedField; author?: string; role?: LocalizedField; avatar?: string | null }[]
      >(TESTIMONIAL_QUERY)
      .then((docs) => {
        if (cancelled) return;
        const valid = (docs || []).filter(
          (d) => d.quote?.en || d.quote?.fr || d.quote?.rw
        );
        if (valid.length === 0) {
          setTestimonials(null);
          return;
        }
        setTestimonials(
          valid.map((d, i) => ({
            quote: pickOrUndef(d.quote, lang) || "",
            author: d.author || "CPR Member",
            role: pickOrUndef(d.role, lang) || "",
            avatar:
              d.avatar ||
              FALLBACK_TESTIMONIAL_AVATARS[i % FALLBACK_TESTIMONIAL_AVATARS.length],
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setTestimonials(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return testimonials;
}

const PROJECT_QUERY = `*[_type == "project"] | order(order asc) {
  order,
  icon,
  title,
  period,
  desc,
  highlights[] { en, fr, rw }
}`;

/** Maps the icon keys staff pick in the CMS to the site's Lucide icons. */
const PROJECT_ICON_MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  heart: Heart,
};

/**
 * Loads the featured projects from Sanity, resolving localized fields to
 * the current UI language and keeping only projects with a title in at
 * least one language. Returns `null` when none exist yet so the section
 * keeps showing the hardcoded projects.
 */
export function useProjects(): Project[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch<
        {
          icon?: string;
          title?: LocalizedField;
          period?: LocalizedField;
          desc?: LocalizedField;
          highlights?: LocalizedField[];
        }[]
      >(PROJECT_QUERY)
      .then((docs) => {
        if (cancelled) return;
        const valid = (docs || []).filter(
          (d) => d.title?.en || d.title?.fr || d.title?.rw
        );
        if (valid.length === 0) {
          setProjects(null);
          return;
        }
        setProjects(
          valid.map((d) => ({
            icon: PROJECT_ICON_MAP[d.icon || ""] || Briefcase,
            title: pickOrUndef(d.title, lang) || "",
            period: pickOrUndef(d.period, lang) || "",
            desc: pickOrUndef(d.desc, lang) || "",
            highlights: (d.highlights || [])
              .map((h) => pickOrUndef(h, lang) || "")
              .filter(Boolean),
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setProjects(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return projects;
}
