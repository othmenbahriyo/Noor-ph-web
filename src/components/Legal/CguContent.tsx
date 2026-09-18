import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Legal.module.css';

export default function CguContent() {
  const t = useTranslations('cgu');
  const points = t.raw('summary.points') as { question: string; answer: string }[];
  const tocItems = t.raw('toc.items') as { id: string; label: string }[];
  const serviceItems = t.raw('sections.service.items') as string[];
  const conductItems = t.raw('sections.conduct.items') as string[];

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.appName}>{t('appName')}</h1>
          <h2 className={styles.pageTitle}>{t('pageTitle')}</h2>
          <div className={styles.updateDate}>{t('updateDate')}</div>

          <p>{t('intro1')}</p>

          <p>
            {t('intro2Before')} <Link href="/privacy-policy">{t('intro2LinkText')}</Link>
            {t('intro2After')}
          </p>

          <div className={styles.summary}>
            <h2>{t('summary.heading')}</h2>
            <p>{t('summary.intro')}</p>

            {points.map((point, i) => (
              <div className={styles.keyPoint} key={i}>
                <h3>{point.question}</h3>
                <p>{point.answer}</p>
              </div>
            ))}
          </div>

          <div className={styles.toc}>
            <h2>{t('toc.heading')}</h2>
            <ul>
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <h2 id="service">{t('sections.service.heading')}</h2>
          <p>{t('sections.service.intro')}</p>
          <ul>
            {serviceItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{t('sections.service.outro')}</p>

          <h2 id="eligibility">{t('sections.eligibility.heading')}</h2>
          <p>{t('sections.eligibility.body')}</p>

          <h2 id="account">{t('sections.account.heading')}</h2>
          <p>
            <strong>{t('sections.account.brief')}</strong> : {t('sections.account.briefText')}
          </p>
          <p>{t('sections.account.body')}</p>

          <h2 id="premium">{t('sections.premium.heading')}</h2>
          <p>
            <strong>{t('sections.premium.brief')}</strong> : {t('sections.premium.briefText')}
          </p>
          <p>{t('sections.premium.body')}</p>

          <h2 id="recitation">{t('sections.recitation.heading')}</h2>
          <p>
            <strong>{t('sections.recitation.brief')}</strong> : {t('sections.recitation.briefText')}
          </p>
          <p>
            {t('sections.recitation.bodyBefore')}{' '}
            <Link href="/privacy-policy">{t('sections.recitation.linkText')}</Link>
            {t('sections.recitation.bodyAfter')}
          </p>

          <h2 id="conduct">{t('sections.conduct.heading')}</h2>
          <p>{t('sections.conduct.intro')}</p>
          <ul>
            {conductItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 id="ip">{t('sections.ip.heading')}</h2>
          <p>{t('sections.ip.body')}</p>

          <h2 id="religious-content">{t('sections.religiousContent.heading')}</h2>
          <p>
            <strong>{t('sections.religiousContent.brief')}</strong> :{' '}
            {t('sections.religiousContent.briefText')}
          </p>
          <p>{t('sections.religiousContent.body')}</p>

          <h2 id="accessibility">{t('sections.accessibility.heading')}</h2>
          <p>
            <strong>{t('sections.accessibility.brief')}</strong> :{' '}
            {t('sections.accessibility.briefText')}
          </p>
          <p>{t('sections.accessibility.body')}</p>

          <h2 id="ads">{t('sections.ads.heading')}</h2>
          <p>
            {t('sections.ads.body1Before')}{' '}
            <Link href="/privacy-policy">{t('sections.ads.linkText')}</Link>
            {t('sections.ads.body1After')}
          </p>
          <p>{t('sections.ads.body2')}</p>

          <h2 id="availability">{t('sections.availability.heading')}</h2>
          <p>{t('sections.availability.body')}</p>

          <h2 id="termination">{t('sections.termination.heading')}</h2>
          <p>{t('sections.termination.body')}</p>

          <h2 id="disclaimer">{t('sections.disclaimer.heading')}</h2>
          <p>{t('sections.disclaimer.body')}</p>

          <h2 id="law">{t('sections.law.heading')}</h2>
          <p>{t('sections.law.body')}</p>

          <h2 id="updates">{t('sections.updates.heading')}</h2>
          <p>
            <strong>{t('sections.updates.brief')}</strong> : {t('sections.updates.briefText')}
          </p>
          <p>{t('sections.updates.body')}</p>

          <div className={styles.contact} id="contact">
            <h2>{t('sections.contact.heading')}</h2>
            <p>
              {t('sections.contact.bodyBefore')} <a href={`mailto:${t('sections.contact.email')}`}>{t('sections.contact.email')}</a>
              {t('sections.contact.bodyAfter')}
            </p>
          </div>
        </div>

        <footer className={styles.legalFooter}>
          <p>{t('footer')}</p>
        </footer>
      </div>
    </div>
  );
}
