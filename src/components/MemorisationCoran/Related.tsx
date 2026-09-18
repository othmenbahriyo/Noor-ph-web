import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import contentStyles from './ContentBlock.module.css';
import styles from './Related.module.css';

export default async function Related() {
  const t = await getTranslations('memorisationCoran.related');

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.relatedFeatures}>
          <Link href="/khatma-coran">{t('khatma')}</Link>
          <Link href="/tajweed-coran">{t('tajweed')}</Link>
          <Link href="/#features">{t('allFeatures')}</Link>
        </div>
      </div>
    </div>
  );
}
