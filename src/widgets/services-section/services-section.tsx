import type { FC } from 'react';

import { formatRub, SERVICES } from '@/entities/service';
import { COPY, SECTION_ID, SITE } from '@/shared/config';
import {
  UIAlert,
  UIContainer,
  UILinkButton,
  UINumberedList,
  UIPriceCard,
  UIReveal,
  UISection,
  UISectionHeading,
} from '@/shared/ui';

const TITLE_ID = 'services-title';

/**
 * Услуги и цены (реф. 3): три карточки тарифов из брифа, ниже — «Что входит
 * в услугу» нумерованными строками (реф. 2) и сноска, что студия оплачивается
 * отдельно. Полный список «что входит» один на все тарифы, а не копия в
 * каждой карточке.
 */
export const ServicesSection: FC = () => (
  <UISection id={SECTION_ID.services} tone="surface" ariaLabelledby={TITLE_ID} dataName="services">
    <UIContainer>
      <UISectionHeading
        id={TITLE_ID}
        index="03"
        eyebrow={COPY.services.eyebrow}
        title={COPY.services.title}
      />

      <ul className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3 lg:gap-6">
        {SERVICES.map((service, index) => (
          <li key={service.id}>
            <UIReveal delay={index * 0.08} className="h-full">
              <UIPriceCard
                index={String(index + 1).padStart(2, '0')}
                title={service.title}
                note={service.note}
                price={formatRub(service.pricePerHour)}
                unit={COPY.services.perHour}
                extra={`${COPY.services.extraHour} ${formatRub(service.extraHour)}`}
                dataName={service.id}
                action={
                  <UILinkButton
                    href={SITE.telegram}
                    variant="outline"
                    fullWidth
                    ariaLabel={`${COPY.services.ctaLabel} ${service.title.toLowerCase()}`}
                    className="bg-transparent text-eyebrow uppercase"
                    dataName={`service-${service.id}`}
                  >
                    {COPY.services.cta}
                  </UILinkButton>
                }
              />
            </UIReveal>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid gap-10 sm:mt-28 lg:grid-cols-12 lg:gap-x-6">
        <UIReveal className="flex flex-col gap-8 lg:col-span-4">
          <h3 className="text-balance font-serif text-h1 font-normal text-foreground">
            {COPY.services.includedTitle}
          </h3>
          {/* role="note": статичная сноска. Дефолтный role="alert" у UIAlert
              заставил бы скринридер зачитать её при загрузке страницы. */}
          <UIAlert role="note" className="rounded-none border-border bg-transparent px-5 py-4 text-small">
            <span className="mr-2 font-serif text-brand-emphasis">*</span>
            {COPY.services.studioNote}
          </UIAlert>
        </UIReveal>

        <UIReveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <UINumberedList
            items={COPY.services.included}
            ariaLabel={COPY.services.includedTitle}
            dataName="included"
          />
        </UIReveal>
      </div>
    </UIContainer>
  </UISection>
);
