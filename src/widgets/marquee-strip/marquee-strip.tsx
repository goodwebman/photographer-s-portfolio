import type { FC } from 'react';
import { Fragment } from 'react';

import { COPY } from '@/shared/config';
import { UIMarquee } from '@/shared/ui';

/**
 * Бегущая строка между hero и «Обо мне»: жанры и форматы курсивным serif
 * между волосяными линиями. `UIMarquee` кита; при reduced-motion стоит.
 * Вторая дорожка ленты скрыта от скринридера самим китом.
 */
export const MarqueeStrip: FC = () => (
  <div data-name="MarqueeStrip" className="border-y border-border py-5 sm:py-7">
    <UIMarquee durationSec={40} gap={40} testId="strip">
      {COPY.marquee.map((word) => (
        <Fragment key={word}>
          <span className="whitespace-nowrap font-serif text-h2 italic text-foreground">{word}</span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-emphasis" />
        </Fragment>
      ))}
    </UIMarquee>
  </div>
);
