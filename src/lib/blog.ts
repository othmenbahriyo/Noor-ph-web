import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { routing } from '@/i18n/routing';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  readingMinutes: number;
}

const WORDS_PER_MINUTE = 200;

function estimateReadingMinutes(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

function readPostFile(slug: string, locale: string): { data: matter.GrayMatterFile<string>['data']; content: string } | null {
  const filePath = path.join(BLOG_DIR, slug, `${locale}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { data, content };
}

// Cover image per article, keyed by slug rather than stored in each
// frontmatter file: avoids repeating (and risking a typo on) the same path
// across 20 locale files per article.
const BLOG_POST_IMAGES: Record<string, string> = {
  'regles-de-tajweed-guide-complet': '/images/blog/tajweed-guide.webp',
  'methodes-memoriser-coran-facilement': '/images/blog/hifz-methods.webp',
  'tarbiya-al-atfal-ala-al-quran': '/images/blog/tarbiya-atfal.webp',
  'ilaj-sudubat-hifz-al-quran': '/images/blog/ilaj-hifz.webp',
};
const DEFAULT_BLOG_IMAGE = '/images/blog/hifz-methods.webp';

// Falls back to the French source article when a translation doesn't exist
// yet for a given locale, so every locale route stays resolvable even
// before an article has been translated into all 20 languages.
export function getBlogPost(slug: string, locale: string): BlogPost | null {
  const file = readPostFile(slug, locale) ?? readPostFile(slug, routing.defaultLocale);
  if (!file) return null;

  const { data, content } = file;
  return {
    slug,
    locale,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    category: data.category,
    image: BLOG_POST_IMAGES[slug] ?? DEFAULT_BLOG_IMAGE,
    content,
    readingMinutes: estimateReadingMinutes(content),
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getAllBlogPosts(locale: string): BlogPostMeta[] {
  return getAllBlogSlugs()
    .map((slug) => getBlogPost(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const RELATED_POSTS_LIMIT = 3;

// Same-category articles first (most topically relevant), then the rest,
// so every article links to others instead of dead-ending on a single
// product-page CTA — helps both internal linking and session duration.
export function getRelatedPosts(currentSlug: string, currentCategory: string, locale: string): BlogPostMeta[] {
  const others = getAllBlogPosts(locale).filter((post) => post.slug !== currentSlug);
  const sameCategory = others.filter((post) => post.category === currentCategory);
  const rest = others.filter((post) => post.category !== currentCategory);
  return [...sameCategory, ...rest].slice(0, RELATED_POSTS_LIMIT);
}

// Links each article to the app feature page it's most relevant to, so blog
// readers arriving from search can reach the higher-intent product pages
// (CTA, FAQ, HowTo schema) instead of dead-ending on the article.
export const BLOG_POST_RELATED_PAGE: Record<string, string> = {
  'regles-de-tajweed-guide-complet': '/tajweed-coran',
  'methodes-memoriser-coran-facilement': '/memorisation-coran',
  'tarbiya-al-atfal-ala-al-quran': '/memorisation-coran',
  'ilaj-sudubat-hifz-al-quran': '/memorisation-coran',
};
