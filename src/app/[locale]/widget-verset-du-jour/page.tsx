import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FeaturePage from '@/components/FeaturePage/FeaturePage';
import { featurePageMetadata, type FeaturePageConfig } from '@/components/FeaturePage/featurePageConfig';
import { routing } from '@/i18n/routing';

const CONFIG: FeaturePageConfig = {
  namespace: 'widgetVerset',
  path: '/widget-verset-du-jour',
  navKey: 'widgetVerset',
  related: [
    { href: '/memorisation-coran', navKey: 'memorisationCoran' },
    { href: '/adhkar-matin-soir', navKey: 'adhkar' },
    { href: '/suivi-recitation-ia', navKey: 'suiviRecitationIa' },
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

export default async function WidgetVersetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeaturePage config={CONFIG} locale={locale} />;
}
