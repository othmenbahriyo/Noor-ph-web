import { getTranslations } from 'next-intl/server';
import styles from './Why.module.css';

interface WhyItem {
  icon: string;
  stepLabel: string;
  title: string;
  text: string;
}

export default async function Why() {
  const t = await getTranslations('home.why');
  const items = t.raw('items') as WhyItem[];

  return (
    <section className={styles.whySection} id="why">
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.path}>
          {items.map((item, index) => (
            <div className={styles.step} key={item.title}>
              <span className={styles.stepLabel}>{item.stepLabel}</span>
              <div
                className={`${styles.stepMarker} ${
                  index === items.length - 1 ? styles.stepMarkerFinal : ''
                }`}
              >
                <i className={`fas ${item.icon}`} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
