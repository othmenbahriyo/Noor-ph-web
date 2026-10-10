import { getTranslations } from 'next-intl/server';
import TrackedLink from '@/components/TrackedLink/TrackedLink';
import contentStyles from '../MemorisationCoran/ContentBlock.module.css';
import styles from '../MemorisationCoran/Related.module.css';

const LINKS = [
  { href: '/memorisation-coran', key: 'memorisation', to: 'memorisation_coran' },
  { href: '/tajweed-coran', key: 'tajweed', to: 'tajweed_coran' },
  { href: '/correction-recitation-coran', key: 'correction', to: 'correction_recitation' },
  { href: '/#features', key: 'allFeatures', to: 'home_features' },
] as const;

export default async function Related() {
  const t = await getTranslations('suiviRecitationIa.related');

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.relatedFeatures}>
          {LINKS.map((link) => (
            <TrackedLink
              key={link.href}
              href={link.href}
              eventName="related_link_click"
              params={{ from: 'suivi_recitation_ia', to: link.to }}
            >
              {t(link.key)}
            </TrackedLink>
          ))}
        </div>
      </div>
    </div>
  );
}
