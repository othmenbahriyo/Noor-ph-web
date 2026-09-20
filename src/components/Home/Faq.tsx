'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/firebase';
import styles from './Faq.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const t = useTranslations('home.faq');
  const items = t.raw('items') as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => {
      const next = current === index ? null : index;
      if (next !== null) trackEvent('faq_question_open', { question: items[index].question, page: 'home' });
      return next;
    });
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.faqContainer}>
          {items.map((item, index) => {
            const isActive = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div className={`${styles.faqItem} ${isActive ? styles.active : ''}`} key={item.question}>
                <div
                  className={styles.faqQuestion}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-controls={answerId}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(index);
                    }
                  }}
                >
                  <h3>{item.question}</h3>
                  <i className={`fas fa-chevron-down ${styles.faqIcon}`} />
                </div>
                <div className={styles.faqAnswer} id={answerId}>
                  <div className={styles.faqAnswerContent}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
