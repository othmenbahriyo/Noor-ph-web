'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/firebase';
import contentStyles from './ContentBlock.module.css';
import styles from './Faq.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const t = useTranslations('quizCoran.faq');
  const items = t.raw('items') as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => {
      const next = current === index ? null : index;
      if (next !== null) trackEvent('faq_question_open', { question: items[index].question, page: 'quiz_coran' });
      return next;
    });
  };

  return (
    <div className={`container ${contentStyles.containerWrap}`}>
      <div className={`${contentStyles.contentBlock} ${styles.faqBlock}`}>
        <h2>{t('title')}</h2>
        {items.map((item, index) => {
          const isActive = openIndex === index;
          const answerId = `quiz-faq-answer-${index}`;

          return (
            <div className={styles.faqItem} key={item.question}>
              <button
                type="button"
                className={styles.faqQuestion}
                aria-expanded={isActive}
                aria-controls={answerId}
                onClick={() => toggle(index)}
              >
                {item.question}
              </button>
              {isActive && (
                <p id={answerId} className={styles.faqAnswer}>
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
