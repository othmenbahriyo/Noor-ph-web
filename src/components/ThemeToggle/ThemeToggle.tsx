'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/firebase';
import styles from './ThemeToggle.module.css';

const STORAGE_KEY = 'noor-theme';

interface ThemeToggleProps {
  label: string;
  className?: string;
}

export default function ThemeToggle({ label, className }: ThemeToggleProps) {
  // Server and the first client render must produce identical markup, so
  // this always starts as `false` even though the inline script in the
  // root layout may have already set data-theme="dark" on <html>. The
  // effect below syncs to the real value right after mount.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    setIsDark(!isDark);
    trackEvent('theme_toggle', { theme: next });
  };

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className ?? ''}`}
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
    >
      <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} suppressHydrationWarning />
    </button>
  );
}
