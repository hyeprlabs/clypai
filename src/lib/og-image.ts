/**
 * Utility functions for OG image generation
 */

export const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface OGImageParams {
  title: string;
  author: string;
  date: Date | string;
  tags: string[];
}

/**
 * Generate OG image URL for a blog post
 * @param params - Blog post parameters (title, author, date, tags)
 * @param baseUrl - Base URL for the site (defaults to NEXT_PUBLIC_SITE_URL or localhost)
 * @returns Full URL for the OG image
 */
export function generateOGImageUrl(params: OGImageParams, baseUrl?: string): string {
  const base = baseUrl || DEFAULT_SITE_URL;
  const url = new URL('/api/og', base);
  
  url.searchParams.set('title', params.title);
  url.searchParams.set('author', params.author);
  url.searchParams.set('date', params.date.toString());
  url.searchParams.set('tags', params.tags.join(','));
  
  return url.toString();
}

/**
 * Generate relative OG image URL path (for client-side use)
 * @param params - Blog post parameters (title, author, date, tags)
 * @returns Relative URL path for the OG image
 */
export function generateOGImagePath(params: OGImageParams): string {
  const searchParams = new URLSearchParams({
    title: params.title,
    author: params.author,
    date: params.date.toString(),
    tags: params.tags.join(','),
  });
  
  return `/api/og?${searchParams.toString()}`;
}
