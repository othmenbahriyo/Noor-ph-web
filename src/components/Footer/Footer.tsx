import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import NewsletterForm from '@/components/Newsletter/NewsletterForm';
import StoreLink from '@/components/StoreLink/StoreLink';
import CookieSettingsLink from '@/components/CookieConsent/CookieSettingsLink';
import styles from './Footer.module.css';
import BackToTop from './BackToTop';

const FOOTER_POSTS_LIMIT = 3;

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

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('common.footer');
  const tNav = await getTranslations('common.nav');
  const tCta = await getTranslations('home.cta');
  const tCookie = await getTranslations('common.cookieConsent');
  const privacyHref = locale === 'en' ? '/en/privacy-policy' : '/privacy-policy';
  const cguHref = locale === 'en' ? '/en/cgu' : '/cgu';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';
  const year = new Date().getFullYear();
  const recentPosts = getAllBlogPosts(locale).slice(0, FOOTER_POSTS_LIMIT);

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
              <StoreLink
                key={store.href}
                href={store.href}
                store={store.labelKey}
                location="footer_cta"
                className={styles.ctaBtn}
              >
                <i className={store.icon} />
                {tNav(store.labelKey)}
              </StoreLink>
            ))}
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <div className={styles.footerBrand}>
              <Image
                src="/images/logo.webp"
                alt="Noor Phonetic Quran Logo"
                width={40}
                height={40}
                className={styles.footerLogo}
              />
              <h4>Noor Phonetic Quran</h4>
            </div>
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
              <li>
                <a href={cguHref}>{tNav('pages.cgu')}</a>
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

          {recentPosts.length > 0 && (
            <div className={styles.footerLinks}>
              <h5>{t('recentPosts')}</h5>
              <ul className={styles.footerRecentPosts}>
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.cookieSettingsRow}>
          <CookieSettingsLink label={tCookie('manage')} />
        </div>

        <div className={styles.footerNewsletterRow}>
          <h5 className={styles.footerNewsletterTitle}>{t('newsletterTitle')}</h5>
          <NewsletterForm variant="compact" />
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
