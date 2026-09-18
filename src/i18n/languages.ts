import type { Locale } from './routing';

export interface LanguageInfo {
  code: Locale;
  flag: string;
  name: string;
}

// Native display name + flag for each locale in `routing.locales`. Order
// here drives display order in both the marketing "available languages"
// section and the language switcher.
export const LANGUAGES: LanguageInfo[] = [
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'pt', flag: '🇵🇹', name: 'Português' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
  { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia' },
  { code: 'fil', flag: '🇵🇭', name: 'Filipino' },
  { code: 'ur', flag: '🇵🇰', name: 'اردو' },
  { code: 'sw', flag: '🇹🇿', name: 'Kiswahili' },
  { code: 'wo', flag: '🇸🇳', name: 'Wolof' },
  { code: 'ro', flag: '🇷🇴', name: 'Română' },
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'uz', flag: '🇺🇿', name: "O'zbek" },
];
