import { useEffect, useState } from "react";
import { client as sanityClient } from "../../lib/sanityClient";

export interface CmsResourceFile {
  name: string;
  url: string;
  info?: string;
  modified?: string;
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
  _id, title, "file": file->{url, size}, _updatedAt
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
