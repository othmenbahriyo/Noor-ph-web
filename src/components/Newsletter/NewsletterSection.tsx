import { getTranslations } from 'next-intl/server';
import NewsletterForm from './NewsletterForm';
import styles from './NewsletterSection.module.css';

export default async function NewsletterSection() {
  const t = await getTranslations('newsletter');

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.visual}>
            <div className={styles.iconBadge}>
              <i className="fas fa-envelope" />
            </div>
          </div>
          <div className={styles.content}>
            <span className={styles.eyebrow}>{t('eyebrow')}</span>
            <h2>{t('title')}</h2>
            <p className={styles.subtitle}>{t('subtitle')}</p>
            <NewsletterForm variant="section" />
            <p className={styles.privacyNote}>{t('privacyNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
