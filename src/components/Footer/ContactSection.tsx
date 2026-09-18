import { getTranslations } from 'next-intl/server';
import ContactForm from './ContactForm';
import styles from './ContactSection.module.css';

interface ContactSectionProps {
  /** Set when this section is the first thing on the page (e.g. the dedicated /contact route) */
  standalone?: boolean;
}

const HIGHLIGHT_ICONS = ['fa-bolt', 'fa-users', 'fa-lightbulb'] as const;

export default async function ContactSection({ standalone = false }: ContactSectionProps) {
  const t = await getTranslations('common.contactForm');
  const highlights = t.raw('highlights') as { title: string; text: string }[];

  return (
    <section
      id="contact"
      className={`${styles.rowSection} ${standalone ? styles.rowSectionStandalone : ''}`}
    >
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className={styles.rowGrid}>
          <div className={styles.rowIntro}>
            <ul className={styles.highlightList}>
              {highlights.map((item, index) => (
                <li key={item.title} className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>
                    <i className={`fas ${HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length]}`} />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
