import { getTranslations } from 'next-intl/server';
import styles from './Languages.module.css';

// The app's UI is available in these 20 languages (see the mobile app's
// Translations class). The website itself stays FR/EN — this section is a
// marketing signal ("the app speaks your language"), not a claim that this
// site is translated into all of them.
const APP_LANGUAGES = [
  { flag: '🇫🇷', name: 'Français' },
  { flag: '🇬🇧', name: 'English' },
  { flag: '🇸🇦', name: 'العربية' },
  { flag: '🇪🇸', name: 'Español' },
  { flag: '🇩🇪', name: 'Deutsch' },
  { flag: '🇮🇹', name: 'Italiano' },
  { flag: '🇳🇱', name: 'Nederlands' },
  { flag: '🇵🇹', name: 'Português' },
  { flag: '🇷🇺', name: 'Русский' },
  { flag: '🇹🇷', name: 'Türkçe' },
  { flag: '🇨🇳', name: '中文' },
  { flag: '🇮🇳', name: 'हिन्दी' },
  { flag: '🇮🇩', name: 'Bahasa Indonesia' },
  { flag: '🇵🇭', name: 'Filipino' },
  { flag: '🇵🇰', name: 'اردو' },
  { flag: '🇹🇿', name: 'Kiswahili' },
  { flag: '🇸🇳', name: 'Wolof' },
  { flag: '🇷🇴', name: 'Română' },
  { flag: '🇯🇵', name: '日本語' },
  { flag: '🇺🇿', name: "O'zbek" },
];

export default async function Languages() {
  const t = await getTranslations('home.languages');

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {APP_LANGUAGES.map((lang) => (
            <div className={styles.chip} key={lang.name}>
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
