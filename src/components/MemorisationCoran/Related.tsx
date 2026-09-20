import { getTranslations } from 'next-intl/server';
import TrackedLink from '@/components/TrackedLink/TrackedLink';
import contentStyles from './ContentBlock.module.css';
import styles from './Related.module.css';

export default async function Related() {
  const t = await getTranslations('memorisationCoran.related');

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.relatedFeatures}>
          <TrackedLink
            href="/khatma-coran"
            eventName="related_link_click"
            params={{ from: 'memorisation_coran', to: 'khatma_coran' }}
          >
            {t('khatma')}
          </TrackedLink>
          <TrackedLink
            href="/tajweed-coran"
            eventName="related_link_click"
            params={{ from: 'memorisation_coran', to: 'tajweed_coran' }}
          >
            {t('tajweed')}
          </TrackedLink>
          <TrackedLink
            href="/#features"
            eventName="related_link_click"
            params={{ from: 'memorisation_coran', to: 'home_features' }}
          >
            {t('allFeatures')}
          </TrackedLink>
          <TrackedLink
            href="/blog/methodes-memoriser-coran-facilement"
            eventName="related_link_click"
            params={{ from: 'memorisation_coran', to: 'blog_article' }}
          >
            {t('blogArticle')}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
