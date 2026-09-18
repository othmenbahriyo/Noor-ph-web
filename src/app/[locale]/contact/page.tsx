import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/Footer/ContactSection';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage.meta' });
  const { canonicalUrl, languages } = buildLocaleUrls(locale, '/contact');

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

function buildJsonLd(
  locale: string,
  breadcrumbLabels: { home: string; contact: string },
) {
  const { canonicalUrl, languages } = buildLocaleUrls(locale, '/contact');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumbLabels.home,
        item: languages[locale],
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbLabels.contact,
        item: canonicalUrl,
      },
    ],
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations('common.nav');
  const jsonLd = buildJsonLd(locale, {
    home: tNav('home'),
    contact: tNav('contactBreadcrumb'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ContactSection standalone />
      <Footer />
    </>
  );
}
