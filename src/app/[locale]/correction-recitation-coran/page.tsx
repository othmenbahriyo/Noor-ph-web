import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/CorrectionRecitation/Hero';
import Intro from '@/components/CorrectionRecitation/Intro';
import Steps from '@/components/CorrectionRecitation/Steps';
import Faq from '@/components/CorrectionRecitation/Faq';
import Related from '@/components/CorrectionRecitation/Related';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';
import contentStyles from '@/components/CorrectionRecitation/Content.module.css';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/correction-recitation-coran';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'correctionRecitation.meta' });
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
          alt: t('ogTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${SITE_URL}/images/noor.png`],
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

export default async function CorrectionRecitationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'correctionRecitation.faq' });
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];
  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, faqItems, {
    home: tNav('home'),
    page: tNav('pages.correctionRecitation'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <main className={contentStyles.main}>
        <div className="container">
          <Intro />
          <Steps />
          <Faq />
          <Related />
        </div>
      </main>
      <Footer />
    </>
  );
}
