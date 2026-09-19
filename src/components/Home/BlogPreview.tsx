import { getTranslations, getLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import blogStyles from '../Blog/Blog.module.css';
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

        <div className={blogStyles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={blogStyles.card}>
              <div className={blogStyles.cardImage}>
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 400px" />
              </div>
              <div className={blogStyles.cardBody}>
                <span className={blogStyles.cardCategory}>{post.category}</span>
                <h3 className={blogStyles.cardTitle}>{post.title}</h3>
                <p className={blogStyles.cardDescription}>{post.description}</p>
                <div className={blogStyles.cardFooter}>
                  <span className={blogStyles.cardDate}>{post.date}</span>
                  <span className={blogStyles.cardReadMore}>
                    {tBlog('readMore')}
                    <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
