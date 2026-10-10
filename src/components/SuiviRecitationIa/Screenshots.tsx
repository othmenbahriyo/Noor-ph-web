import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import contentStyles from '../MemorisationCoran/ContentBlock.module.css';
import styles from '../MemorisationCoran/Screenshots.module.css';

// Captures 486×1009 (2× la hauteur d'affichage) : récitation en mode texte
// masqué, puis l'écran « Ma progression ».
const SCREENSHOT_FILES = [
  'screenshot-ai-recitation.webp',
  'screenshot-ai-progress-1.webp',
  'screenshot-ai-progress-2.webp',
  'screenshot-ai-progress-3.webp',
  'screenshot-ai-progress-4.webp',
];

export default async function Screenshots() {
  const t = await getTranslations('suiviRecitationIa.screenshots');
  const alts = t.raw('alts') as string[];

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={contentStyles.contentBlock}>
        <h2>{t('title')}</h2>
        <div className={styles.screenshotGallery}>
          {SCREENSHOT_FILES.map((file, index) => (
            <Image
              key={file}
              src={`/images/${file}`}
              alt={alts[index]}
              loading="lazy"
              width={243}
              height={505}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
