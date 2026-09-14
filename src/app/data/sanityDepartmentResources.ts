import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client as sanityClient } from "../../lib/sanityClient";
import { pickOrUndef, type LocalizedField } from "./siteSettings";
import { formatCmsDate } from "./sanityNews";

export interface CmsResourceFile {
  name: string;
  url: string;
  info?: string;
  modified?: string;
}

export interface CmsDepartmentDetail {
  title?: string;
  image?: string;
  overview?: string;
  keyActivities?: string[];
  headName?: string;
  headRole?: string;
  headPhoto?: string;
}

interface SanityDepartmentDetailDoc {
  title?: LocalizedField;
  image?: string | null;
  overview?: LocalizedField;
  keyActivities?: LocalizedField[];
  headName?: string;
  headRole?: LocalizedField;
  headPhoto?: string | null;
}

const DEPARTMENT_DETAIL_QUERY = `*[_type == "departmentDetail" && department == $dept][0] {
  title,
  "image": image.asset->url,
  overview,
  keyActivities,
  headName,
  headRole,
  "headPhoto": headPhoto.asset->url
}`;

/**
 * The hero/overview/key-activities/department-head copy for one
 * department's detail page, fetched live from Sanity. Returns `null` when
 * no document exists yet (or while loading) so the page keeps showing its
 * translated hardcoded copy.
 */
export function useCmsDepartmentDetail(deptId?: string): CmsDepartmentDetail | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [detail, setDetail] = useState<CmsDepartmentDetail | null>(null);

  useEffect(() => {
    if (!deptId) return;
    let cancelled = false;
    setDetail(null);
    sanityClient
      .fetch<SanityDepartmentDetailDoc>(DEPARTMENT_DETAIL_QUERY, { dept: deptId })
      .then((doc) => {
        if (cancelled) return;
        if (!doc) {
          setDetail(null);
          return;
        }
        setDetail({
          title: pickOrUndef(doc.title, lang),
          image: doc.image || undefined,
          overview: pickOrUndef(doc.overview, lang),
          keyActivities: (doc.keyActivities || [])
            .map((item) => pickOrUndef(item, lang) || "")
            .filter(Boolean),
          headName: doc.headName || undefined,
          headRole: pickOrUndef(doc.headRole, lang),
          headPhoto: doc.headPhoto || undefined,
        });
      })
      .catch(() => {
        if (!cancelled) setDetail(null);
      });
    return () => {
      cancelled = true;
    };
  }, [deptId, lang]);

  return detail;
}

export interface CmsDepartmentActivity {
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
}

interface SanityDepartmentActivityDoc {
  _id: string;
  title?: LocalizedField;
  date?: string;
  periodLabel?: string;
  excerpt?: LocalizedField;
  image?: string | null;
}

const ACTIVITIES_QUERY = `*[_type == "departmentActivity" && department == $dept] | order(date desc) {
  _id, title, date, periodLabel, excerpt, "image": image.asset->url
}`;

/**
 * The "Activities & Milestones" timeline cards for one department,
 * newest first, fetched live from Sanity. Returns `null` when there are no
 * published activities yet so the page hides that section entirely.
 */
export function useCmsDepartmentActivities(deptId?: string): CmsDepartmentActivity[] | null {
  const { i18n } = useTranslation("home");
  const lang = (i18n.language || "en").substring(0, 2);
  const [activities, setActivities] = useState<CmsDepartmentActivity[] | null>(null);

  useEffect(() => {
    if (!deptId) return;
    let cancelled = false;
    setActivities(null);
    sanityClient
      .fetch<SanityDepartmentActivityDoc[]>(ACTIVITIES_QUERY, { dept: deptId })
      .then((docs) => {
        if (cancelled) return;
        const mapped = (docs || [])
          .map((d) => ({
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
  }, [deptId, lang]);

  return activities;
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

const GROUPS_QUERY = `*[_type == "departmentResourceGroup" && department == $dept] | order(order asc) {
  _id, title, slug, description, cardType
}`;

const FILES_QUERY = `*[_type == "departmentResourceFile" && group->slug.current == $slug] | order(order asc) {
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

/** All resource-group cards for a department, fetched live from Sanity. */
export function useCmsResourceGroups(deptId?: string): CmsResourceGroup[] | null {
  const [groups, setGroups] = useState<CmsResourceGroup[] | null>(null);

  useEffect(() => {
    if (!deptId) return;
    let cancelled = false;
    setGroups(null);
    sanityClient
      .fetch<SanityGroupDoc[]>(GROUPS_QUERY, { dept: deptId })
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
  }, [deptId]);

  return groups;
}

/** Files inside one resource group, fetched live from Sanity. */
export function useCmsResourceFiles(groupSlug?: string): CmsResourceFile[] | null {
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
