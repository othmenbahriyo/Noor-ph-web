import { getTranslations } from 'next-intl/server';
import contentStyles from './ContentBlock.module.css';
import styles from './Features.module.css';

interface FeatureItem {
  title: string;
  description: string;
}

export default async function Features() {
  const t = await getTranslations('audioCoran.features');
  const items = t.raw('items') as FeatureItem[];

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <ol className={styles.stepsList}>
          {items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> — {item.description}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
