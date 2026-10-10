import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BlogList from '@/components/Blog/BlogList';
import { getAllBlogPosts } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls, twitterDescriptionFor } from '@/i18n/seo';

const SITE_URL = 'https://noor-phonetic-quran.com';
const PAGE_PATH = '/blog';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: canonicalUrl,
      siteName: 'Noor Phonetic Quran',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/noor.png`,
          width: 1200,
          height: 628,
          alt: t('meta.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: twitterDescriptionFor(t('meta.description')),
      images: [`${SITE_URL}/images/noor.png`],
    },
  };
}

/** Fil d'Ariane + liste des articles (schema.org Blog) pour l'index. */
function buildJsonLd(
  locale: string,
  blogTitle: string,
  homeLabel: string,
  posts: { slug: string; title: string; description: string; date: string }[],
) {
  const { canonicalUrl } = buildLocaleUrls(locale, PAGE_PATH);
  const { canonicalUrl: homeUrl } = buildLocaleUrls(locale, '');

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: blogTitle, item: canonicalUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blogTitle,
      url: canonicalUrl,
      inLanguage: locale,
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: buildLocaleUrls(locale, `${PAGE_PATH}/${post.slug}`).canonicalUrl,
      })),
    },
  ];
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const tNav = await getTranslations('common.nav');
  const posts = getAllBlogPosts(locale);

  const jsonLd = buildJsonLd(locale, t('title'), tNav('home'), posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BlogList
        title={t('title')}
        subtitle={t('subtitle')}
        homeLabel={tNav('home')}
        readMoreLabel={t('readMore')}
        searchPlaceholder={t('searchPlaceholder')}
        noResultsLabel={t('noResults')}
        posts={posts}
      />
      <Footer />
    </>
  );
}
