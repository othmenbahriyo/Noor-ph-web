import Link from 'next/link';
import { headers } from 'next/headers';
import { Cairo } from 'next/font/google';
import './globals.css';
import styles from './not-found.module.css';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-app',
  display: 'swap',
});

const COPY = {
  fr: { title: 'Page introuvable', text: "Désolé, la page que vous cherchez n'existe pas ou a été déplacée.", back: "Retour à l'accueil" },
  en: { title: 'Page not found', text: "Sorry, the page you're looking for doesn't exist or has been moved.", back: 'Back to home' },
};

// Root-level fallback: as of this Next.js version, `app/not-found.tsx`
// intercepts every unmatched URL for the whole app (not just requests that
// fail to resolve a `[locale]` segment), so this is the 404 page visitors
// actually see. It bypasses the `[locale]` layout entirely, hence the
// self-contained <html>/<body>, manual globals.css import, and best-effort
// language detection from the Accept-Language header instead of the usual
// next-intl locale param.
export default async function RootNotFound() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';
  const locale = acceptLanguage.toLowerCase().startsWith('en') ? 'en' : 'fr';
  const homeHref = locale === 'en' ? '/en' : '/';
  const t = COPY[locale];

  return (
    <html lang={locale} className={cairo.variable}>
      <body>
        <section className={styles.section}>
          <div className="container">
            <span className={styles.code}>404</span>
            <h1>{t.title}</h1>
            <p>{t.text}</p>
            <Link href={homeHref} className={styles.backBtn}>
              {t.back}
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
