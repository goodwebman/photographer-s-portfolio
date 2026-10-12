import type { FC, ReactNode } from 'react';

import { COPY, SITE } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { ArrowUpRightIcon, TelegramIcon } from '@/shared/ui/icons';

/** Уголки видоискателя; на hover сходятся внутрь — «фокус пойман». */
const CORNERS = [
  'left-0 top-0 border-l border-t group-hover:translate-x-1.5 group-hover:translate-y-1.5',
  'right-0 top-0 border-r border-t group-hover:-translate-x-1.5 group-hover:translate-y-1.5',
  'bottom-0 left-0 border-b border-l group-hover:translate-x-1.5 group-hover:-translate-y-1.5',
  'bottom-0 right-0 border-b border-r group-hover:-translate-x-1.5 group-hover:-translate-y-1.5',
] as const;

/** Сетка третей — волосяные линии, как колонки в hero. */
const THIRDS = [
  'inset-y-0 left-1/3 w-px',
  'inset-y-0 left-2/3 w-px',
  'inset-x-0 top-1/3 h-px',
  'inset-x-0 top-2/3 h-px',
] as const;

/**
 * # Интерфейс пропсов для компонента PortfolioCta
 * @interface IPortfolioCtaProps
 * @property {ReactNode} frame - номер «следующего кадра» (кадров в сетке + 1);
 *   в секции — клиентский `PortfolioFrameNumber`, он зависит от фильтра
 */
export interface IPortfolioCtaProps {
  readonly frame: ReactNode;
}

/**
 * Плитка-CTA в конце сетки — пустой «следующий кадр» в видоискателе: уголки
 * рамки, сетка третей, номер кадра в манере eyebrow секций и тёплый свет из
 * угла (натриевый фонарь «Ночью», золотой час «Днём»). Hover: уголки
 * сходятся, свет и сетка разгораются, стрелка уходит вверх-вправо.
 *
 * Размер плитки зависит от фильтра (½ ряда на мобиле, 1–2 колонки на
 * десктопе), поэтому типографика — от ширины самой плитки (container queries),
 * а не от вьюпорта. Server component.
 *
 * @component
 */
export const PortfolioCta: FC<IPortfolioCtaProps> = ({ frame }) => (
  <a
    href={SITE.telegram}
    target="_blank"
    rel="noopener noreferrer"
    data-name="PortfolioSection-cta"
    className="@container group relative isolate flex w-full flex-col justify-between overflow-hidden bg-surface p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-10 lg:p-12"
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-1/3 -top-1/3 -z-10 aspect-square w-[110%] bg-radial from-brand/25 to-transparent to-70% opacity-60 transition-opacity duration-700 group-hover:opacity-100"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden opacity-50 transition-opacity duration-700 group-hover:opacity-100 @xs:block"
    >
      {THIRDS.map((line) => (
        <span key={line} className={cn('absolute bg-border', line)} />
      ))}
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 sm:inset-4">
      {CORNERS.map((corner) => (
        <span
          key={corner}
          className={cn(
            'absolute size-3 border-brand-emphasis/50 transition duration-500 ease-out-expo group-hover:border-brand-emphasis sm:size-6',
            corner,
          )}
        />
      ))}
    </span>

    <span className="flex items-start justify-between gap-4">
      <span
        aria-hidden="true"
        className="flex items-center gap-3 text-eyebrow uppercase text-muted-foreground"
      >
        <span className="font-serif text-small normal-case tracking-normal text-brand-emphasis lining-nums">
          {frame}
        </span>
        <span className="hidden h-px w-8 bg-border @2xs:block" />
        <span className="hidden @2xs:inline">{COPY.portfolio.cta.frame}</span>
      </span>
      <ArrowUpRightIcon
        className="size-5 shrink-0 text-brand-emphasis transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-7"
      />
    </span>

    <span className="flex flex-col">
      <span className="font-serif text-h2 text-foreground @2xs:text-h1 @sm:text-title @2xl:text-display">
        {COPY.portfolio.cta.titleStart}{' '}
        <em className="block italic text-brand-emphasis @xl:pl-[0.8em]">
          {COPY.portfolio.cta.titleAccent}
        </em>
      </span>
      <span className="mt-4 hidden max-w-xs text-small text-muted-foreground @2xs:block">
        {COPY.portfolio.cta.text}
      </span>
      <span className="mt-6 inline-flex items-center gap-2.5 self-start border-b border-foreground/25 pb-1.5 text-eyebrow uppercase text-foreground transition-colors duration-300 group-hover:border-brand-emphasis sm:mt-8">
        <TelegramIcon className="size-3.5 text-brand-emphasis" />
        {COPY.portfolio.cta.action}
        <span className="hidden text-muted-foreground @2xs:inline">· {SITE.telegramHandle}</span>
      </span>
    </span>
  </a>
);
