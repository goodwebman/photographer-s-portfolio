'use client';

import type { FC } from 'react';

import { usePortfolio } from './portfolio-context';

/**
 * Номер «следующего кадра» на плитке-CTA: кадров во вкладке + 1, две цифры.
 * Клиентский лист внутри серверной `PortfolioCta` — зависит от фильтра.
 */
export const PortfolioFrameNumber: FC = () => {
  const { visibleIds } = usePortfolio();

  return <>{String(visibleIds.length + 1).padStart(2, '0')}</>;
};
