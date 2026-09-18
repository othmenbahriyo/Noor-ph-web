import { useTranslations } from 'next-intl';
import styles from './LegalContent.module.css';

export default function PrivacyPolicyContent() {
  const t = useTranslations('privacyPolicy');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <h2>{t('heading')}</h2>
        <div className={styles.updateDate}>{t('lastUpdated')}</div>

        <p>{t('intro1')}</p>
        <p>
          {t.rich('intro2', {
            cguLink: (chunks) => <a href="/cgu">{chunks}</a>,
          })}
        </p>
        <p>
          {t.rich('intro3', {
            mailLink: (chunks) => <a href="mailto:othmeneb@gmail.com">{chunks}</a>,
          })}
        </p>

        <div className={styles.summary}>
          <h2>{t('summary.heading')}</h2>
          <p>{t('summary.intro')}</p>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q1.title')}</h3>
            <p>{t('summary.q1.text')}</p>
          </div>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q2.title')}</h3>
            <p>{t('summary.q2.text')}</p>
          </div>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q3.title')}</h3>
            <p>{t('summary.q3.text')}</p>
          </div>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q4.title')}</h3>
            <p>{t('summary.q4.text')}</p>
          </div>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q5.title')}</h3>
            <p>{t('summary.q5.text')}</p>
          </div>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q6.title')}</h3>
            <p>{t('summary.q6.text')}</p>
          </div>

          <div className={styles.keyPoint}>
            <h3>{t('summary.q7.title')}</h3>
            <p>
              {t.rich('summary.q7.text', {
                mailLink: (chunks) => <a href="mailto:othmeneb@gmail.com">{chunks}</a>,
              })}
            </p>
          </div>
        </div>

        <div className={styles.toc}>
          <h2>{t('toc.heading')}</h2>
          <ul>
            <li>
              <a href="#collect">{t('toc.items.collect')}</a>
            </li>
            <li>
              <a href="#process">{t('toc.items.process')}</a>
            </li>
            <li>
              <a href="#legal">{t('toc.items.legal')}</a>
            </li>
            <li>
              <a href="#share">{t('toc.items.share')}</a>
            </li>
            <li>
              <a href="#keep">{t('toc.items.keep')}</a>
            </li>
            <li>
              <a href="#rights">{t('toc.items.rights')}</a>
            </li>
            <li>
              <a href="#dnt">{t('toc.items.dnt')}</a>
            </li>
            <li>
              <a href="#us-rights">{t('toc.items.usRights')}</a>
            </li>
            <li>
              <a href="#updates">{t('toc.items.updates')}</a>
            </li>
            <li>
              <a href="#contact">{t('toc.items.contact')}</a>
            </li>
            <li>
              <a href="#access">{t('toc.items.access')}</a>
            </li>
          </ul>
        </div>

        <h2 id="collect">{t('sections.collect.heading')}</h2>
        <h3>{t('sections.collect.disclosedTitle')}</h3>
        <p>
          {t.rich('sections.collect.disclosedIntro', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('sections.collect.disclosedContact')}</p>
        <p>{t('sections.collect.disclosedAccount')}</p>

        <h3>{t('sections.collect.audioTitle')}</h3>
        <p>
          {t.rich('sections.collect.audioIntro', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('sections.collect.audioDetail')}</p>

        <h3>{t('sections.collect.autoTitle')}</h3>
        <p>{t('sections.collect.autoIntro')}</p>
        <div className={styles.tableWrap}>
          <table>
            <tbody>
              <tr>
                <th>{t('sections.collect.table.headers.service')}</th>
                <th>{t('sections.collect.table.headers.purpose')}</th>
                <th>{t('sections.collect.table.headers.data')}</th>
              </tr>
              <tr>
                <td>{t('sections.collect.table.rows.analytics.service')}</td>
                <td>{t('sections.collect.table.rows.analytics.purpose')}</td>
                <td>{t('sections.collect.table.rows.analytics.data')}</td>
              </tr>
              <tr>
                <td>{t('sections.collect.table.rows.crashlytics.service')}</td>
                <td>{t('sections.collect.table.rows.crashlytics.purpose')}</td>
                <td>{t('sections.collect.table.rows.crashlytics.data')}</td>
              </tr>
              <tr>
                <td>{t('sections.collect.table.rows.auth.service')}</td>
                <td>{t('sections.collect.table.rows.auth.purpose')}</td>
                <td>{t('sections.collect.table.rows.auth.data')}</td>
              </tr>
              <tr>
                <td>{t('sections.collect.table.rows.storage.service')}</td>
                <td>{t('sections.collect.table.rows.storage.purpose')}</td>
                <td>{t('sections.collect.table.rows.storage.data')}</td>
              </tr>
              <tr>
                <td>{t('sections.collect.table.rows.purchases.service')}</td>
                <td>{t('sections.collect.table.rows.purchases.purpose')}</td>
                <td>{t('sections.collect.table.rows.purchases.data')}</td>
              </tr>
              <tr>
                <td>{t('sections.collect.table.rows.admob.service')}</td>
                <td>{t('sections.collect.table.rows.admob.purpose')}</td>
                <td>{t('sections.collect.table.rows.admob.data')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{t('sections.collect.att')}</p>
        <p>{t('sections.collect.noLocation')}</p>

        <h2 id="process">{t('sections.process.heading')}</h2>
        <p>
          {t.rich('sections.process.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('sections.process.detail')}</p>

        <h2 id="legal">{t('sections.legal.heading')}</h2>
        <p>
          {t.rich('sections.legal.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <h3>{t('sections.legal.euTitle')}</h3>
        <p>{t('sections.legal.euIntro')}</p>
        <ul>
          <li>
            {t.rich('sections.legal.euList.consent', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich('sections.legal.euList.contract', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich('sections.legal.euList.legitimate', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
        </ul>

        <h3>{t('sections.legal.canadaTitle')}</h3>
        <p>{t('sections.legal.canadaText')}</p>

        <h2 id="share">{t('sections.share.heading')}</h2>
        <p>
          {t.rich('sections.share.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <h2 id="keep">{t('sections.keep.heading')}</h2>
        <p>
          {t.rich('sections.keep.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('sections.keep.detail')}</p>

        <h2 id="rights">{t('sections.rights.heading')}</h2>
        <p>
          {t.rich('sections.rights.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('sections.rights.detail')}</p>

        <h2 id="dnt">{t('sections.dnt.heading')}</h2>
        <p>{t('sections.dnt.text')}</p>

        <h2 id="us-rights">{t('sections.usRights.heading')}</h2>
        <p>
          {t.rich('sections.usRights.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <h2 id="updates">{t('sections.updates.heading')}</h2>
        <p>
          {t.rich('sections.updates.summary', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('sections.updates.detail')}</p>

        <div className={styles.contact} id="contact">
          <h2>{t('sections.contact.heading')}</h2>
          <p>
            {t.rich('sections.contact.text', {
              mailLink: (chunks) => <a href="mailto:othmeneb@gmail.com">{chunks}</a>,
            })}
          </p>
        </div>

        <h2 id="access">{t('sections.access.heading')}</h2>
        <p>
          {t.rich('sections.access.text', {
            mailLink: (chunks) => <a href="mailto:othmeneb@gmail.com">{chunks}</a>,
          })}
        </p>
      </div>

      <footer className={styles.pageFooter}>
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}
