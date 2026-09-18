import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // 'as-needed' + defaultLocale 'fr' means the default locale has NO prefix
  // (French stays at "/") while every other locale is prefixed ("/en").
  // This preserves the original static site's SEO URL structure.
  localePrefix: 'as-needed',
  // Without this, next-intl sets a NEXT_LOCALE cookie on every visit and
  // redirects future "/" requests to the cookied locale — so clicking the
  // FR link after having visited EN would bounce straight back to "/en".
  // The URL alone must decide the locale to match the site's hreflang/SEO
  // design and to make the language switcher actually switch.
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
