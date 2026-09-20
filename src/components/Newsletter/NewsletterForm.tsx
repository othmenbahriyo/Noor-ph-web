'use client';

import { useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './NewsletterForm.module.css';

const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface NewsletterFormProps {
  variant?: 'section' | 'compact';
}

export default function NewsletterForm({ variant = 'section' }: NewsletterFormProps) {
  const t = useTranslations('newsletter');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError(t('emailRequired'));
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError(t('emailInvalid'));
      return;
    }

    setError('');
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_leads'), {
        email: trimmed,
        timestamp: serverTimestamp(),
        source: 'web',
        language: locale,
        app_title: 'Noor Phonetic Quran',
      });

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${styles.form} ${styles[variant]} ${styles.successState}`}>
        <i className="fas fa-check-circle" />
        <p>{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form className={`${styles.form} ${styles[variant]}`} onSubmit={handleSubmit} noValidate>
      <div className={styles.inputRow}>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          aria-invalid={Boolean(error)}
          aria-label={t('emailPlaceholder')}
        />
        <button className={styles.submitBtn} type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <span className={styles.spinner} />
          ) : (
            <>
              <i className="fas fa-paper-plane" />
              {t('cta')}
            </>
          )}
        </button>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {status === 'error' && (
        <span className={styles.errorText} role="alert">
          {t('errorMessage')}
        </span>
      )}
    </form>
  );
}
