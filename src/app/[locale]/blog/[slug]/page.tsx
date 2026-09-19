import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BlogArticle from '@/components/Blog/BlogArticle';
import { BLOG_POST_RELATED_PAGE, getAllBlogSlugs, getBlogPost, getRelatedPosts } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { buildLocaleUrls } from '@/i18n/seo';

const SITE_URL = 'https://noor-phonetic-quran.com';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllBlogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) return {};

  const { canonicalUrl, languages, ogLocale } = buildLocaleUrls(locale, `/blog/${slug}`);

  return {
    title: `${post.title} | Noor Phonetic Quran`,
    description: post.description,
    authors: [{ name: post.author }],
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: 'Noor Phonetic Quran',
      locale: ogLocale,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

function buildJsonLd(
  locale: string,
  slug: string,
  post: { title: string; description: string; date: string; author: string; image: string },
  breadcrumbLabels: { home: string; blog: string },
) {
  const { canonicalUrl, languages } = buildLocaleUrls(locale, `/blog/${slug}`);
  const blogUrl = buildLocaleUrls(locale, '/blog').canonicalUrl;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumbLabels.home, item: languages[locale] },
      { '@type': 'ListItem', position: 2, name: breadcrumbLabels.blog, item: blogUrl },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Noor Phonetic Quran',
      url: SITE_URL,
    },
    mainEntityOfPage: canonicalUrl,
    image: `${SITE_URL}${post.image}`,
  };

  return [breadcrumb, article];
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const tNav = await getTranslations('common.nav');
  const tBlog = await getTranslations('blog');
  const jsonLd = buildJsonLd(locale, slug, post, {
    home: tNav('home'),
    blog: tBlog('title'),
  });
  const relatedPosts = getRelatedPosts(slug, post.category, locale);
  const readingTimeLabel = tBlog('readingTime').replace('%MINUTES%', String(post.readingMinutes));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BlogArticle
        post={post}
        homeLabel={tNav('home')}
        blogLabel={tBlog('title')}
        backLabel={tBlog('backToList')}
        relatedPageHref={BLOG_POST_RELATED_PAGE[slug]}
        relatedPageLabel={tBlog('tryFeature')}
        readingTimeLabel={readingTimeLabel}
        relatedPosts={relatedPosts}
        relatedPostsLabel={tBlog('relatedPosts')}
      />
      <Footer />
    </>
  );
}
