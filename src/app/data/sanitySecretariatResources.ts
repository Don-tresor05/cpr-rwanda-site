import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client as sanityClient } from "../../lib/sanityClient";
import { pickOrUndef, type LocalizedField } from "./siteSettings";
import { formatCmsDate } from "./sanityNews";

/** Picks the per-language portable-text body array, falling back to English. */
function pickBody(
  doc: { bodyEn?: any[]; bodyFr?: any[]; bodyRw?: any[] } | undefined,
  lang: string,
): any[] | undefined {
  if (!doc) return undefined;
  const localized = lang === "fr" ? doc.bodyFr : lang === "rw" ? doc.bodyRw : doc.bodyEn;
  return localized || doc.bodyEn;
}

export interface CmsResourceFile {
  name: string;
  url: string;
  info?: string;
  modified?: string;
}

export interface CmsSecretariatDetail {
  title?: string;
  image?: string;
  overview?: string;
  keyActivities?: string[];
  bodyBlocks?: any[];
  headName?: string;
  headRole?: string;
  headPhoto?: string;
}

interface SanitySecretariatDetailDoc {
  title?: LocalizedField;
  image?: string | null;
  overview?: LocalizedField;
  keyActivities?: LocalizedField[];
  bodyEn?: any[];
  bodyFr?: any[];
  bodyRw?: any[];
  headName?: string;
  headRole?: LocalizedField;
  headPhoto?: string | null;
}

const SECRETARIAT_DETAIL_QUERY = `*[_type == "secretariatDetail" && section == $section][0] {
  title,
  "image": image.asset->url,
  overview,
  keyActivities,
  bodyEn,
  bodyFr,
  bodyRw,
  headName,
  headRole,
  "headPhoto": headPhoto.asset->url
}`;

/**
 * The hero/overview/key-activities/section-head copy for one Secretariat
 * section's detail page, fetched live from Sanity. `data` is `null` when
 * no document exists yet (or while loading), so the page keeps showing its
 * translated hardcoded copy. `bodyBlocks` — the full, multi-paragraph
 * article (with headings and inline lists) — takes priority over the
 * simpler `overview` + `keyActivities` fields when an editor has filled it
 * in; the page falls back to those (or to the hardcoded copy) otherwise.
 *
 * `loading` is `true` until the first fetch for the current section
 * settles, so callers can hold off rendering CMS-vs-hardcoded-dependent UI
 * just long enough to avoid flashing the hardcoded fallback before the
 * real CMS content (section head photo, overview, key activities) swaps in
 * a moment later.
 */
export function useCmsSecretariatDetail(sectionId?: string): { data: CmsSecretariatDetail | null; loading: boolean } {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [detail, setDetail] = useState<CmsSecretariatDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    sanityClient
      .fetch<SanitySecretariatDetailDoc>(SECRETARIAT_DETAIL_QUERY, { section: sectionId })
      .then((doc) => {
        if (cancelled) return;
        if (!doc) {
          setDetail(null);
          setLoading(false);
          return;
        }
        setDetail({
          title: pickOrUndef(doc.title, lang),
          image: doc.image || undefined,
          overview: pickOrUndef(doc.overview, lang),
          keyActivities: (doc.keyActivities || [])
            .map((item) => pickOrUndef(item, lang) || "")
            .filter(Boolean),
          bodyBlocks: pickBody(doc, lang),
          headName: doc.headName || undefined,
          headRole: pickOrUndef(doc.headRole, lang),
          headPhoto: doc.headPhoto || undefined,
        });
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setDetail(null);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sectionId, lang]);

  return { data: detail, loading };
}

export interface CmsSecretariatActivity {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
}

interface SanitySecretariatActivityDoc {
  _id: string;
  slug?: { current: string };
  title?: LocalizedField;
  date?: string;
  periodLabel?: string;
  excerpt?: LocalizedField;
  image?: string | null;
}

const ACTIVITIES_QUERY = `*[_type == "secretariatActivity" && section == $section] | order(date desc) {
  _id, slug, title, date, periodLabel, excerpt, "image": image.asset->url
}`;

/**
 * The "Activities & Milestones" timeline cards for one Secretariat
 * section, newest first, fetched live from Sanity. Returns `null` when
 * there are no published activities yet so the page hides that section
 * entirely.
 */
export function useCmsSecretariatActivities(sectionId?: string): CmsSecretariatActivity[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [activities, setActivities] = useState<CmsSecretariatActivity[] | null>(null);

  useEffect(() => {
    if (!sectionId) return;
    let cancelled = false;
    setActivities(null);
    sanityClient
      .fetch<SanitySecretariatActivityDoc[]>(ACTIVITIES_QUERY, { section: sectionId })
      .then((docs) => {
        if (cancelled) return;
        const mapped = (docs || [])
          .map((d) => ({
            slug: d.slug?.current || d._id,
            title: pickOrUndef(d.title, lang) || "",
            date: d.periodLabel || formatCmsDate(d.date, lang),
            excerpt: pickOrUndef(d.excerpt, lang),
            image: d.image || undefined,
          }))
          .filter((a) => a.title);
        setActivities(mapped.length > 0 ? mapped : null);
      })
      .catch(() => {
        if (!cancelled) setActivities(null);
      });
    return () => {
      cancelled = true;
    };
  }, [sectionId, lang]);

  return activities;
}

export interface CmsSecretariatActivityDetail extends CmsSecretariatActivity {
  bodyBlocks?: any[];
  section?: string;
  author?: string;
  quote?: string;
  imageCaption?: string;
}

interface SanityActivityDetailDoc extends SanitySecretariatActivityDoc {
  bodyEn?: any[];
  bodyFr?: any[];
  bodyRw?: any[];
  section?: string;
  author?: string;
  quote?: LocalizedField;
  imageCaption?: string;
}

const ACTIVITY_DETAIL_QUERY = `*[_type == "secretariatActivity" && (slug.current == $slug || _id == $slug)][0] {
  _id, slug, title, date, periodLabel, excerpt, "image": image.asset->url, bodyEn, bodyFr, bodyRw, section, author, quote, imageCaption
}`;

/** Fetch a single Secretariat activity by its slug. */
export function useCmsSecretariatActivity(slug?: string): { data: CmsSecretariatActivityDetail | null; loading: boolean } {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [activity, setActivity] = useState<CmsSecretariatActivityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setActivity(null);
    setLoading(true);
    sanityClient
      .fetch<SanityActivityDetailDoc>(ACTIVITY_DETAIL_QUERY, { slug })
      .then((doc) => {
        if (cancelled) return;
        if (!doc) {
          setActivity(null);
          setLoading(false);
          return;
        }
        setActivity({
          slug: doc.slug?.current || doc._id,
          title: pickOrUndef(doc.title, lang) || "",
          date: doc.periodLabel || formatCmsDate(doc.date, lang),
          excerpt: pickOrUndef(doc.excerpt, lang),
          image: doc.image || undefined,
          bodyBlocks: pickBody(doc, lang),
          section: doc.section,
          author: doc.author,
          quote: pickOrUndef(doc.quote, lang),
          imageCaption: doc.imageCaption,
        });
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setActivity(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

  return { data: activity, loading };
}

export interface CmsResourceGroup {
  slug: string;
  title: string;
  description?: string;
  cardType: "document" | "download" | "link";
}

interface SanityGroupDoc {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  cardType?: "document" | "download" | "link";
}

interface SanityFileDoc {
  _id: string;
  title: string;
  file?: { url: string; size?: number };
  _updatedAt: string;
}

const GROUPS_QUERY = `*[_type == "secretariatResourceGroup" && section == $section] | order(order asc) {
  _id, title, slug, description, cardType
}`;

const FILES_QUERY = `*[_type == "secretariatResourceFile" && group->slug.current == $slug] | order(order asc) {
  _id, title, "file": file.asset->{url, size}, _updatedAt
}`;

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** All resource-group cards for a Secretariat section, fetched live from Sanity. */
export function useCmsSecretariatResourceGroups(sectionId?: string): CmsResourceGroup[] | null {
  const [groups, setGroups] = useState<CmsResourceGroup[] | null>(null);

  useEffect(() => {
    if (!sectionId) return;
    let cancelled = false;
    setGroups(null);
    sanityClient
      .fetch<SanityGroupDoc[]>(GROUPS_QUERY, { section: sectionId })
      .then((docs) => {
        if (cancelled) return;
        const mapped = (docs || []).map((d) => ({
          slug: d.slug.current,
          title: d.title,
          description: d.description,
          cardType: d.cardType || "document",
        }));
        setGroups(mapped.length > 0 ? mapped : null);
      })
      .catch(() => {
        if (!cancelled) setGroups(null);
      });
    return () => {
      cancelled = true;
    };
  }, [sectionId]);

  return groups;
}

/** Files inside one Secretariat resource group, fetched live from Sanity. */
export function useCmsSecretariatResourceFiles(groupSlug?: string): CmsResourceFile[] | null {
  const [files, setFiles] = useState<CmsResourceFile[] | null>(null);

  useEffect(() => {
    if (!groupSlug) return;
    let cancelled = false;
    setFiles(null);
    sanityClient
      .fetch<SanityFileDoc[]>(FILES_QUERY, { slug: groupSlug })
      .then((docs) => {
        if (cancelled) return;
        const mapped = (docs || [])
          .filter((d) => d.file?.url)
          .map((d) => ({
            name: d.title,
            url: d.file!.url as string,
            info: formatSize(d.file!.size),
            modified: formatDate(d._updatedAt),
          }));
        setFiles(mapped.length > 0 ? mapped : null);
      })
      .catch(() => {
        if (!cancelled) setFiles(null);
      });
    return () => {
      cancelled = true;
    };
  }, [groupSlug]);

  return files;
}
