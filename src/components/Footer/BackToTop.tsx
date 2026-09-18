'use client';

import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

interface BackToTopProps {
  label: string;
}

export default function BackToTop({ label }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#"
      className={`${styles.backToTop} ${visible ? styles.active : ''}`}
      aria-label={label}
      onClick={handleClick}
    >
      <i className="fas fa-arrow-up" />
    </a>
  );
}
