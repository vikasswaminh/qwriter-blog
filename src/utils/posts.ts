import { getCollection, type CollectionEntry } from 'astro:content';

/** All non-draft posts (drafts hidden in production builds), newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Rough reading time in minutes from raw markdown body. */
export function readingTime(body: string): number {
  const match = body.match(/<span>(\d+)\s*min\s*read<\/span>/);
  if (match) {
    return parseInt(match[1], 10);
  }
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
