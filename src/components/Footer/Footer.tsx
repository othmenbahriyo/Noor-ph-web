import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './Footer.module.css';
import BackToTop from './BackToTop';

const STORE_LINKS = [
  {
    href: 'https://play.google.com/store/apps/details?id=coran.noor.bhr',
    icon: 'fab fa-google-play',
    labelKey: 'googlePlay',
  },
  {
    href: 'https://apps.apple.com/sn/app/noor-phonetic-quran/id6737744800',
    icon: 'fab fa-apple',
    labelKey: 'appStore',
  },
] as const;

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('common.footer');
  const tNav = await getTranslations('common.nav');
  const tCta = await getTranslations('home.cta');
  const privacyHref = locale === 'en' ? '/en/privacy-policy' : '/privacy-policy';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';
  const year = new Date().getFullYear();

  // Section anchors only exist on the homepage. Prefix with the locale-aware
  // home path so links work from any other page too, not just from "/".
  const homePrefix = locale === 'en' ? '/en' : '';

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.ctaBanner}>
          <div>
            <h3>{tCta('title')}</h3>
            <p>{tCta('subtitle')}</p>
          </div>
          <div className={styles.ctaButtons}>
            {STORE_LINKS.map((store) => (
              <a
                key={store.href}
                href={store.href}
                className={styles.ctaBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={store.icon} />
                {tNav(store.labelKey)}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <h4>Noor Phonetic Quran</h4>
            <p>{t('about')}</p>
          </div>

          <div className={styles.footerLinks}>
            <h5>{t('quickLinks')}</h5>
            <ul>
              <li>
                <a href={`${homePrefix}/#features`}>{tNav('features')}</a>
              </li>
              <li>
                <a href={`${homePrefix}/#screenshots`}>{tNav('screenshots')}</a>
              </li>
              <li>
                <a href={`${homePrefix}/#testimonials`}>{tNav('reviews')}</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h5>{t('resources')}</h5>
            <ul>
              <li>
                <a href={`${homePrefix}/#faq`}>{t('faq')}</a>
              </li>
              <li>
                <Link href="/blog">{tNav('blog')}</Link>
              </li>
              <li>
                <a href={privacyHref}>{tNav('privacy')}</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h5>{t('contact')}</h5>
            <ul>
              <li>
                <a href={contactHref}>{t('support')}</a>
              </li>
              <li>{t('location')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>
            &copy; {year} Noor Phonetic Quran. {t('rights')}
          </span>
        </div>
      </div>

      <BackToTop label={t('backToTop')} />
    </footer>
  );
}
