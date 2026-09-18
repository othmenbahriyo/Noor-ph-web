import { getTranslations } from 'next-intl/server';
import styles from './VideoDemo.module.css';

export default async function VideoDemo() {
  const t = await getTranslations('home.videoDemo');

  return (
    <section className={styles.videoDemoSection}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.videoContainer}>
          <div className={styles.iphoneMockup}>
            <div className={styles.iphoneFrame}>
              <div className={styles.dynamicIsland} />

              <div className={styles.iphoneScreen}>
                <iframe
                  src="https://www.youtube.com/embed/O6kRF4UV_xc?autoplay=0&mute=0&controls=1&loop=0&rel=0&modestbranding=1"
                  title="Noor Phonetic Quran Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className={styles.videoIframe}
                />
              </div>

              <div className={styles.powerButton} />

              <div className={styles.volumeButtons}>
                <div className={styles.volumeUp} />
                <div className={styles.volumeDown} />
              </div>
            </div>

            <div className={styles.iphoneReflection} />
          </div>
        </div>
      </div>
    </section>
  );
}
