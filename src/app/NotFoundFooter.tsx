import Link from 'next/link';
import BackToTop from '@/components/Footer/BackToTop';
import footerStyles from '@/components/Footer/Footer.module.css';

// A static, French-only footer for the root 404 page. Reuses Footer's CSS
// module for a matching look, but avoids importing the real Footer
// component: it calls next-intl's getLocale()/getTranslations() server-side,
// which read the current request's headers — and since this file sits at
// the app root, it's implicitly part of every route's render tree, so that
// would mark the entire site as dynamic instead of statically prerendered.
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

export default function NotFoundFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={footerStyles.footer}>
      <div className="container">
        <div className={footerStyles.ctaBanner}>
          <div>
            <h3>Commencez votre voyage d&apos;apprentissage aujourd&apos;hui</h3>
            <p>Téléchargez Noor Phonetic Quran gratuitement et transformez votre expérience de récitation du Coran.</p>
          </div>
          <div className={footerStyles.ctaButtons}>
            {STORE_LINKS.map((store) => (
              <a
                key={store.href}
                href={store.href}
                className={footerStyles.ctaBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={store.icon} />
                {store.label}
              </a>
            ))}
          </div>
        </div>

        <div className={footerStyles.footerGrid}>
          <div className={footerStyles.footerAbout}>
            <h4>Noor Phonetic Quran</h4>
            <p>Une application innovante pour apprendre à réciter le Saint Coran avec précision et facilité.</p>
          </div>

          <div className={footerStyles.footerLinks}>
            <h5>Liens Rapides</h5>
            <ul>
              <li>
                <a href="/#features">Fonctionnalités</a>
              </li>
              <li>
                <a href="/#screenshots">Captures d&apos;écran</a>
              </li>
              <li>
                <a href="/#testimonials">Avis</a>
              </li>
            </ul>
          </div>

          <div className={footerStyles.footerLinks}>
            <h5>Ressources</h5>
            <ul>
              <li>
                <a href="/#faq">FAQ</a>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <a href="/privacy-policy">Confidentialité</a>
              </li>
            </ul>
          </div>

          <div className={footerStyles.footerLinks}>
            <h5>Contact</h5>
            <ul>
              <li>
                <a href="/contact">Support</a>
              </li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>

        <div className={footerStyles.footerBottom}>
          <span>&copy; {year} Noor Phonetic Quran. Tous droits réservés.</span>
        </div>
      </div>

      <BackToTop label="Retour en haut de page" />
    </footer>
  );
}
