import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/QuizCoran/Hero';
import Intro from '@/components/QuizCoran/Intro';
import Features from '@/components/QuizCoran/Features';
import Screenshots from '@/components/QuizCoran/Screenshots';
import Faq from '@/components/QuizCoran/Faq';
import Related from '@/components/QuizCoran/Related';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';
import styles from './page.module.css';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/quiz-coran';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quizCoran.meta' });
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
        },
      ],
    },
  };
}

function buildJsonLd(
  locale: string,
  faqItems: { question: string; answer: string }[],
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

  return [breadcrumb, faqPage];
}

export default async function QuizCoranPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'quizCoran.faq' });
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];
  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, faqItems, {
    home: tNav('home'),
    page: tNav('pages.quizCoran'),
  });

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
