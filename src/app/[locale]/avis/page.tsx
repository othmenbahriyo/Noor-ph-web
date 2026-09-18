import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ReviewsPageContent from '@/components/Reviews/ReviewsPageContent';
import type { Testimonial } from '@/components/TestimonialCarousel/TestimonialsGrid';
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
  const t = await getTranslations({ locale, namespace: 'reviews.meta' });
  const canonicalUrl = `${SITE_URL}/avis`;

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

// A sample of individual reviews is included alongside the aggregate rating
// rather than all 162 — Google's guidelines flag JSON-LD stuffed with every
// review a site has as a spam signal, and rich results only ever surface a
// handful anyway.
const REVIEW_SAMPLE_SIZE = 15;

function buildJsonLd(locale: string, items: Testimonial[]) {
  const canonicalUrl = `${SITE_URL}/avis`;
  const ratingSum = items.reduce((sum, item) => sum + (item.rating ?? 5), 0);
  const ratingValue = (ratingSum / (items.length || 1)).toFixed(1);

  const breadcrumb = {
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
        name: locale === 'en' ? 'Reviews' : 'Avis',
        item: canonicalUrl,
      },
    ],
  };

  const productWithReviews = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Noor Phonetic Quran',
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Android, iOS',
    url: canonicalUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: '5',
      worstRating: '1',
      ratingCount: String(items.length),
    },
    review: items.slice(0, REVIEW_SAMPLE_SIZE).map((item) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: item.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(item.rating ?? 5),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: item.text,
    })),
  };

  return [breadcrumb, productWithReviews];
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('reviews');
  const tTestimonials = await getTranslations('home.testimonials');
  const items = tTestimonials.raw('items') as Testimonial[];
  const jsonLd = buildJsonLd(locale, items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ReviewsPageContent
        testimonials={items}
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        ratingCountLabel={t('ratingCountLabel')}
        loadMoreLabel={t('loadMoreLabel')}
      />
      <Footer />
    </>
  );
}
