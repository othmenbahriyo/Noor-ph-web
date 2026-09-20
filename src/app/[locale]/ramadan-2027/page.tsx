import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/Footer/ContactSection';
import Hero from '@/components/Ramadan2027/Hero';
import Prepare from '@/components/Ramadan2027/Prepare';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/ramadan-2027';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ramadan2027.meta' });
  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
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
  };
}

function buildJsonLd(locale: string, breadcrumbLabels: { home: string; page: string }) {
  const { canonicalUrl, languages } = buildLocaleUrls(locale, PAGE_PATH);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumbLabels.home, item: languages[locale] },
      { '@type': 'ListItem', position: 2, name: breadcrumbLabels.page, item: canonicalUrl },
    ],
  };

  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Ramadan 2027',
    startDate: '2027-02-18',
    endDate: '2027-03-19',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    description: breadcrumbLabels.page,
    location: {
      '@type': 'VirtualLocation',
      url: canonicalUrl,
    },
  };

  return [breadcrumb, event];
}

export default async function Ramadan2027Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, {
    home: tNav('home'),
    page: tNav('pages.ramadan2027'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <Prepare />
      <ContactSection />
      <Footer />
    </>
  );
}
