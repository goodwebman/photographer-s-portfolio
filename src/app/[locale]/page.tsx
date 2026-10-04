import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { UIContainer, UISection, UISectionHeading } from '@/shared/ui';

interface HomePageProps {
  readonly params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const tSite = await getTranslations('Site');

  return (
    <UISection dataName="home">
      <UIContainer>
        <UISectionHeading
          eyebrow={tSite('role')}
          title={tSite('name')}
          description={tSite('mission')}
        />
      </UIContainer>
    </UISection>
  );
}
