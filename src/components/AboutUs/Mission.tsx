import { getTranslations } from 'next-intl/server';
import styles from './Mission.module.css';

interface MissionItem {
  icon: string;
  title: string;
  text: string;
}

export default async function Mission() {
  const t = await getTranslations('aboutUs.mission');
  const items = t.raw('items') as MissionItem[];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrap}>
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
