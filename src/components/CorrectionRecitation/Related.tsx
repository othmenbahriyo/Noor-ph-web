import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Content.module.css';

export default async function Related() {
  const t = await getTranslations('correctionRecitation.related');
  const tNav = await getTranslations('common.nav');

  return (
    <div className={styles.contentBlock}>
      <h2>{t('title')}</h2>
      <div className={styles.relatedFeatures}>
        <Link href="/tajweed-coran">{t('tajweed')}</Link>
        <Link href="/memorisation-coran">{t('memorisation')}</Link>
        <Link href="/suivi-recitation-ia">{tNav('pages.suiviRecitationIa')}</Link>
        <Link href="/#features">{t('allFeatures')}</Link>
      </div>
    </div>
  );
}
