import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/Footer/ContactSection';
import Hero from '@/components/AboutUs/Hero';
import Story from '@/components/AboutUs/Story';
import Mission from '@/components/AboutUs/Mission';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/notre-histoire';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutUs.meta' });
  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('title'),
    description: t('description'),
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

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumbLabels.home, item: languages[locale] },
      { '@type': 'ListItem', position: 2, name: breadcrumbLabels.page, item: canonicalUrl },
    ],
  };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, {
    home: tNav('home'),
    page: tNav('pages.aboutUs'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <Story />
      <Mission />
      <ContactSection />
      <Footer />
    </>
  );
}
