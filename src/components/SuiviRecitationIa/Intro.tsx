import { getTranslations } from 'next-intl/server';
import styles from '../MemorisationCoran/ContentBlock.module.css';

export default async function Intro() {
  const t = await getTranslations('suiviRecitationIa.intro');

  return (
    <div className={`container ${styles.containerWrap}`}>
      <div className={styles.contentBlock}>
        <h2>{t('title')}</h2>
        <p>{t('paragraph1')}</p>
        <p>{t('paragraph2')}</p>
        <p>{t('paragraph3')}</p>
      </div>
    </div>
  );
}
