import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/KhatmaCoran/Hero';
import Calculator from '@/components/KhatmaCoran/Calculator';
import Intro from '@/components/KhatmaCoran/Intro';
import Features from '@/components/KhatmaCoran/Features';
import Screenshots from '@/components/KhatmaCoran/Screenshots';
import Faq from '@/components/KhatmaCoran/Faq';
import Related from '@/components/KhatmaCoran/Related';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';
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
  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Noor Phonetic Quran' }],
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: canonicalUrl,
      languages,
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
          width: 1200,
          height: 628,
        },
      ],
    },
  };
}

function buildJsonLd(
  locale: string,
  faqItems: { question: string; answer: string }[],
  howToTitle: string,
  howToSteps: { title: string; description: string }[],
  breadcrumbLabels: { home: string; page: string },
) {
  const { canonicalUrl, languages } = buildLocaleUrls(locale, PAGE_PATH);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumbLabels.home, item: languages[locale] },
      { '@type': 'ListItem', position: 2, name: breadcrumbLabels.page, item: canonicalUrl },
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

export default async function KhatmaCoranPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'khatmaCoran.faq' });
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];
  const tFeatures = await getTranslations({ locale, namespace: 'khatmaCoran.features' });
  const howToSteps = tFeatures.raw('items') as { title: string; description: string }[];
  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, faqItems, tFeatures('title'), howToSteps, {
    home: tNav('home'),
    page: tNav('pages.khatmaCoran'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <Calculator />
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
