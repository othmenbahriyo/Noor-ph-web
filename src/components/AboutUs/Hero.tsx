import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Hero.module.css';

export default async function Hero() {
  const t = await getTranslations('aboutUs.hero');
  const tBreadcrumb = await getTranslations('aboutUs.breadcrumb');

  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.breadcrumb}>
          <Link href="/">{tBreadcrumb('home')}</Link> / {tBreadcrumb('current')}
        </p>
        <h1>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>
    </section>
  );
}
