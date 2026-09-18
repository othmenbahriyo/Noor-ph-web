import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import styles from './BlogPreview.module.css';

const CATEGORY_ICONS: Record<string, string> = {
  Tajweed: 'fa-book-quran',
  Hifz: 'fa-brain',
};

function iconFor(category: string) {
  return CATEGORY_ICONS[category] ?? 'fa-book-open';
}

export default async function BlogPreview() {
  const locale = await getLocale();
  const t = await getTranslations('home.blogPreview');
  const posts = getAllBlogPosts(locale).slice(0, 2);

  if (posts.length === 0) return null;

  return (
    <section className={styles.section} id="blog">
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardIcon}>
                <i className={`fas ${iconFor(post.category)}`} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{post.category}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
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
