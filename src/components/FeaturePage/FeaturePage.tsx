import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StoreLink from '@/components/StoreLink/StoreLink';
import TrackedLink from '@/components/TrackedLink/TrackedLink';
import heroStyles from '../MemorisationCoran/Hero.module.css';
import contentStyles from '../MemorisationCoran/ContentBlock.module.css';
import featureStyles from '../MemorisationCoran/Features.module.css';
import relatedStyles from '../MemorisationCoran/Related.module.css';
import pageStyles from './FeaturePage.module.css';
import FeatureFaq from './FeatureFaq';
import { featurePageJsonLd, type FeaturePageConfig } from './featurePageConfig';

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

/** Page de fonctionnalité complète (voir `featurePage.ts`). */
export default async function FeaturePage({
  config,
  locale,
}: {
  config: FeaturePageConfig;
  locale: string;
}) {
  const t = await getTranslations(config.namespace);
  const tNav = await getTranslations('common.nav');
  const paragraphs = t.raw('intro.paragraphs') as string[];
  const steps = t.raw('features.items') as { title: string; description: string }[];
  const jsonLd = await featurePageJsonLd(config, locale);
  const analyticsId = config.path.replace(/^\//, '').replace(/-/g, '_');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <section className={heroStyles.hero}>
        <div className="container">
          <p className={heroStyles.breadcrumb}>
            <Link href="/">{t('breadcrumb.home')}</Link> / {t('breadcrumb.current')}
          </p>
          <h1>{t('hero.title')}</h1>
          <p className={heroStyles.subtitle}>{t('hero.subtitle')}</p>
          <div className={heroStyles.ctaGroup}>
            {STORE_LINKS.map((store) => (
              <StoreLink
                key={store.href}
                href={store.href}
                store={store.labelKey}
                location={`${analyticsId}_hero`}
                className={heroStyles.btnStore}
              >
                <i className={store.icon} />
                {t(`hero.${store.labelKey}`)}
              </StoreLink>
            ))}
          </div>
        </div>
      </section>
      <main className={pageStyles.main}>
        <div className={`container ${contentStyles.containerWrap}`}>
          <div className={contentStyles.contentBlock}>
            <h2>{t('intro.title')}</h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={`container ${contentStyles.containerWrap}`}>
          <div className={contentStyles.contentBlock}>
            <h2>{t('features.title')}</h2>
            <ol className={featureStyles.stepsList}>
              {steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong> — {step.description}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <FeatureFaq namespace={config.namespace} page={analyticsId} />
        <div className={`container ${contentStyles.containerWrap}`}>
          <div className={contentStyles.contentBlock}>
            <h2>{t('related.title')}</h2>
            <div className={relatedStyles.relatedFeatures}>
              {config.related.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName="related_link_click"
                  params={{ from: analyticsId, to: link.href }}
                >
                  {tNav(`pages.${link.navKey}`)}
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
