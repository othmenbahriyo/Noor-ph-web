import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactSection from '@/components/Footer/ContactSection';
import Hero from '@/components/Home/Hero';
import Why from '@/components/Home/Why';
import Languages from '@/components/Home/Languages';
import Features from '@/components/Home/Features';
import VideoDemo from '@/components/Home/VideoDemo';
import Screenshots from '@/components/Home/Screenshots';
import Faq from '@/components/Home/Faq';
import Testimonials from '@/components/Home/Testimonials';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

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
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, '/');

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
          height: 630,
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

function buildJsonLd(locale: string, faqItems: { question: string; answer: string }[]) {
  const isEn = locale === 'en';

  const mobileApplication = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Noor Phonetic Quran',
    description: isEn
      ? 'Learn to recite, memorize and read the entire Quran (Khatma) even without knowing Arabic. Free app with precise phonetics, integrated audio, Tajweed rules, Khatma, daily reading plan, gamified memorization, quiz and recitation correction.'
      : "Apprenez à réciter, mémoriser et lire le Coran en entier même sans connaître l'arabe. Application gratuite avec phonétique précise, audio intégré, règles de Tajweed, Khatma, plan de lecture quotidien, mémorisation gamifiée, quiz et correction de récitation.",
    url: SITE_URL,
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '80000',
    },
    installUrl: [
      'https://play.google.com/store/apps/details?id=coran.noor.bhr',
      'https://apps.apple.com/sn/app/noor-phonetic-quran/id6737744800',
    ],
    inLanguage: routing.locales,
    availableLanguage: routing.locales,
    author: {
      '@type': 'Organization',
      name: 'Noor Phonetic Quran',
      url: SITE_URL,
      email: 'othmeneb@gmail.com',
    },
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

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Noor Phonetic Quran',
    url: SITE_URL,
    inLanguage: routing.locales,
  };

  const video = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Noor Phonetic Quran - Démonstration de l\'application',
    description:
      "Découvrez comment Noor Phonetic Quran vous aide à réciter le Saint Coran avec une phonétique précise, un audio synchronisé et les règles de Tajweed, même sans connaître l'arabe.",
    thumbnailUrl: 'https://i.ytimg.com/vi/O6kRF4UV_xc/mqdefault.jpg',
    uploadDate: '2024-10-01',
    duration: 'PT2M30S',
    contentUrl: 'https://www.youtube.com/watch?v=O6kRF4UV_xc',
    embedUrl: 'https://www.youtube.com/embed/O6kRF4UV_xc',
    publisher: {
      '@type': 'Organization',
      name: 'Noor Phonetic Quran',
      url: SITE_URL,
    },
    inLanguage: 'fr',
    isFamilyFriendly: true,
  };

  return { combined: [mobileApplication, faqPage, website], video };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'home.faq' });
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];
  const { combined, video } = buildJsonLd(locale, faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combined) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }}
      />
      <Header />
      <main>
        <Hero />
        <Why />
        <Languages />
        <Features />
        <VideoDemo />
        <Screenshots />
        <Faq />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
