import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PrivacyPolicyContent from '@/components/Legal/PrivacyPolicyContent';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://noor-phonetic-quran.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${SITE_URL}/privacy-policy`;

  return {
    title: 'Politique de Confidentialité - Noor Phonetic Quran',
    description:
      'Politique de confidentialité de Noor Phonetic Quran : données collectées (analytics, achats, formulaire de contact), finalités, partage avec des tiers et vos droits.',
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

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <PrivacyPolicyContent />
      <Footer />
    </>
  );
}
