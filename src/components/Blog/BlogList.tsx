import { Link } from '@/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import styles from './Blog.module.css';

interface BlogListProps {
  title: string;
  subtitle: string;
  homeLabel: string;
  readMoreLabel: string;
  posts: BlogPostMeta[];
}

const CATEGORY_ICONS: Record<string, string> = {
  Tajweed: 'fa-book-quran',
  Hifz: 'fa-brain',
};

function iconFor(category: string) {
  return CATEGORY_ICONS[category] ?? 'fa-book-open';
}

export default function BlogList({ title, subtitle, homeLabel, readMoreLabel, posts }: BlogListProps) {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link href="/">{homeLabel}</Link> / {title}
          </p>
          <h1>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.cardIcon}>
                  <i className={`fas ${iconFor(post.category)}`} />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardCategory}>{post.category}</span>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardDescription}>{post.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>{post.date}</span>
                    <span className={styles.cardReadMore}>
                      {readMoreLabel}
                      <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
