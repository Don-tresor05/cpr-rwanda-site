import { useState, useEffect, useCallback } from 'react';
import {
  getPosts, getPostBySlug,
  getDepartments, getDepartmentBySlug,
  getPageBySlug, getCategories,
  type WPPost, type WPDepartment,
  type WPPage, type WPCategory,
  type PostQueryParams,
} from '../lib/wordpress';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useAsync<T>(fetcher: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) { setData(result); setLoading(false); }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  return { data, loading, error, refetch };
}

// Fetch news articles
export function usePosts(params: PostQueryParams = {}) {
  return useAsync<WPPost[]>(() => getPosts(params), [JSON.stringify(params)]);
}

// Fetch single article by slug
export function usePost(slug: string) {
  return useAsync<WPPost | null>(() => getPostBySlug(slug), [slug]);
}

// Fetch all departments
export function useDepartments() {
  return useAsync<WPDepartment[]>(() => getDepartments(), []);
}

// Fetch single department by slug
export function useDepartment(slug: string) {
  return useAsync<WPDepartment | null>(() => getDepartmentBySlug(slug), [slug]);
}

// Fetch a page by slug
export function usePage(slug: string) {
  return useAsync<WPPage | null>(() => getPageBySlug(slug), [slug]);
}

// Fetch all categories
export function useCategories() {
  return useAsync<WPCategory[]>(() => getCategories(), []);
}
