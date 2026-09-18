import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CguContent from '@/components/Legal/CguContent';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

const PAGE_PATH = '/cgu';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cgu.meta' });
  const { canonicalUrl, languages } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages,
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

export default async function CguPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, {
    home: tNav('home'),
    page: tNav('pages.cgu'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <CguContent />
      </main>
      <Footer />
    </>
  );
}
