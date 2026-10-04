import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/shared/lib/seo';
import { JsonLd, UIContainer, UISection, UISectionHeading } from '@/shared/ui';

interface PortfolioPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/portfolio',
    title: t('portfolioTitle'),
    description: t('portfolioDescription'),
  });
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
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
          { name: tNav('portfolio'), href: '/portfolio' },
        ])}
      />
      <UIContainer>
        <UISectionHeading title={t('portfolioTitle')} description={t('portfolioDescription')} />
      </UIContainer>
    </UISection>
  );
}
