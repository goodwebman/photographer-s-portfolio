'use client';

import type { FC, ReactNode } from 'react';
import { lazy, Suspense, useCallback, useId, useMemo, useState } from 'react';

import type { PhotoCategory } from '@/entities/photo';
import type { IUILightboxItem, IUILightboxLabels } from '@/shared/ui/ui-lightbox';

import { PortfolioContext, type PortfolioFilterValue } from './portfolio-context';

/** Лайтбокс (диалог кита, focus trap, свайпы) — отдельный чанк, по первому открытию. */
const loadLightbox = () => import('@/shared/ui/ui-lightbox');
const UILightbox = lazy(() => loadLightbox().then((module) => ({ default: module.UILightbox })));

const preloadLightbox = (): void => {
  void loadLightbox();
};

/** Кадр портфолио для клиента: то, что нужно фильтру и лайтбоксу. */
export interface IPortfolioItem extends IUILightboxItem {
  readonly category: PhotoCategory;
}

export interface IPortfolioProviderProps {
  /** Все работы в порядке сетки. */
  readonly items: readonly IPortfolioItem[];
  readonly labels: IUILightboxLabels;
  /** Серверная разметка секции: заголовок с фильтром и сетка. */
  readonly children: ReactNode;
}

/**
 * Состояние портфолио: фильтр по жанру и открытый в лайтбоксе кадр. Разметка
 * секции — серверная (children); вкладки, сетка и номер CTA читают
 * состояние из контекста. Лайтбокс монтируется после первого открытия и
 * листает кадры текущего фильтра.
 */
export const PortfolioProvider: FC<IPortfolioProviderProps> = ({ items, labels, children }) => {
  const baseId = useId();
  const [filter, setFilter] = useState<PortfolioFilterValue>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const visible = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );
  const visibleIds = useMemo(() => visible.map((item) => item.id), [visible]);

  const open = useCallback(
    (id: string) => {
      const index = visible.findIndex((item) => item.id === id);
      if (index === -1) return;
      setLightboxMounted(true);
      setOpenIndex(index);
    },
    [visible],
  );

  const value = useMemo(
    () => ({ filter, setFilter, visibleIds, open, preload: preloadLightbox, baseId }),
    [filter, visibleIds, open, baseId],
  );

  return (
    <PortfolioContext value={value}>
      <div data-name="UITabs-portfolio" className="flex flex-col">
        {children}
      </div>

      {lightboxMounted ? (
        <Suspense fallback={null}>
          <UILightbox
            items={visible}
            index={openIndex}
            onIndexChange={setOpenIndex}
            onClose={() => {
              setOpenIndex(null);
            }}
            labels={labels}
          />
        </Suspense>
      ) : null}
    </PortfolioContext>
  );
};
