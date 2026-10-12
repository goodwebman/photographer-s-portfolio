'use client';

import type { FC, KeyboardEvent } from 'react';

import { panelId, tabId, usePortfolio, type PortfolioFilterValue } from './portfolio-context';

/** Вкладка фильтра: жанр, подпись и число кадров в нём. */
export interface IPortfolioTab {
  readonly id: PortfolioFilterValue;
  readonly label: string;
  readonly count: number;
}

export interface IPortfolioFilterProps {
  readonly tabs: readonly IPortfolioTab[];
  /** Доступное имя группы вкладок. */
  readonly label: string;
}

const NAV_KEYS = new Set(['ArrowRight', 'ArrowLeft', 'Home', 'End']);

/**
 * Клавиатура по WAI-ARIA Tabs (manual activation): стрелки двигают фокус по
 * кругу, Home/End — на края, выбор — Enter/Space (нативно у `<button>`).
 */
const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
  if (!NAV_KEYS.has(event.key)) return;

  const list = event.currentTarget.closest('[role="tablist"]');
  const tabs = Array.from(list?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
  const current = tabs.indexOf(event.currentTarget);
  event.preventDefault();

  const next =
    event.key === 'ArrowRight'
      ? (current + 1) % tabs.length
      : event.key === 'ArrowLeft'
        ? (current - 1 + tabs.length) % tabs.length
        : event.key === 'Home'
          ? 0
          : tabs.length - 1;

  tabs[next]?.focus();
};

/**
 * Фильтр портфолио по жанрам — вкладки с числом кадров. Разметка и классы —
 * как у `UITabs` кита с переопределениями сайта, но строками без
 * `tailwind-merge`: остров маленький и не тянет кит в клиентский бандл.
 */
export const PortfolioFilter: FC<IPortfolioFilterProps> = ({ tabs, label }) => {
  const { filter, setFilter, baseId } = usePortfolio();

  return (
    <div
      role="tablist"
      aria-label={label}
      data-name="UITabsList"
      className="inline-flex flex-wrap items-center justify-start gap-x-7 gap-y-1 text-muted-foreground"
    >
      {tabs.map((tab) => {
        const active = tab.id === filter;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={tabId(baseId, tab.id)}
            aria-selected={active}
            aria-controls={panelId(baseId)}
            // roving tabindex: в таб-порядке только активная вкладка
            tabIndex={active ? 0 : -1}
            data-state={active ? 'active' : 'inactive'}
            data-name={`UITab-${tab.id}`}
            onClick={() => {
              setFilter(tab.id);
            }}
            onKeyDown={handleKeyDown}
            className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap border-b border-transparent py-2 font-medium text-eyebrow uppercase text-muted-foreground ring-offset-background transition-all duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:border-brand-emphasis data-[state=active]:text-foreground"
          >
            {tab.label}{' '}
            <sup className="font-serif text-caption tracking-normal text-brand-emphasis lining-nums">
              {tab.count}
            </sup>
          </button>
        );
      })}
    </div>
  );
};
