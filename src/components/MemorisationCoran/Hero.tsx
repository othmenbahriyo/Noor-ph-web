import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Hero.module.css';

const STORE_LINKS = [
  {
    href: 'https://play.google.com/store/apps/details?id=coran.noor.bhr',
    icon: 'fab fa-google-play',
    labelKey: 'googlePlay',
  },
  {
    href: 'https://apps.apple.com/app/noor-phonetic-quran/id6737744800',
    icon: 'fab fa-apple',
    labelKey: 'appStore',
  },
] as const;

export default async function Hero() {
  const t = await getTranslations('memorisationCoran.hero');
  const tBreadcrumb = await getTranslations('memorisationCoran.breadcrumb');

  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.breadcrumb}>
          <Link href="/">{tBreadcrumb('home')}</Link> / {tBreadcrumb('current')}
        </p>
        <h1>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <div className={styles.ctaGroup}>
          {STORE_LINKS.map((store) => (
            <a
              key={store.href}
              href={store.href}
              className={styles.btnStore}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={store.icon} />
              {t(store.labelKey)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
