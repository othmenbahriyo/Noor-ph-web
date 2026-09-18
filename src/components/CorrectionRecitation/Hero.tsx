import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Hero.module.css';

const STORE_LINKS = [
  {
    href: 'https://play.google.com/store/apps/details?id=coran.noor.bhr',
    icon: 'fab fa-google-play',
    label: 'Google Play',
  },
  {
    href: 'https://apps.apple.com/sn/app/noor-phonetic-quran/id6737744800',
    icon: 'fab fa-apple',
    label: 'App Store',
  },
] as const;

export default async function Hero() {
  const t = await getTranslations('correctionRecitation.hero');
  const tBreadcrumb = await getTranslations('correctionRecitation.breadcrumb');

  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.breadcrumb}>
          <Link href="/">{tBreadcrumb('home')}</Link> / {tBreadcrumb('current')}
        </p>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <div className={styles.ctaGroup}>
          {STORE_LINKS.map((store) => (
            <a
              key={store.href}
              href={store.href}
              className={styles.btnStore}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={store.icon} /> {store.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
