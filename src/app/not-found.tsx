import Link from 'next/link';
import { Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header/Header';
import NotFoundFooter from './NotFoundFooter';
import frMessages from '../../messages/fr.json';
import './globals.css';
import styles from './not-found.module.css';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-app',
  display: 'swap',
});

const COPY = {
  title: 'Page introuvable',
  text: "Désolé, la page que vous cherchez n'existe pas ou a été déplacée.",
  back: "Retour à l'accueil",
};

// Root-level fallback: as of this Next.js version, `app/not-found.tsx`
// intercepts every unmatched URL for the whole app (not just requests that
// fail to resolve a `[locale]` segment), so this is the 404 page visitors
// actually see. It bypasses the `[locale]` layout entirely, hence the
// self-contained <html>/<body> and manual globals.css import. Always
// renders in French (no Accept-Language detection): reading request
// headers here would mark every route in the app as dynamic, since this
// file is implicitly part of every route's render tree in this Next.js
// version and the project doesn't have Cache Components enabled.
export default function RootNotFound() {
  return (
    <html lang="fr" className={cairo.variable}>
      <body>
        <NextIntlClientProvider locale="fr" messages={frMessages}>
          <Header />
          <section className={styles.section}>
            <div className="container">
              <div className={styles.icon}>
                <i className="fas fa-compass" />
              </div>
              <span className={styles.code}>404</span>
              <h1>{COPY.title}</h1>
              <p>{COPY.text}</p>
              <Link href="/" className={styles.backBtn}>
                {COPY.back}
              </Link>
            </div>
          </section>
          <NotFoundFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
