import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllBlogSlugs } from '@/lib/blog';

const BASE_URL = 'https://noor-phonetic-quran.com';
const DEFAULT_LOCALE = routing.defaultLocale;

// Fixed per-route dates instead of `new Date()` at request time: the latter
// reports every page as "modified today" on every crawl, which dilutes the
// freshness signal search engines use lastModified for. Bump a page's date
// by hand when its content actually changes.
//
// No `priority`/`changeFrequency`: Google has ignored both for years and
// Bing gives them minimal weight, so they're dead weight across 500 URLs
// (20 locales x ~25 pages) rather than a real ranking signal.
const pages: {
  path: string;
  lastModified: string;
}[] = [
  { path: '', lastModified: '2026-09-18' },
  { path: '/blog', lastModified: '2026-09-19' },
  { path: '/avis', lastModified: '2026-09-18' },
  { path: '/contact', lastModified: '2026-09-17' },
  { path: '/privacy-policy', lastModified: '2026-07-28' },
  { path: '/cgu', lastModified: '2026-07-28' },
  { path: '/khatma-coran', lastModified: '2026-09-17' },
  { path: '/memorisation-coran', lastModified: '2026-09-17' },
  { path: '/correction-recitation-coran', lastModified: '2026-09-18' },
  { path: '/quiz-coran', lastModified: '2026-09-17' },
  { path: '/audio-coran', lastModified: '2026-09-17' },
  { path: '/tajweed-coran', lastModified: '2026-09-17' },
  { path: '/notre-histoire', lastModified: '2026-09-20' },
  { path: '/ramadan-2027', lastModified: '2026-09-20' },
  { path: '/suivi-recitation-ia', lastModified: '2026-10-10' },
  { path: '/mushaf-warsh-qaloun', lastModified: '2026-10-10' },
  { path: '/radio-tv-coran', lastModified: '2026-10-10' },
  { path: '/adhkar-matin-soir', lastModified: '2026-10-10' },
  { path: '/lire-coran-phonetique', lastModified: '2026-10-10' },
  { path: '/widget-verset-du-jour', lastModified: '2026-10-10' },
];

// 'as-needed' localePrefix: the default locale has no prefix ("/"), every
// other locale is prefixed ("/en", "/ar", ...). No trailing slash: Next.js
// (trailingSlash: false) 308-redirects "/khatma-coran/" to "/khatma-coran",
// so slash-terminated sitemap URLs were all redirects and didn't match the
// pages' canonical URLs (see buildLocaleUrls).
function localizedUrl(locale: string, path: string) {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const blogPostPages = getAllBlogSlugs().map((slug) => ({
    path: `/blog/${slug}`,
    lastModified: '2026-09-19',
  }));

  for (const { path, lastModified } of [...pages, ...blogPostPages]) {
    const languages: Record<string, string> = Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    );
    // Same alternates as the pages' <link rel="alternate"> (buildLocaleUrls).
    languages['x-default'] = localizedUrl(DEFAULT_LOCALE, path);

    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified,
        alternates: { languages },
      });
    }
  }

  return entries;
}
