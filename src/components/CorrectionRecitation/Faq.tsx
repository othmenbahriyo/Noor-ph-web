import { getTranslations } from 'next-intl/server';
import contentStyles from './Content.module.css';
import styles from './Faq.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

export default async function Faq() {
  const t = await getTranslations('correctionRecitation.faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <div className={`${contentStyles.contentBlock} ${styles.faqBlock}`}>
      <h2>{t('title')}</h2>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
