'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { setAnalyticsEnabled } from '@/lib/firebase';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'noor-cookie-consent';
export const REOPEN_EVENT = 'noor-cookie-consent-reopen';

interface StoredConsent {
  analytics: boolean;
}

function readStoredConsent(): StoredConsent | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const t = useTranslations('common.cookieConsent');
  // "closed": nothing shown. "banner": first-visit bottom bar. "panel": the
  // full OneTrust-style preference center (opened via "Personnaliser" or
  // the footer/floating-button re-entry points).
  const [view, setView] = useState<'closed' | 'banner' | 'panel'>('closed');
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setAnalyticsEnabled(stored.analytics);
      setAnalyticsChecked(stored.analytics);
    } else {
      setView('banner');
    }
  }, []);

  // Lets any page (footer link, floating button) reopen the preference
  // panel to change a previously saved choice.
  useEffect(() => {
    const reopen = () => {
      const stored = readStoredConsent();
      setAnalyticsChecked(stored?.analytics ?? false);
      setView('panel');
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const save = (consent: StoredConsent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setAnalyticsEnabled(consent.analytics);
    setView('closed');
  };

  if (view === 'closed') return null;

  if (view === 'banner') {
    return (
      <div className={styles.banner} role="dialog" aria-label={t('title')}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerText}>{t('message')}</p>
          <div className={styles.bannerActions}>
            <button type="button" className={styles.linkBtn} onClick={() => setView('panel')}>
              {t('customize')}
            </button>
            <button type="button" className={styles.outlineBtn} onClick={() => save({ analytics: false })}>
              {t('declineAll')}
            </button>
            <button type="button" className={styles.primaryBtn} onClick={() => save({ analytics: true })}>
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={() => setView('closed')}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.panelHeader}>
          <h2>{t('title')}</h2>
          <button type="button" className={styles.closeBtn} aria-label={t('close')} onClick={() => setView('closed')}>
            <i className="fas fa-times" />
          </button>
        </div>

        <p className={styles.panelIntro}>{t('message')}</p>

        <div className={styles.categoryList}>
          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <h3>{t('necessary.title')}</h3>
              <span className={styles.alwaysActive}>{t('necessary.alwaysActive')}</span>
            </div>
            <p className={styles.categoryDescription}>{t('necessary.description')}</p>
          </div>

          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <h3>{t('analytics.title')}</h3>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={analyticsChecked}
                  onChange={(e) => setAnalyticsChecked(e.target.checked)}
                />
                <span className={styles.toggleTrack} />
              </label>
            </div>
            <p className={styles.categoryDescription}>{t('analytics.description')}</p>
          </div>
        </div>

        <div className={styles.panelActions}>
          <button type="button" className={styles.outlineBtn} onClick={() => save({ analytics: false })}>
            {t('declineAll')}
          </button>
          <button type="button" className={styles.outlineBtn} onClick={() => save({ analytics: true })}>
            {t('acceptAll')}
          </button>
          <button type="button" className={styles.primaryBtn} onClick={() => save({ analytics: analyticsChecked })}>
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
