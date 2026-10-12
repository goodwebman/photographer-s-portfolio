import type { FC } from 'react';

import Image from 'next/image';

import { formatAmount, MIN_PRICE } from '@/entities/service';
import { COPY, SECTION_ID } from '@/shared/config';
import { UIContainer, UIReveal, UISection, UISectionHeading } from '@/shared/ui';

import { PORTRAIT } from './portrait';

const TITLE_ID = 'about-title';

interface IFact {
  readonly term: string;
  readonly prefix?: string;
  readonly value: string;
  readonly unit: string;
  readonly note: string;
}

const FACTS: readonly IFact[] = [
  COPY.about.facts.retouch,
  COPY.about.facts.deadline,
  { ...COPY.about.facts.price, value: formatAmount(MIN_PRICE) },
];

/**
 * «Обо мне»: портрет Полины слева, справа — её слова из брифа (миссия
 * крупным serif с курсивным акцентом, где снимает) и три факта — только то,
 * что есть в брифе.
 *
 * Факты — строка характеристик, как в журнале: волосяная линия сверху с
 * терракотовой меткой в начале каждой ячейки, вертикальные разделители, крупная
 * цифра и мелкая единица курсивом в терракоте (рифма к «живые»). Размер
 * цифр — от ширины строки (`cqi`): «от 3 000 ₽» влезает в треть колонки
 * на любом десктопе. На мобиле — список «термин слева, цифра справа».
 *
 * Портрет — не работа из портфолио, поэтому файл лежит у виджета (`PORTRAIT`),
 * а не в `entities/photo` (иначе он попал бы в сетку и фильтры).
 */
export const AboutSection: FC = () => (
  <UISection id={SECTION_ID.about} tone="surface" ariaLabelledby={TITLE_ID} dataName="about">
    <UIContainer className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
      <UIReveal className="lg:col-span-5">
        <div className="relative aspect-4/5 overflow-hidden bg-muted max-lg:max-w-md">
          <Image
            src={PORTRAIT}
            alt={COPY.about.portraitAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 1460px) 540px, (min-width: 1024px) 38vw, (min-width: 480px) 448px, 100vw"
            className="object-cover"
            style={{ objectPosition: '52% 50%' }}
          />
        </div>
      </UIReveal>

      <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
        <UISectionHeading
          id={TITLE_ID}
          index="01"
          eyebrow={COPY.about.eyebrow}
          title={COPY.about.title}
        />

        <UIReveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-balance font-serif text-h2 font-normal text-foreground">
            {COPY.about.missionStart}{' '}
            <em className="italic text-brand-emphasis">{COPY.about.missionAccent}</em>{' '}
            {COPY.about.missionEnd}
          </p>
          <p className="mt-6 max-w-xl text-body text-muted-foreground">{COPY.about.city}</p>
        </UIReveal>

        <dl className="@container mt-12 grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {FACTS.map((fact, index) => (
            <UIReveal
              key={fact.term}
              delay={0.2 + index * 0.08}
              className="relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 py-5 before:absolute before:-top-px before:left-0 before:h-px before:w-8 before:bg-brand-emphasis max-sm:not-last:border-b max-sm:border-border sm:flex sm:flex-col sm:items-start sm:gap-4 sm:px-6 sm:pb-1 sm:pt-7 sm:first:pl-0 sm:last:pr-0 sm:not-first:border-l sm:not-first:border-border"
            >
              <dt className="text-eyebrow uppercase text-muted-foreground">{fact.term}</dt>
              <dd className="col-start-2 row-span-2 row-start-1 flex items-baseline gap-1.5 whitespace-nowrap font-serif text-[2.75rem] leading-none text-foreground lining-nums sm:text-[clamp(2rem,7.2cqi,3.5rem)]">
                {fact.prefix ? (
                  <span className="text-[0.42em] italic text-muted-foreground">{fact.prefix}</span>
                ) : null}
                {fact.value}
                <span className="pr-[0.15em] text-[0.42em] italic text-brand-emphasis">{fact.unit}</span>
              </dd>
              <dd className="text-small text-muted-foreground">{fact.note}</dd>
            </UIReveal>
          ))}
        </dl>
      </div>
    </UIContainer>
  </UISection>
);
