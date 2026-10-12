import type { FC } from 'react';

import { COPY, NAV, SITE, sectionHref } from '@/shared/config';
import { UIContainer, UILogo, UINavLink } from '@/shared/ui';

import { FooterSocials } from './footer-socials';

/**
 * Подвал: знак и подпись, якоря секций, соцсети, копирайт и сноска про Meta
 * (в подвале есть Instagram). Server component.
 */
export const SiteFooter: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer data-name="SiteFooter" className="border-t border-border bg-surface">
      <UIContainer className="py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <UILogo name={SITE.brand} label={COPY.header.home} variant="footer" dataName="footer" />
            <p className="mt-3 text-small text-muted-foreground">{COPY.footer.tagline}</p>
          </div>

          <nav aria-label={COPY.footer.nav}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV.map((item) => (
                <li key={item.id}>
                  <UINavLink href={sectionHref(item.id)} variant="footer" dataName={`footer-${item.id}`}>
                    {item.label}
                  </UINavLink>
                </li>
              ))}
            </ul>
          </nav>

          <FooterSocials />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-caption text-muted-foreground lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0">{`© ${String(year)} ${SITE.brand}`}</p>
          <p className="max-w-2xl lg:text-right">{COPY.common.metaDisclaimer}</p>
        </div>
      </UIContainer>
    </footer>
  );
};
