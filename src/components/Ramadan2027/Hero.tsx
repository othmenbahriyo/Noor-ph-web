import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Countdown from './Countdown';
import styles from './Hero.module.css';

export default async function Hero() {
  const t = await getTranslations('ramadan2027.hero');
  const tBreadcrumb = await getTranslations('ramadan2027.breadcrumb');

  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.breadcrumb}>
          <Link href="/">{tBreadcrumb('home')}</Link> / {tBreadcrumb('current')}
        </p>
        <span className={styles.badge}>
          <i className="fas fa-moon" />
          {t('badge')}
        </span>
        <h1>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <Countdown />

        <p className={styles.disclaimer}>
          <i className="fas fa-circle-question" />
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
