import { getTranslations } from 'next-intl/server';
import TrackedLink from '@/components/TrackedLink/TrackedLink';
import contentStyles from './ContentBlock.module.css';
import styles from './Related.module.css';

export default async function Related() {
  const t = await getTranslations('quizCoran.related');

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.relatedFeatures}>
          <TrackedLink
            href="/khatma-coran"
            eventName="related_link_click"
            params={{ from: 'quiz_coran', to: 'khatma_coran' }}
          >
            {t('khatma')}
          </TrackedLink>
          <TrackedLink
            href="/audio-coran"
            eventName="related_link_click"
            params={{ from: 'quiz_coran', to: 'audio_coran' }}
          >
            {t('audio')}
          </TrackedLink>
          <TrackedLink
            href="/#features"
            eventName="related_link_click"
            params={{ from: 'quiz_coran', to: 'home_features' }}
          >
            {t('allFeatures')}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
