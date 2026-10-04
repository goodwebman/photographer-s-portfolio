import { getTranslations } from 'next-intl/server';

import { SITE } from '@/shared/config';
import { UIContainer, UILogo } from '@/shared/ui';

import { FooterNav } from './footer-nav';
import { FooterSocials } from './footer-socials';

/** Подвал сайта: бренд, навигация, соц-ссылки, копирайт. Server component. */
export async function SiteFooter() {
  const t = await getTranslations('Footer');
  const tSite = await getTranslations('Site');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <UIContainer>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <UILogo name={SITE.brand} variant="footer" dataName="footer" />
            <p className="mt-4 max-w-sm text-small text-muted-foreground">
              {tSite('mission')}
            </p>
          </div>

          <nav aria-label={t('footerNav')}>
            <h2 className="text-caption font-semibold uppercase tracking-wider text-accent">
              {t('sections')}
            </h2>
            <FooterNav />
          </nav>

          <div>
            <h2 className="text-caption font-semibold uppercase tracking-wider text-accent">
              {t('contacts')}
            </h2>
            <FooterSocials />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t('copyright', { year, brand: SITE.brand })}</p>
        </div>
      </UIContainer>
    </footer>
  );
}
