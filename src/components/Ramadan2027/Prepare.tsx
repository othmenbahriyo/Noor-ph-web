import { getTranslations } from 'next-intl/server';
import styles from './Prepare.module.css';

interface PrepareItem {
  icon: string;
  title: string;
  text: string;
}

export default async function Prepare() {
  const t = await getTranslations('ramadan2027.prepare');
  const items = t.raw('items') as PrepareItem[];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrap}>
                <i className={`fas ${item.icon}`} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaGroup}>
          <a
            href="https://play.google.com/store/apps/details?id=coran.noor.bhr"
            className={styles.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-google-play" />
            {t('cta')}
          </a>
          <a
            href="https://apps.apple.com/app/noor-phonetic-quran/id6737744800"
            className={styles.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-apple" />
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
