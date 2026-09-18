import { getTranslations } from 'next-intl/server';
import styles from './Screenshots.module.css';

const SCREENSHOT_FILES = [
  'screenshot1.png',
  'screenshot2.png',
  'screenshot3.png',
  'screenshot4.png',
  'screenshot5.png',
  'screenshot6.png',
  'screenshot7.png',
  'screenshot8.png',
  'screenshot9.png',
  'screenshot10.png',
  'screenshot11.png',
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
                <img
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
