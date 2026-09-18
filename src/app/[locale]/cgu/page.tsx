import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CguContent from '@/components/Legal/CguContent';
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
  const t = await getTranslations({ locale, namespace: 'cgu.meta' });

  const canonicalPath = locale === 'en' ? '/en/cgu' : '/cgu';
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${SITE_URL}/cgu`,
        en: `${SITE_URL}/en/cgu`,
        'x-default': `${SITE_URL}/cgu`,
      },
    },
  };
}

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: "Conditions générales d'utilisation",
        item: `${SITE_URL}/cgu`,
      },
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

  const jsonLd = buildJsonLd();

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
