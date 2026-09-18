import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Features.module.css';

interface FeatureItem {
  icon: string;
  title: string;
  text: string;
  href: string;
}

function FeatureRow({ item, index }: { item: FeatureItem; index: number }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <Link href={item.href} className={`${styles.row} ${styles.rowLinked}`}>
      <span className={styles.rowNumber}>{number}</span>
      <h3 className={styles.rowTitle}>
        <i className={`fas ${item.icon}`} />
        {item.title}
      </h3>
      <p className={styles.rowText}>{item.text}</p>
      <span className={styles.rowLinkHint}>
        <i className="fas fa-arrow-right" />
      </span>
    </Link>
  );
}

export default async function Features() {
  const t = await getTranslations('home.features');
  const items = (t.raw('items') as (FeatureItem | Omit<FeatureItem, 'href'>)[]).filter(
    (item): item is FeatureItem => 'href' in item && Boolean(item.href),
  );

  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div className={styles.sectionTitle}>
          <span className={styles.kicker}>{t('title')}</span>
          <h2>{t('subtitle')}</h2>
        </div>

        <div className={styles.list}>
          {items.map((item, index) => (
            <FeatureRow item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
