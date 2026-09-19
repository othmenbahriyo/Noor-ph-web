'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import styles from '../LanguageModal/LanguageModal.module.css';
import searchStyles from './SearchModal.module.css';

interface SearchModalProps {
  onClose: () => void;
  recentPosts: BlogPostMeta[];
}

interface SearchResult {
  href: string;
  title: string;
  type: 'blog' | 'feature' | 'faq';
}

interface FeatureItem {
  title: string;
  href?: string;
}

interface FaqItem {
  question: string;
}

export default function SearchModal({ onClose, recentPosts }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('common.search');
  const tFeatures = useTranslations('home.features');
  const tFaq = useTranslations('home.faq');

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const allResults: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = [];

    for (const post of recentPosts) {
      results.push({ href: `/blog/${post.slug}`, title: post.title, type: 'blog' });
    }

    const features = tFeatures.raw('items') as FeatureItem[];
    for (const feature of features) {
      if (feature.href) {
        results.push({ href: feature.href, title: feature.title, type: 'feature' });
      }
    }

    const faqItems = tFaq.raw('items') as FaqItem[];
    for (const faq of faqItems) {
      results.push({ href: '/#faq', title: faq.question, type: 'faq' });
    }

    return results;
  }, [recentPosts, tFeatures, tFaq]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allResults.filter((result) => result.title.toLowerCase().includes(q)).slice(0, 8);
  }, [allResults, query]);

  const typeIcon: Record<SearchResult['type'], string> = {
    blog: 'fa-book-open',
    feature: 'fa-star',
    faq: 'fa-circle-question',
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={t('label')}>
        <div className={styles.header}>
          <div className={styles.searchWrap}>
            <i className="fas fa-search" />
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder={t('placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className={styles.closeBtn} aria-label={t('close')} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className={styles.list}>
          {query.trim() === '' && <p className={styles.empty}>{t('prompt')}</p>}
          {query.trim() !== '' && filtered.length === 0 && (
            <p className={styles.empty}>{t('noResults')}</p>
          )}
          {filtered.map((result) => (
            <Link key={`${result.type}-${result.href}-${result.title}`} href={result.href} className={styles.option} onClick={onClose}>
              <i className={`fas ${typeIcon[result.type]} ${searchStyles.resultIcon}`} />
              <span className={styles.name}>{result.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
