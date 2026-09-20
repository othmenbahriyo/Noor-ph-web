'use client';

import { useTranslations } from 'next-intl';
import { REOPEN_EVENT } from './CookieConsent';
import styles from './CookieFloatingButton.module.css';

export default function CookieFloatingButton() {
  const t = useTranslations('common.cookieConsent');

  return (
    <button
      type="button"
      className={styles.floatingBtn}
      aria-label={t('manage')}
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
    >
      <i className="fas fa-cookie-bite" />
    </button>
  );
}
