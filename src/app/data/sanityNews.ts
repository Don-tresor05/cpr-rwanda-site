import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client as sanityClient } from "../../lib/sanityClient";
import type { NewsArticle } from "./news";

/**
 * Sanity news layer.
 *
 * Staff publish `newsPost` documents in the Sanity Studio. This module fetches
 * them over the public CDN (no token required) and maps them into the same
 * `NewsArticle` shape the rest of the site uses. The `useCmsNews()` hook returns
 * `null` while the CMS is empty or unreachable, so pages keep showing their
 * hardcoded fallback content until staff add posts.
 */

export interface LocalizedText {
  en?: string;
  fr?: string;
  rw?: string;
}

interface SanityNewsPost {
  _id: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  author?: string;
  image?: string | null;
  imageCaption?: string;
  featured?: boolean;
  title?: LocalizedText;
  excerpt?: LocalizedText;
  quote?: LocalizedText;
  body?: { en?: unknown[]; fr?: unknown[]; rw?: unknown[] };
}

const NEWS_QUERY = `*[_type == "newsPost" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  category,
  publishedAt,
  author,
  featured,
  "image": coverImage.asset->url,
  imageCaption,
  title,
  excerpt,
  quote,
  body
}`;

const MONTHS: Record<string, string[]> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  fr: [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ],
  rw: [
    "Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicurasi", "Kamena",
    "Nyakanga", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza",
  ],
};

export function formatCmsDate(iso?: string, lang = "en"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const months = MONTHS[lang] || MONTHS.en;
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function pick(obj: LocalizedText | null | undefined, lang: string): string {
  if (!obj) return "";
  const key = lang === "fr" || lang === "rw" ? lang : "en";
  return obj[key] || obj.en || "";
}

function mapPost(post: SanityNewsPost, lang: string): NewsArticle {
  const body =
    post.body?.[lang === "fr" || lang === "rw" ? lang : "en"] || post.body?.en || [];
  return {
    slug: post.slug,
    date: formatCmsDate(post.publishedAt, lang),
    category: post.category || "Announcement",
    title: pick(post.title, lang),
    excerpt: pick(post.excerpt, lang),
    image: post.image || "/cpr/assets/CPR 3 - Copy.webp",
    imageCaption: post.imageCaption || undefined,
    author: post.author || undefined,
    quote: pick(post.quote, lang) || undefined,
    bodyBlocks: body as unknown[],
    featured: !!post.featured,
  };
}

/**
 * Loads news posts from Sanity. Returns `null` when there are no published
 * posts (or Sanity is unreachable) so callers fall back to hardcoded content.
 * Re-fetches whenever the UI language changes.
 */
export function useCmsNews(): NewsArticle[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [cmsNews, setCmsNews] = useState<NewsArticle[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setCmsNews(null);
    sanityClient
      .fetch<SanityNewsPost[]>(NEWS_QUERY)
      .then((docs) => {
        if (cancelled) return;
        const mapped = (docs || [])
          .map((d) => mapPost(d, lang))
          .filter((n) => n.title && n.slug);
        setCmsNews(mapped.length > 0 ? mapped : null);
      })
      .catch(() => {
        if (!cancelled) setCmsNews(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return cmsNews;
}
