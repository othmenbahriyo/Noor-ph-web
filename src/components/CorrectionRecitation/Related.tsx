import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Content.module.css';

export default async function Related() {
  const t = await getTranslations('correctionRecitation.related');

  return (
    <div className={styles.contentBlock}>
      <h2>{t('title')}</h2>
      <div className={styles.relatedFeatures}>
        <Link href="/tajweed-coran">{t('tajweed')}</Link>
        <Link href="/memorisation-coran">{t('memorisation')}</Link>
        <Link href="/#features">{t('allFeatures')}</Link>
      </div>
    </div>
  );
}
