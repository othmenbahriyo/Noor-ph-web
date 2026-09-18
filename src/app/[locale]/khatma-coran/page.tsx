import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/KhatmaCoran/Hero';
import Intro from '@/components/KhatmaCoran/Intro';
import Features from '@/components/KhatmaCoran/Features';
import Screenshots from '@/components/KhatmaCoran/Screenshots';
import Faq from '@/components/KhatmaCoran/Faq';
import Related from '@/components/KhatmaCoran/Related';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/khatma-coran';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'khatmaCoran.meta' });

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

function buildJsonLd(faqItems: { question: string; answer: string }[]) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Khatma du Coran', item: `${SITE_URL}${PAGE_PATH}` },
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

  return [breadcrumb, faqPage];
}

export default async function KhatmaCoranPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'khatmaCoran.faq' });
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];
  const jsonLd = buildJsonLd(faqItems);

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
