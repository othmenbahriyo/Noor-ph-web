import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BlogList from '@/components/Blog/BlogList';
import { getAllBlogPosts } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

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
  const { canonicalUrl, languages } = buildLocaleUrls(locale, PAGE_PATH);

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
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

  return (
    <>
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
