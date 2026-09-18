import { getTranslations } from 'next-intl/server';
import contentStyles from './ContentBlock.module.css';
import styles from './Screenshots.module.css';

const SCREENSHOT_FILES = [
  'screenshot-memorisation-1.webp',
  'screenshot-memorisation-2.webp',
  'screenshot-daily-plan-indicator.webp',
];

export default async function Screenshots() {
  const t = await getTranslations('memorisationCoran.screenshots');
  const alts = t.raw('alts') as string[];

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.screenshotGallery}>
          {SCREENSHOT_FILES.map((file, index) => (
            <img
              key={file}
              src={`/images/${file}`}
              alt={alts[index]}
              loading="lazy"
              width={243}
              height={540}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
