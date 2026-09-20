import { getTranslations } from 'next-intl/server';
import TrackedLink from '@/components/TrackedLink/TrackedLink';
import contentStyles from './ContentBlock.module.css';
import styles from './Related.module.css';

export default async function Related() {
  const t = await getTranslations('audioCoran.related');

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.relatedFeatures}>
          <TrackedLink
            href="/tajweed-coran"
            eventName="related_link_click"
            params={{ from: 'audio_coran', to: 'tajweed_coran' }}
          >
            {t('tajweed')}
          </TrackedLink>
          <TrackedLink
            href="/memorisation-coran"
            eventName="related_link_click"
            params={{ from: 'audio_coran', to: 'memorisation_coran' }}
          >
            {t('memorization')}
          </TrackedLink>
          <TrackedLink
            href="/#features"
            eventName="related_link_click"
            params={{ from: 'audio_coran', to: 'home_features' }}
          >
            {t('allFeatures')}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
