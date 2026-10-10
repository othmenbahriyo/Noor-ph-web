import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FeaturePage from '@/components/FeaturePage/FeaturePage';
import { featurePageMetadata, type FeaturePageConfig } from '@/components/FeaturePage/featurePageConfig';
import { routing } from '@/i18n/routing';

const CONFIG: FeaturePageConfig = {
  namespace: 'radioTv',
  path: '/radio-tv-coran',
  navKey: 'radioTv',
  related: [
    { href: '/audio-coran', navKey: 'audioCoran' },
    { href: '/adhkar-matin-soir', navKey: 'adhkar' },
    { href: '/widget-verset-du-jour', navKey: 'widgetVerset' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return featurePageMetadata(CONFIG, locale);
}

export default async function RadioTvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeaturePage config={CONFIG} locale={locale} />;
}
