import type { FC } from 'react';

import Image from 'next/image';

import { getPhoto } from '@/entities/photo';
import { COPY, SECTION_ID, SITE, sectionHref } from '@/shared/config';
import { UIColumnLines, UIContainer, UILinkButton, UIReveal, UIWordReveal } from '@/shared/ui';

/** Вертикальный ночной кадр с лидирующей линией фонарей. */
const HERO_PHOTO = getPhoto('night-bridge-01');

const TITLE_ID = 'hero-title';

/**
 * Первый экран (реф. 3 + реф. 2): гигантское serif-имя, справа вертикальный
 * ночной кадр, волосяные линии колонок поверх.
 *
 * На десктопе имя шире своей колонки и заходит на фото; `mix-blend-difference`
 * с белым текстом инвертирует то, что под ним: на фоне страницы имя тёмное
 * («День») или светлое («Ночь»), на фото — контрастное кадру. На мобиле имя
 * над фото и лишь касается его верхнего края.
 *
 * Фото — LCP-элемент: `preload` + `fetchPriority="high"` (в Next 16
 * `priority` устарел и `fetchpriority` не ставит), без анимации прозрачности.
 *
 * h1 для скринридера и поисковика — «Аполлинария — фотограф в Омске»
 * (`COPY.hero.title`): одно имя в заголовке ничего не говорит о том, кто она и
 * где снимает. Eyebrow «Фотограф · Омск» дублирует это визуально и скрыт от
 * скринридера, чтобы не читалось дважды.
 */
export const Hero: FC = () => (
  <section
    id={SECTION_ID.top}
    aria-labelledby={TITLE_ID}
    data-name="Hero"
    className="relative overflow-hidden pt-16 lg:pt-[4.5rem]"
  >
    <UIColumnLines columns={4} dataName="hero" />

    <UIContainer className="relative">
      <div className="grid min-h-[calc(100svh-4rem)] grid-cols-1 content-start pb-12 pt-8 sm:pt-12 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr_auto] lg:gap-x-6 lg:pb-14 lg:pt-10">
        <UIReveal y={12} className="lg:col-span-7 lg:row-start-1">
          <p
            aria-hidden="true"
            className="flex items-center gap-3 text-eyebrow uppercase text-muted-foreground"
          >
            <span aria-hidden="true" className="h-px w-8 bg-brand-emphasis" />
            {COPY.hero.eyebrow}
          </p>
        </UIReveal>

        {/* blend — на обёртке: z-10 делает её stacking context'ом, и blend
            на самом h1 смешивался бы с пустым фоном обёртки, а не с фото. */}
        <div className="relative z-10 mt-6 mix-blend-difference lg:col-span-7 lg:row-start-2 lg:mt-[7vh] lg:self-start">
          <UIWordReveal
            id={TITLE_ID}
            text={COPY.hero.name}
            label={COPY.hero.title}
            split="char"
            delay={0.15}
            className="whitespace-nowrap font-serif text-hero font-normal uppercase text-white max-lg:-mb-[0.3em]"
          />
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:row-span-4 lg:row-start-1">
          <div className="relative aspect-4/5 overflow-hidden bg-muted sm:ml-auto sm:w-[70%] lg:aspect-auto lg:h-full lg:w-full">
            <Image
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1460px) 560px, (min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
              className="object-cover"
              style={{ objectPosition: '50% 40%' }}
            />
          </div>
        </div>

        {/* Лид и кнопки — отдельные ячейки: на десктопе лид встаёт под имя,
            кнопки — к низу экрана; на мобиле оба идут после фото. */}
        <UIReveal delay={0.5} className="mt-10 lg:col-span-5 lg:row-start-3 lg:mt-10">
          <p className="max-w-md text-body text-muted-foreground sm:text-[1.0625rem]">
            {COPY.hero.lead}
          </p>
        </UIReveal>

        <UIReveal delay={0.6} className="mt-8 lg:col-span-6 lg:row-start-4 lg:mt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <UILinkButton
              href={SITE.telegram}
              size="lg"
              className="text-eyebrow uppercase"
              dataName="hero-cta"
            >
              {COPY.hero.cta}
            </UILinkButton>
            <UILinkButton
              href={sectionHref(SECTION_ID.portfolio)}
              variant="outline"
              size="lg"
              className="bg-transparent text-eyebrow uppercase"
              dataName="hero-portfolio"
            >
              {COPY.hero.secondary}
            </UILinkButton>
          </div>
        </UIReveal>
      </div>
    </UIContainer>
  </section>
);
