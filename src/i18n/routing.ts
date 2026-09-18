import { defineRouting } from 'next-intl/routing';

// Mirrors the mobile app's AppTranslations (lib/app/translations) locale
// list, minus the region suffix (next-intl routes on language only, e.g.
// "ar" not "ar_SA"). "fil" matches the app's own key ("fil_PH" in its
// `keys` map) for Filipino, even though its source filename is `tg_PH.dart`.
export const routing = defineRouting({
  locales: [
    'fr',
    'en',
    'ar',
    'es',
    'de',
    'it',
    'nl',
    'pt',
    'ru',
    'tr',
    'zh',
    'hi',
    'id',
    'fil',
    'ur',
    'sw',
    'wo',
    'ro',
    'ja',
    'uz',
  ],
  defaultLocale: 'fr',
  // 'as-needed' + defaultLocale 'fr' means the default locale has NO prefix
  // (French stays at "/") while every other locale is prefixed (e.g. "/en",
  // "/ar"). This preserves the original static site's SEO URL structure.
  localePrefix: 'as-needed',
  // Without this, next-intl sets a NEXT_LOCALE cookie on every visit and
  // redirects future "/" requests to the cookied locale — so clicking the
  // FR link after having visited EN would bounce straight back to "/en".
  // The URL alone must decide the locale to match the site's hreflang/SEO
  // design and to make the language switcher actually switch.
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
