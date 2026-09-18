import { getTranslations } from 'next-intl/server';
import styles from './Content.module.css';

interface StepItem {
  title: string;
  text: string;
}

export default async function Steps() {
  const t = await getTranslations('correctionRecitation.steps');
  const items = t.raw('items') as StepItem[];

  return (
    <div className={styles.contentBlock}>
      <h2>{t('title')}</h2>
      <ol className={styles.stepsList}>
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong> — {item.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
