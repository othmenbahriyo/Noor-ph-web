import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cairo } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-app',
  display: 'swap',
});

const RTL_LOCALES = new Set(['ar', 'ur']);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Noor Phonetic Quran',
  description:
    "Apprenez à réciter, mémoriser et lire le Coran en entier même sans connaître l'arabe.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={cairo.variable}>
      <head>
        <link href="/fontawesome/css/all.min.css" rel="stylesheet" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Noor Phonetic Quran - Blog"
          href="/rss.xml"
        />
        <script
          // Runs before first paint to avoid a light-mode flash: applies the
          // saved theme (or the OS preference on first visit) synchronously,
          // since React hydration happens too late to prevent a FOUC here.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('noor-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
