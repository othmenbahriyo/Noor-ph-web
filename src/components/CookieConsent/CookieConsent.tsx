'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { enableAnalytics } from '@/lib/firebase';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'noor-cookie-consent';

type Consent = 'accepted' | 'declined';

export default function CookieConsent() {
  const t = useTranslations('common.cookieConsent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored === 'accepted') {
      enableAnalytics();
    } else if (stored !== 'declined') {
      setVisible(true);
    }
  }, []);

  const choose = (consent: Consent) => {
    localStorage.setItem(STORAGE_KEY, consent);
    setVisible(false);
    if (consent === 'accepted') {
      enableAnalytics();
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label={t('title')}>
      <div className={styles.content}>
        <p className={styles.text}>{t('message')}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.declineBtn} onClick={() => choose('declined')}>
            {t('decline')}
          </button>
          <button type="button" className={styles.acceptBtn} onClick={() => choose('accepted')}>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
