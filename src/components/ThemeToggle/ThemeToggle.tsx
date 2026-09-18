'use client';

import { useState } from 'react';
import styles from './ThemeToggle.module.css';

const STORAGE_KEY = 'noor-theme';

// The inline script in the root layout sets data-theme on <html> before
// hydration, so reading it here (lazily, once) stays in sync without an
// effect-driven setState render.
function readInitialTheme() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

export default function ThemeToggle({ label }: { label: string }) {
  const [isDark, setIsDark] = useState(readInitialTheme);

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
