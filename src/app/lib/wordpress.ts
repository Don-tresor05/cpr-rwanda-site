// ============================================================
// CPR Rwanda — WordPress Headless CMS Integration
// Base URL: https://cpr-rwanda.rw/cms/wp-json/wp/v2
// ============================================================

const WP_API_BASE = 'https://cpr-rwanda.rw/cms/wp-json/wp/v2';

// ─── TypeScript Interfaces ────────────────────────────────────

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  acf: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPDepartment {
  id: number;
  date: string;
  slug: string;
  status: 'publish' | 'draft';
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  acf: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  acf: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface PostQueryParams {
  per_page?: number;
  page?: number;
  categories?: number[];
  search?: string;
  orderby?: 'date' | 'title' | 'relevance';
  order?: 'asc' | 'desc';
  _embed?: boolean;
}

// ─── Core Fetcher ────────────────────────────────────────────

async function wpFetch<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
  const url = new URL(`${WP_API_BASE}/${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        url.searchParams.set(key, value.join(','));
      } else if (value === true) {
        url.searchParams.set(key, '1');
      } else {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`WordPress API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ─── API Methods ─────────────────────────────────────────────

export async function getPosts(params: PostQueryParams = {}): Promise<WPPost[]> {
  return wpFetch<WPPost[]>('posts', { _embed: true, ...params });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>('posts', { slug, _embed: true });
  return posts[0] ?? null;
}

export async function getDepartments(): Promise<WPDepartment[]> {
  return wpFetch<WPDepartment[]>('departments', { _embed: true, per_page: 100 });
}

export async function getDepartmentBySlug(slug: string): Promise<WPDepartment | null> {
  const depts = await wpFetch<WPDepartment[]>('departments', { slug, _embed: true });
  return depts[0] ?? null;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>('pages', { slug, _embed: true });
  return pages[0] ?? null;
}

export async function getCategories(): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>('categories', { per_page: 100 });
}

// ─── Helpers ─────────────────────────────────────────────────

export function getFeaturedImageUrl(
  item: WPPost | WPDepartment | WPPage,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
): string | null {
  const media = item._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  return media.media_details?.sizes?.[size]?.source_url ?? media.source_url;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function formatWPDate(isoDate: string, locale = 'en-RW'): string {
  return new Date(isoDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
