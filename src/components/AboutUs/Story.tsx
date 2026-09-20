import { getTranslations } from 'next-intl/server';
import styles from './Story.module.css';

export default async function Story() {
  const t = await getTranslations('aboutUs.story');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.contentBlock}>
          <span className={styles.eyebrow}>{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
