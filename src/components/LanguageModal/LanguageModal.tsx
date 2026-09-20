'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { LANGUAGES } from '@/i18n/languages';
import { trackEvent } from '@/lib/firebase';
import styles from './LanguageModal.module.css';

interface LanguageModalProps {
  onClose: () => void;
}

export default function LanguageModal({ onClose }: LanguageModalProps) {
  const [query, setQuery] = useState('');
  const locale = useLocale();
  const pathname = usePathname();
  const tLang = useTranslations('common.languageSwitcher');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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

  const hrefFor = (code: string) => {
    const path = pathname === '/' ? '' : pathname;
    if (code === routing.defaultLocale) return `/${path}`.replace(/\/{2,}/g, '/');
    return `/${code}${path}`;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (lang) => lang.name.toLowerCase().includes(q) || lang.code.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} ref={dialogRef} role="dialog" aria-modal="true" aria-label={tLang('label')}>
        <div className={styles.header}>
          <div className={styles.searchWrap}>
            <i className="fas fa-search" />
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder={tLang('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className={styles.closeBtn} aria-label={tLang('close')} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className={styles.list}>
          {filtered.length === 0 && <p className={styles.empty}>{tLang('noResults')}</p>}
          {filtered.map((lang) => (
            <a
              key={lang.code}
              href={hrefFor(lang.code)}
              className={`${styles.option} ${locale === lang.code ? styles.active : ''}`}
              onClick={() => {
                if (lang.code !== locale) trackEvent('language_switch', { from: locale, to: lang.code });
              }}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
              {locale === lang.code && <i className={`fas fa-check ${styles.check}`} />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
