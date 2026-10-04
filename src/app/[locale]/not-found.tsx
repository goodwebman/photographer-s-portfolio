import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { UIContainer, UILinkButton } from '@/shared/ui';

/** 404 не должна попадать в индекс — иначе поисковик хранит «мусорные» URL. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/** 404 в пределах локали. */
export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <UIContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-display font-bold text-accent">404</p>
        <h1 className="mt-4 text-h2 font-bold text-foreground">{t('title')}</h1>
        <p className="mt-3 max-w-md text-body text-muted-foreground">
          {t('description')}
        </p>
        <UILinkButton
          href="/"
          variant="accent"
          size="M"
          className="mt-8"
          dataName="not-found-home"
        >
          {t('home')}
        </UILinkButton>
      </div>
    </UIContainer>
  );
}
