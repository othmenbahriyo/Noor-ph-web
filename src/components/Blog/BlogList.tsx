import { Link } from '@/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import BlogSearchGrid from './BlogSearchGrid';
import styles from './Blog.module.css';

interface BlogListProps {
  title: string;
  subtitle: string;
  homeLabel: string;
  readMoreLabel: string;
  searchPlaceholder: string;
  noResultsLabel: string;
  posts: BlogPostMeta[];
}

export default function BlogList({
  title,
  subtitle,
  homeLabel,
  readMoreLabel,
  searchPlaceholder,
  noResultsLabel,
  posts,
}: BlogListProps) {
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
          <BlogSearchGrid
            posts={posts}
            readMoreLabel={readMoreLabel}
            searchPlaceholder={searchPlaceholder}
            noResultsLabel={noResultsLabel}
          />
        </div>
      </section>
    </>
  );
}
