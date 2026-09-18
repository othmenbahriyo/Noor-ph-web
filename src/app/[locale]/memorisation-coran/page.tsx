import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/MemorisationCoran/Hero';
import Intro from '@/components/MemorisationCoran/Intro';
import Features from '@/components/MemorisationCoran/Features';
import Screenshots from '@/components/MemorisationCoran/Screenshots';
import Faq from '@/components/MemorisationCoran/Faq';
import Related from '@/components/MemorisationCoran/Related';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/memorisation-coran';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'memorisationCoran.meta' });

  const canonicalPath = locale === 'en' ? `/en${PAGE_PATH}` : PAGE_PATH;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Noor Phonetic Quran' }],
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${SITE_URL}${PAGE_PATH}`,
        en: `${SITE_URL}/en${PAGE_PATH}`,
        'x-default': `${SITE_URL}${PAGE_PATH}`,
      },
    },
    icons: {
      icon: '/images/logo.webp',
      apple: '/images/logo.webp',
    },
    manifest: '/manifest.json',
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonicalUrl,
      siteName: 'Noor Phonetic Quran',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/noor.png`,
        },
      ],
    },
  };
}

function buildJsonLd(
  faqItems: { question: string; answer: string }[],
  howToTitle: string,
  howToSteps: { title: string; description: string }[],
) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Mémorisation du Coran', item: `${SITE_URL}${PAGE_PATH}` },
    ],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howToTitle,
    step: howToSteps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.description,
    })),
  };

  return [breadcrumb, faqPage, howTo];
}

export default async function MemorisationCoranPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'memorisationCoran.faq' });
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];
  const tFeatures = await getTranslations({ locale, namespace: 'memorisationCoran.features' });
  const howToSteps = tFeatures.raw('items') as { title: string; description: string }[];
  const jsonLd = buildJsonLd(faqItems, tFeatures('title'), howToSteps);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <main className={styles.main}>
        <Intro />
        <Features />
        <Screenshots />
        <Faq />
        <Related />
      </main>
      <Footer />
    </>
  );
}
