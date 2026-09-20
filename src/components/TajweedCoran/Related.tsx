import { getTranslations } from 'next-intl/server';
import TrackedLink from '@/components/TrackedLink/TrackedLink';
import contentStyles from './ContentBlock.module.css';
import styles from './Related.module.css';

export default async function Related() {
  const t = await getTranslations('tajweedCoran.related');

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.relatedFeatures}>
          <TrackedLink
            href="/audio-coran"
            eventName="related_link_click"
            params={{ from: 'tajweed_coran', to: 'audio_coran' }}
          >
            {t('audio')}
          </TrackedLink>
          <TrackedLink
            href="/memorisation-coran"
            eventName="related_link_click"
            params={{ from: 'tajweed_coran', to: 'memorisation_coran' }}
          >
            {t('memorization')}
          </TrackedLink>
          <TrackedLink
            href="/#features"
            eventName="related_link_click"
            params={{ from: 'tajweed_coran', to: 'home_features' }}
          >
            {t('allFeatures')}
          </TrackedLink>
          <TrackedLink
            href="/blog/regles-de-tajweed-guide-complet"
            eventName="related_link_click"
            params={{ from: 'tajweed_coran', to: 'blog_article' }}
          >
            {t('blogArticle')}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
