import type { MetadataRoute } from 'next';

const BASE_URL = 'https://noor-phonetic-quran.com';

const bilingualPaths = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/avis', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
];

const frenchOnlyPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cgu', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/khatma-coran', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/memorisation-coran', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/correction-recitation-coran', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/quiz-coran', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/audio-coran', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tajweed-coran', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of bilingualPaths) {
    entries.push({
      url: `${BASE_URL}${path}/`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: `${BASE_URL}${path}/`,
          en: `${BASE_URL}/en${path}/`,
        },
      },
    });
    entries.push({
      url: `${BASE_URL}/en${path}/`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: `${BASE_URL}${path}/`,
          en: `${BASE_URL}/en${path}/`,
        },
      },
    });
  }

  for (const { path, priority, changeFrequency } of frenchOnlyPaths) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    });
  }

  return entries;
}
