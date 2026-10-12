'use client';

import type { FC } from 'react';
import { useCallback } from 'react';

// Прямые пути, не баррели: клиентский остров не должен тянуть соседние модули.
import { useScrolledRatio } from '@/shared/lib/hooks/use-scroll-flag';
import { ArrowUpIcon } from '@/shared/ui/icons/stroke-icons';
import { UIFab } from '@/shared/ui/ui-fab';

/**
 * Порог скролла (доля прокручиваемой высоты документа) для появления кнопки.
 * 0.2 = 20% — когда пользователь пролистал пятую часть страницы.
 */
const SCROLL_THRESHOLD = 0.2;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export interface IBackToTopProps {
  /** Доступное имя кнопки. Приходит с сервера: `COPY` целиком в клиентский бандл не тянем. */
  readonly label: string;
}

/**
 * «Наверх» — плавающая кнопка в правом нижнем углу. Появляется после
 * `SCROLL_THRESHOLD` прокрутки, по клику возвращает к началу страницы
 * (мгновенно при `prefers-reduced-motion`).
 *
 * Виджет держит только поведение — оформление и анимация живут в `UIFab`.
 */
export const BackToTop: FC<IBackToTopProps> = ({ label }) => {
  const visible = useScrolledRatio(SCROLL_THRESHOLD);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  }, []);

  return (
    <UIFab
      visible={visible}
      label={label}
      onClick={handleClick}
      dataName="back-to-top"
    >
      <ArrowUpIcon className="size-5 sm:size-5.5" />
    </UIFab>
  );
};
