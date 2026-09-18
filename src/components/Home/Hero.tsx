'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { useParallax } from '@/hooks/useParallax';
import Counter from './Counter';
import styles from './Hero.module.css';

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

export default function Hero() {
  const t = useTranslations('home.hero');
  const tNav = useTranslations('common.nav');

  useHeroAnimation();
  useParallax();

  return (
    <>
      {/* Desktop hero: glassmorphism + 3D device mockup */}
      <section className={styles.heroModern}>
        <div className={styles.heroBgElements}>
          <div className={`${styles.bgCircle} ${styles.circle1}`} />
          <div className={`${styles.bgCircle} ${styles.circle2}`} />
          <div className={`${styles.bgCircle} ${styles.circle3}`} />
          <div className={styles.bgPattern} />
        </div>

        <div className="container">
          <div className={styles.heroContentModern}>
            <div className={styles.heroTextModern}>
              <div className={`status-badge ${styles.statusBadge}`}>
                <span className={`${styles.statusDot} ${styles.pulse}`} />
                <span>{t('statusBadge')}</span>
              </div>

              <h1 className={`headline-modern ${styles.headlineModern}`}>
                <span className={styles.headlineHighlight}>{t('headlineHighlight')}</span>{' '}
                {t('headline')}
              </h1>
              <p className={`subheadline-modern ${styles.subheadlineModern}`}>{t('subheadline')}</p>

              <div className={`mini-features ${styles.miniFeatures}`}>
                <div className={styles.miniFeatureCard}>
                  <div className={styles.miniFeatureIcon}>
                    <i className="fas fa-language" />
                  </div>
                  <div className={styles.miniFeatureText}>
                    <h4>{t('miniFeatures.phonetics')}</h4>
                  </div>
                </div>
                <div className={styles.miniFeatureCard}>
                  <div className={styles.miniFeatureIcon}>
                    <i className="fas fa-headphones" />
                  </div>
                  <div className={styles.miniFeatureText}>
                    <h4>{t('miniFeatures.audio')}</h4>
                  </div>
                </div>
                <div className={styles.miniFeatureCard}>
                  <div className={styles.miniFeatureIcon}>
                    <i className="fas fa-book-reader" />
                  </div>
                  <div className={styles.miniFeatureText}>
                    <h4>{t('miniFeatures.tajweed')}</h4>
                  </div>
                </div>
              </div>

              <div className={`rating-card ${styles.ratingCard}`}>
                <div className={styles.ratingStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i className="fas fa-star" key={i} />
                  ))}
                  <span className={styles.ratingNumber}>5.0</span>
                </div>
                <div className={styles.ratingInfo}>
                  <p>{t('ratingText')}</p>
                </div>
              </div>

              <div className={`download-btns-modern ${styles.downloadBtnsModern}`}>
                {STORE_LINKS.map((store) => (
                  <a
                    key={store.href}
                    href={store.href}
                    className={`${styles.downloadBtnModern} ${
                      store.labelKey === 'googlePlay' ? styles.playStore : styles.appStore
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.btnIcon}>
                      <i className={store.icon} />
                    </div>
                    <div className={styles.btnText}>
                      <span className={styles.btnSmallText}>{t('downloadOn')}</span>
                      <span className={styles.btnLargeText}>{tNav(store.labelKey)}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className={`device-showcase ${styles.deviceShowcase}`}>
              <div className={`floating-badge ${styles.floatingBadge} ${styles.usersBadge}`}>
                <i className="fas fa-users" />
                <div className={styles.badgeContent}>
                  <Counter target={80000} className={styles.badgeNumber} />
                  <span className={styles.badgeText}>{t('usersBadgeLabel')}</span>
                </div>
              </div>

              <div className={`floating-badge ${styles.floatingBadge} ${styles.updateBadge}`}>
                <i className={`fas fa-sync-alt ${styles.spin}`} />
                <div className={styles.badgeContent}>
                  <span className={styles.badgeText}>{t('updateBadge')}</span>
                </div>
              </div>

              <div className={styles.device3dContainer}>
                <div className={`device-3d ${styles.device3d}`}>
                  <Image
                    src="/images/welcome_image1.png"
                    alt={t('deviceScreenAlt')}
                    className={styles.deviceScreen}
                    width={360}
                    height={680}
                    priority
                  />
                </div>
                <div className={styles.deviceShadow} />
              </div>

              <div className={styles.lightParticles}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Mobile-optimized hero (shown instead of the desktop hero below 992px) */}
      <section className={styles.heroMobile}>
        <div className={styles.heroMobileBg} />

        <div className="container">
          <div className={styles.mobileHeader}>
            <div className={styles.mobileAppIdentity}>
              <Image
                src="/images/logo.webp"
                alt="Noor Phonetic Quran Logo"
                className={styles.mobileLogo}
                width={60}
                height={60}
              />
              <span className={styles.mobileAppName}>Noor Phonetic Quran</span>
            </div>
          </div>

          <div className={styles.mobileHeroContent}>
            <p className={styles.mobileHeadline} role="heading" aria-level={1}>
              <span className={styles.headlineHighlight}>{t('headlineHighlight')}</span> {t('headline')}
            </p>
            <p className={styles.mobileSubheadline}>{t('subheadline')}</p>
          </div>

          <div className={styles.mobileDeviceContainer}>
            <div className={styles.mobileDeviceFrame}>
              <Image
                src="/images/welcome_image2.png"
                alt={t('mobileDeviceScreenAlt')}
                className={styles.mobileDeviceScreen}
                width={280}
                height={560}
                priority
              />

              <div className={`${styles.mobileIndicator} ${styles.phoneticIndicator}`}>
                <i className="fas fa-language" />
                <span>{t('miniFeatures.phonetics')}</span>
              </div>

              <div className={`${styles.mobileIndicator} ${styles.tajweedIndicator}`}>
                <i className="fas fa-book-reader" />
                <span>{t('miniFeatures.tajweed')}</span>
              </div>

              <div className={`${styles.mobileIndicator} ${styles.audioIndicator}`}>
                <i className="fas fa-headphones" />
                <span>{t('miniFeatures.audio')}</span>
              </div>
            </div>
          </div>

          <div className={styles.mobileDownloadButtons}>
            {STORE_LINKS.map((store) => (
              <a
                key={store.href}
                href={store.href}
                className={styles.mobileDownloadBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={store.icon} />
                <span>{tNav(store.labelKey)}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
