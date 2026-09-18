import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PrivacyPolicyContent from '@/components/Legal/PrivacyPolicyContent';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

const PAGE_PATH = '/privacy-policy';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPolicy.meta' });
  const { canonicalUrl, languages } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('title'),
    description: t('description'),
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

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, {
    home: tNav('home'),
    page: tNav('pages.privacyPolicy'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <PrivacyPolicyContent />
      <Footer />
    </>
  );
}
