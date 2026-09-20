'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

const STORAGE_KEY = 'noor-theme';

export default function ThemeToggle({ label }: { label: string }) {
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
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
    >
      <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} suppressHydrationWarning />
    </button>
  );
}
