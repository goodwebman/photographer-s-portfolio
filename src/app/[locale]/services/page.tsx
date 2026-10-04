import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/shared/lib/seo';
import { JsonLd, UIContainer, UISection, UISectionHeading } from '@/shared/ui';

interface ServicesPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/services',
    title: t('servicesTitle'),
    description: t('servicesDescription'),
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations('Meta');
  const tNav = await getTranslations('Nav');

  return (
    <UISection>
      <JsonLd
        data={buildBreadcrumbJsonLd(typedLocale, [
          { name: tNav('home'), href: '/' },
          { name: tNav('services'), href: '/services' },
        ])}
      />
      <UIContainer>
        <UISectionHeading title={t('servicesTitle')} description={t('servicesDescription')} />
      </UIContainer>
    </UISection>
  );
}
