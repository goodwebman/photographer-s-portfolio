import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/shared/lib/seo';
import { JsonLd, UIContainer, UISection, UISectionHeading } from '@/shared/ui';

interface ContactPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
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
          { name: tNav('contact'), href: '/contact' },
        ])}
      />
      <UIContainer>
        <UISectionHeading title={t('contactTitle')} description={t('contactDescription')} />
      </UIContainer>
    </UISection>
  );
}
