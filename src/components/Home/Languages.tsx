import { getTranslations } from 'next-intl/server';
import { LANGUAGES } from '@/i18n/languages';
import styles from './Languages.module.css';

export default async function Languages() {
  const t = await getTranslations('home.languages');

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {LANGUAGES.map((lang) => (
            <div className={styles.chip} key={lang.code}>
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
