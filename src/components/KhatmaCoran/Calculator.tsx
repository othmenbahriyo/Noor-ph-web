'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/firebase';
import StoreLink from '@/components/StoreLink/StoreLink';
import styles from './Calculator.module.css';

const TOTAL_QURAN_PAGES = 604;
const PRESET_DAYS = [30, 60, 90] as const;
const MIN_DAYS = 7;
const MAX_DAYS = 365;

export default function Calculator() {
  const t = useTranslations('khatmaCoran.calculator');
  const [days, setDays] = useState(30);

  const pagesPerDay = Math.ceil(TOTAL_QURAN_PAGES / days);

  const handleDaysChange = (value: number, method: 'preset' | 'step' | 'input') => {
    const clamped = Math.min(MAX_DAYS, Math.max(MIN_DAYS, value));
    setDays(clamped);
    trackEvent('khatma_calculator_change', { days: String(clamped), method });
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <span className={styles.eyebrow}>{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>

          <div className={styles.presets}>
            {PRESET_DAYS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`${styles.presetBtn} ${days === preset ? styles.presetBtnActive : ''}`}
                onClick={() => handleDaysChange(preset, 'preset')}
              >
                {t('daysCount').replace('%COUNT%', String(preset))}
              </button>
            ))}
          </div>

          <div className={styles.customInput}>
            <label htmlFor="khatma-days">{t('customLabel')}</label>
            <div className={styles.inputRow}>
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => handleDaysChange(days - 1, 'step')}
                aria-label={t('decrease')}
              >
                <i className="fas fa-minus" />
              </button>
              <input
                id="khatma-days"
                type="number"
                min={MIN_DAYS}
                max={MAX_DAYS}
                value={days}
                onChange={(e) => handleDaysChange(Number(e.target.value) || MIN_DAYS, 'input')}
              />
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => handleDaysChange(days + 1, 'step')}
                aria-label={t('increase')}
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>

          <div className={styles.result}>
            <div className={styles.resultNumber}>{pagesPerDay}</div>
            <p className={styles.resultLabel}>{t('resultLabel').replace('%DAYS%', String(days))}</p>
          </div>

          <p className={styles.adjustNote}>
            <i className="fas fa-sync-alt" />
            {t('adjustNote')}
          </p>

          <div className={styles.ctaGroup}>
            <StoreLink
              href="https://play.google.com/store/apps/details?id=coran.noor.bhr"
              store="googlePlay"
              location="khatma_calculator"
              className={styles.ctaBtn}
            >
              <i className="fab fa-google-play" />
              {t('cta')}
            </StoreLink>
            <StoreLink
              href="https://apps.apple.com/app/noor-phonetic-quran/id6737744800"
              store="appStore"
              location="khatma_calculator"
              className={styles.ctaBtn}
            >
              <i className="fab fa-apple" />
              {t('cta')}
            </StoreLink>
          </div>
        </div>
      </div>
    </section>
  );
}
