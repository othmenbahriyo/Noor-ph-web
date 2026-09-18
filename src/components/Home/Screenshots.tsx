import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import styles from './Screenshots.module.css';

const SCREENSHOT_FILES = [
  'screenshot1.webp',
  'screenshot2.webp',
  'screenshot3.webp',
  'screenshot4.webp',
  'screenshot5.webp',
  'screenshot6.webp',
  'screenshot7.webp',
  'screenshot8.webp',
  'screenshot9.webp',
  'screenshot10.webp',
  'screenshot11.webp',
];

export default async function Screenshots() {
  const t = await getTranslations('home.screenshots');
  const alts = t.raw('alts') as string[];

  return (
    <section className={styles.screenshots} id="screenshots">
      <div className={`container ${styles.screenshotsContainer}`}>
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.screenshotsSlider}>
          {SCREENSHOT_FILES.map((file, index) => (
            <div className={styles.screenshotWrapper} key={file}>
              <div className={styles.screenshot}>
                <Image
                  src={`/images/${file}`}
                  alt={alts[index]}
                  loading="lazy"
                  width={270}
                  height={585}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.scrollIndicator}>
          {SCREENSHOT_FILES.slice(0, 6).map((file, index) => (
            <span
              key={file}
              className={`${styles.scrollDot} ${index === 0 ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
