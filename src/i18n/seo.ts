import { routing } from './routing';

const SITE_URL = 'https://noor-phonetic-quran.com';

// OpenGraph wants a full locale tag (language_TERRITORY), not just the
// language code next-intl routes on.
const OG_LOCALES: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  ar: 'ar_SA',
  es: 'es_ES',
  de: 'de_DE',
  it: 'it_IT',
  nl: 'nl_NL',
  pt: 'pt_PT',
  ru: 'ru_RU',
  tr: 'tr_TR',
  zh: 'zh_CN',
  hi: 'hi_IN',
  id: 'id_ID',
  fil: 'fil_PH',
  ur: 'ur_PK',
  sw: 'sw_TZ',
  wo: 'wo_SN',
  ro: 'ro_RO',
  ja: 'ja_JP',
  uz: 'uz_UZ',
};

export function ogLocaleFor(locale: string): string {
  return OG_LOCALES[locale] ?? locale;
}

// Twitter Cards render best with a shorter, punchier description than
// OpenGraph's ~160-character one. Rather than maintaining a second
// hand-translated string per page across 20 locales, derive it by trimming
// at the last full sentence (or word) boundary before the limit.
export function twitterDescriptionFor(ogDescription: string, maxLength = 200): string {
  if (ogDescription.length <= maxLength) return ogDescription;

  const truncated = ogDescription.slice(0, maxLength);
  const lastSentenceEnd = Math.max(truncated.lastIndexOf('. '), truncated.lastIndexOf('! '));
  if (lastSentenceEnd > maxLength * 0.5) {
    return truncated.slice(0, lastSentenceEnd + 1);
  }

  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace)}…`;
}

/**
 * Builds the canonical URL and the full set of hreflang alternates for a
 * given page path across all 20 supported locales, honoring the
 * 'as-needed' localePrefix scheme (default locale "fr" has no prefix).
 */
export function buildLocaleUrls(locale: string, path: string) {
  const withPrefix = (loc: string) => {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    return `${SITE_URL}${prefix}${path}`;
  };

  const languages = Object.fromEntries(routing.locales.map((loc) => [loc, withPrefix(loc)]));
  languages['x-default'] = withPrefix(routing.defaultLocale);

  return {
    canonicalUrl: withPrefix(locale),
    languages,
    ogLocale: ogLocaleFor(locale),
  };
}
