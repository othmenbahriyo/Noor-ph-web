'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import styles from './Blog.module.css';

interface BlogSearchGridProps {
  posts: BlogPostMeta[];
  readMoreLabel: string;
  searchPlaceholder: string;
  noResultsLabel: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  Tajweed: 'fa-book-quran',
  Hifz: 'fa-brain',
};

function iconFor(category: string) {
  return CATEGORY_ICONS[category] ?? 'fa-book-open';
}

export default function BlogSearchGrid({
  posts,
  readMoreLabel,
  searchPlaceholder,
  noResultsLabel,
}: BlogSearchGridProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <>
      <div className={styles.searchWrap}>
        <i className="fas fa-search" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.searchEmpty}>{noResultsLabel}</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((post) => (
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
      )}
    </>
  );
}
