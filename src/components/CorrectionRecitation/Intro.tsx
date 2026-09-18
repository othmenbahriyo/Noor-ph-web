import { getTranslations } from 'next-intl/server';
import styles from './Content.module.css';

export default async function Intro() {
  const t = await getTranslations('correctionRecitation.intro');

  return (
    <div className={styles.contentBlock}>
      <h2>{t('title')}</h2>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
    </div>
  );
}
