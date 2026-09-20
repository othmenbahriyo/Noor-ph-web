'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Countdown.module.css';

// 2027-02-18 is the widely anticipated Gregorian start date for Ramadan
// 1449H based on current astronomical calendars. The exact day is only
// confirmed by moon-sighting close to the date, hence the disclaimer
// shown next to the countdown (see page copy).
const RAMADAN_2027_START = new Date('2027-02-18T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = RAMADAN_2027_START.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const t = useTranslations('ramadan2027.hero');
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: 'days', label: t('days') },
    { key: 'hours', label: t('hours') },
    { key: 'minutes', label: t('minutes') },
    { key: 'seconds', label: t('seconds') },
  ];

  return (
    <div className={styles.countdown}>
      {units.map((unit) => (
        <div key={unit.key} className={styles.unit}>
          <span className={styles.number}>
            {timeLeft ? String(timeLeft[unit.key]).padStart(2, '0') : '--'}
          </span>
          <span className={styles.label}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
