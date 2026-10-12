'use client';

import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { panelId, tabId, usePortfolio } from './portfolio-context';

export interface IPortfolioGridProps {
  /** id всех кадров в порядке сетки. */
  readonly ids: readonly string[];
  /** Серверная разметка плиток (`UIPhotoTile` с `itemId`) по id кадра. */
  readonly tiles: Readonly<Record<string, ReactNode>>;
  /** Плитка-CTA, закрывающая неполный последний ряд. */
  readonly cta: ReactNode;
}

/**
 * Классы плитки-CTA по тому, сколько ячеек пустует в последнем ряду:
 * ключ — `<на мобиле (2 колонки)><на десктопе (3 колонки)>`. Полными
 * строками — чтобы сканер Tailwind видел каждый класс.
 */
const CTA_SPAN: Record<string, string> = {
  '00': 'hidden',
  '01': 'hidden lg:flex lg:col-span-1',
  '02': 'hidden lg:flex lg:col-span-2',
  '10': 'flex lg:hidden',
  '11': 'flex lg:col-span-1',
  '12': 'flex lg:col-span-2',
};

/** Сколько ячеек пустует в последнем ряду сетки из `columns` колонок. */
const emptyCells = (count: number, columns: number): number =>
  count % columns === 0 ? 0 : columns - (count % columns);

const ctaSpanClass = (count: number): string =>
  CTA_SPAN[`${String(emptyCells(count, 2))}${String(emptyCells(count, 3))}`];

/** Каскад появления по колонкам ряда, сек. */
const revealDelay = (index: number): CSSProperties | undefined =>
  index % 3 === 0 ? undefined : ({ '--reveal-delay': `${String((index % 3) * 0.06)}s` } as CSSProperties);

/**
 * Сетка портфолио (ровная 2:3) — панель вкладок фильтра.
 *
 * Плитки отрендерены на сервере и все лежат в DOM: фильтр не пересоздаёт
 * картинки, а прячет чужие плитки атрибутом `hidden`. Клик по кадру —
 * делегирование: плитка несёт `data-item-id`, лайтбокс открывает контекст.
 * Неполный последний ряд закрывает плитка-CTA — дыр в сетке нет при любом
 * фильтре. Появление плиток — `data-reveal` на `<li>` (scroll-reveal на CSS).
 *
 * Лоадер кадра (`UIPhotoTile`) показывается только после гидратации
 * (`data-tiles-ready`) и до загрузки: `load`/`error` картинок ловятся на
 * списке в capture-фазе (эти события не всплывают), уже загруженные
 * отмечаются при монтировании.
 */
export const PortfolioGrid: FC<IPortfolioGridProps> = ({ ids, tiles, cta }) => {
  const { filter, visibleIds, open, preload, baseId } = usePortfolio();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const markLoaded = (img: HTMLImageElement) => {
      img.closest('[data-photo-tile]')?.setAttribute('data-loaded', '');
    };
    const onSettled = (event: Event) => {
      if (event.target instanceof HTMLImageElement) markLoaded(event.target);
    };

    list.querySelectorAll('img').forEach((img) => {
      if (img.complete) markLoaded(img);
    });
    list.addEventListener('load', onSettled, true);
    list.addEventListener('error', onSettled, true);
    list.setAttribute('data-tiles-ready', '');

    return () => {
      list.removeEventListener('load', onSettled, true);
      list.removeEventListener('error', onSettled, true);
    };
  }, []);

  const onClick = (event: MouseEvent<HTMLUListElement>) => {
    const tile = (event.target as Element).closest<HTMLElement>('[data-item-id]');
    if (tile?.dataset.itemId) open(tile.dataset.itemId);
  };

  /** Позиция кадра среди видимых — для каскада по колонкам; нет — плитка скрыта. */
  const position = new Map(visibleIds.map((id, index) => [id, index]));

  return (
    <div
      role="tabpanel"
      id={panelId(baseId)}
      aria-labelledby={tabId(baseId, filter)}
      // панель фокусируема: после выбора вкладки Tab уводит фокус в её содержимое
      tabIndex={0}
      data-name="UITabPanel"
      className="mt-12 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:mt-16"
    >
      <ul
        ref={listRef}
        onClick={onClick}
        onPointerEnter={preload}
        onFocus={preload}
        className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
      >
        {ids.map((id) => {
          const index = position.get(id);

          return (
            <li
              key={id}
              hidden={index === undefined}
              data-reveal="fade"
              style={index === undefined ? undefined : revealDelay(index)}
              suppressHydrationWarning
            >
              {tiles[id]}
            </li>
          );
        })}
        <li className={`min-h-0 ${ctaSpanClass(visibleIds.length)}`}>
          <div
            data-reveal="fade"
            className="flex w-full"
            style={revealDelay(visibleIds.length)}
            suppressHydrationWarning
          >
            {cta}
          </div>
        </li>
      </ul>
    </div>
  );
};
