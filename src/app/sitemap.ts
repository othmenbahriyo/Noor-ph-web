import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllBlogSlugs } from '@/lib/blog';

const BASE_URL = 'https://noor-phonetic-quran.com';
const DEFAULT_LOCALE = routing.defaultLocale;

// Fixed per-route dates instead of `new Date()` at request time: the latter
// reports every page as "modified today" on every crawl, which dilutes the
// freshness signal search engines use lastModified for. Bump a page's date
// by hand when its content actually changes.
const pages: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified: string;
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-09-18' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly', lastModified: '2026-09-19' },
  { path: '/avis', priority: 0.6, changeFrequency: 'weekly', lastModified: '2026-09-18' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-09-17' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-07-28' },
  { path: '/cgu', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-07-28' },
  { path: '/khatma-coran', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-17' },
  { path: '/memorisation-coran', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-17' },
  { path: '/correction-recitation-coran', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-18' },
  { path: '/quiz-coran', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-17' },
  { path: '/audio-coran', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-17' },
  { path: '/tajweed-coran', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-17' },
  { path: '/notre-histoire', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-09-20' },
  { path: '/ramadan-2027', priority: 0.6, changeFrequency: 'weekly', lastModified: '2026-09-20' },
];

// 'as-needed' localePrefix: the default locale has no prefix ("/"), every
// other locale is prefixed ("/en/", "/ar/", ...).
function localizedUrl(locale: string, path: string) {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const blogPostPages = getAllBlogSlugs().map((slug) => ({
    path: `/blog/${slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    lastModified: '2026-09-19',
  }));

  for (const { path, priority, changeFrequency, lastModified } of [...pages, ...blogPostPages]) {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    );

    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
