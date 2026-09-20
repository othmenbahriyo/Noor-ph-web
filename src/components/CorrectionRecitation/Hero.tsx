import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import StoreLink from '@/components/StoreLink/StoreLink';
import styles from './Hero.module.css';

const STORE_LINKS = [
  {
    href: 'https://play.google.com/store/apps/details?id=coran.noor.bhr',
    icon: 'fab fa-google-play',
    label: 'Google Play',
    store: 'googlePlay',
  },
  {
    href: 'https://apps.apple.com/app/noor-phonetic-quran/id6737744800',
    icon: 'fab fa-apple',
    label: 'App Store',
    store: 'appStore',
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
            <StoreLink
              key={store.href}
              href={store.href}
              store={store.store}
              location="correction_recitation_hero"
              className={styles.btnStore}
            >
              <i className={store.icon} /> {store.label}
            </StoreLink>
          ))}
        </div>
      </div>
    </section>
  );
}
