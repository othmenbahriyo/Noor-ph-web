import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/Footer/ContactSection';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://noor-phonetic-quran.com';

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
  const canonicalUrl = `${SITE_URL}/contact`;

  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: canonicalUrl,
        en: canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
  };
}

function buildJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'en' ? 'Home' : 'Accueil',
        item: locale === 'en' ? `${SITE_URL}/en` : `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: `${SITE_URL}/contact`,
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
  const jsonLd = buildJsonLd(locale);

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
