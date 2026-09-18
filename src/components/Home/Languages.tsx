'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { LANGUAGES } from '@/i18n/languages';
import styles from './Languages.module.css';

export default function Languages() {
  const t = useTranslations('home.languages');
  const locale = useLocale();
  const pathname = usePathname();

  const hrefFor = (code: string) => {
    const path = pathname === '/' ? '' : pathname;
    if (code === routing.defaultLocale) return `/${path}`.replace(/\/{2,}/g, '/');
    return `/${code}${path}`;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {LANGUAGES.map((lang) => (
            <a
              href={hrefFor(lang.code)}
              className={`${styles.chip} ${locale === lang.code ? styles.active : ''}`}
              key={lang.code}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
