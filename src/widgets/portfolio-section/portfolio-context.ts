'use client';

import { createContext, use } from 'react';

import type { PhotoCategory } from '@/entities/photo';

/** Фильтр портфолио: жанр или все работы. */
export type PortfolioFilterValue = PhotoCategory | 'all';

/** Общее состояние островов портфолио (фильтр, сетка, номер CTA, лайтбокс). */
export interface IPortfolioContextValue {
  readonly filter: PortfolioFilterValue;
  readonly setFilter: (filter: PortfolioFilterValue) => void;
  /** id кадров, видимых при текущем фильтре, — в порядке сетки. */
  readonly visibleIds: readonly string[];
  /** Открыть кадр в лайтбоксе. */
  readonly open: (id: string) => void;
  /** Прогреть чанк лайтбокса заранее (hover/focus по сетке). */
  readonly preload: () => void;
  /** Базовый id для aria-связки вкладок и панели. */
  readonly baseId: string;
}

export const PortfolioContext = createContext<IPortfolioContextValue | null>(null);

/** Доступ к состоянию портфолио. Кидает вне `PortfolioProvider`. */
export const usePortfolio = (): IPortfolioContextValue => {
  const ctx = use(PortfolioContext);
  if (ctx === null) {
    throw new Error('usePortfolio должен вызываться внутри <PortfolioProvider>');
  }

  return ctx;
};

/** id вкладки фильтра. */
export const tabId = (baseId: string, filter: PortfolioFilterValue): string =>
  `${baseId}tab-${filter}`;

/** id панели с сеткой (одна на все вкладки). */
export const panelId = (baseId: string): string => `${baseId}panel`;
