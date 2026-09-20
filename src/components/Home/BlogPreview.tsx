import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import BlogCarousel from './BlogCarousel';
import styles from './BlogPreview.module.css';

const HOME_PREVIEW_LIMIT = 8;

export default async function BlogPreview() {
  const locale = await getLocale();
  const t = await getTranslations('home.blogPreview');
  const tBlog = await getTranslations('blog');
  const posts = getAllBlogPosts(locale).slice(0, HOME_PREVIEW_LIMIT);

  if (posts.length === 0) return null;

  return (
    <section className={styles.section} id="blog">
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <BlogCarousel posts={posts} readMoreLabel={tBlog('readMore')} />

        <div className={styles.viewAll}>
          <Link href="/blog" className={styles.viewAllLink}>
            {t('viewAll')}
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
