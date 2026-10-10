import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildLocaleUrls, homeUrlFor, socialMetadata } from '@/i18n/seo';

/**
 * Pages de fonctionnalité génériques (Warsh/Qaloun, radio/TV, adhkar…) :
 * même structure que les pages Mémorisation / Suivi IA, contenu piloté par
 * un namespace de messages :
 *   meta { title, description, keywords, ogTitle, ogDescription }
 *   breadcrumb { home, current }
 *   hero { title, subtitle, googlePlay, appStore }
 *   intro { title, paragraphs[] }
 *   features { title, items[{ title, description }] }
 *   faq { title, items[{ question, answer }] }
 *   related { title }
 */
export interface FeaturePageConfig {
  /** Namespace des messages, ex. 'warshQaloun'. */
  namespace: string;
  /** Chemin de la page, ex. '/mushaf-warsh-qaloun'. */
  path: string;
  /** Clé de `common.nav.pages` (fil d'Ariane JSON-LD, liens « Découvrez aussi »). */
  navKey: string;
  /** Pages liées : chemin + clé de `common.nav.pages`. */
  related: { href: string; navKey: string }[];
}

export async function featurePageMetadata(
  config: FeaturePageConfig,
  locale: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `${config.namespace}.meta` });
  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, config.path);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Noor Phonetic Quran' }],
    robots: 'index, follow, max-image-preview:large',
    alternates: { canonical: canonicalUrl, languages },
    icons: { icon: '/images/logo.webp', apple: '/images/logo.webp' },
    manifest: '/manifest.json',
    ...socialMetadata(t('ogTitle'), t('ogDescription'), canonicalUrl, ogLocale),
  };
}

/** Fil d'Ariane, FAQ et étapes (HowTo) en JSON-LD. */
export async function featurePageJsonLd(config: FeaturePageConfig, locale: string) {
  const t = await getTranslations({ locale, namespace: config.namespace });
  const tNav = await getTranslations({ locale, namespace: 'common.nav' });
  const { canonicalUrl } = buildLocaleUrls(locale, config.path);
  const faqItems = t.raw('faq.items') as { question: string; answer: string }[];
  const steps = t.raw('features.items') as { title: string; description: string }[];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: tNav('home'), item: homeUrlFor(locale) },
        {
          '@type': 'ListItem',
          position: 2,
          name: tNav(`pages.${config.navKey}`),
          item: canonicalUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: t('features.title'),
      step: steps.map((step) => ({ '@type': 'HowToStep', name: step.title, text: step.description })),
    },
  ];
}
