'use client';

import { memo, type FC, type ReactNode } from 'react';
import { useMediaQuery } from '../../lib/use-media-query';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IShowProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly when: boolean | string;
}

export interface IHideProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly when: boolean | string;
}

// ─── ShowMedia (internal) ─────────────────────────────────────────────────────

interface ShowMediaProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly when: string;
}

const ShowMedia: FC<ShowMediaProps> = memo(({ children, fallback, when }) => {
  const matches = useMediaQuery(when);
  return matches ? children : (fallback ?? null);
});
ShowMedia.displayName = 'ShowMedia';

// ─── Show ─────────────────────────────────────────────────────────────────────

/**
 * Рендерит `children`, когда `when` истинно или media query совпадает.
 *
 * @example
 * ```tsx
 * <Show when={isOpen}>…</Show>
 * <Show when="(min-width: 960px)">…</Show>
 * ```
 */
export const Show: FC<IShowProps> = memo(({ children, fallback, when }) => {
  if (typeof when === 'boolean') {
    return when ? children : (fallback ?? null);
  }

  return (
    <ShowMedia fallback={fallback} when={when}>
      {children}
    </ShowMedia>
  );
});
Show.displayName = 'Show';

// ─── HideMedia (internal) ─────────────────────────────────────────────────────

interface HideMediaProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly when: string;
}

const HideMedia: FC<HideMediaProps> = memo(({ children, fallback, when }) => {
  const matches = useMediaQuery(when);
  return matches ? (fallback ?? null) : children;
});
HideMedia.displayName = 'HideMedia';

// ─── Hide ─────────────────────────────────────────────────────────────────────

/**
 * Рендерит `children`, когда `when` ложно или media query не совпадает.
 *
 * @example
 * ```tsx
 * <Hide when={isLoading} fallback={<Spinner />}>…</Hide>
 * <Hide when="(min-width: 960px)">…</Hide>
 * ```
 */
export const Hide: FC<IHideProps> = memo(({ children, fallback, when }) => {
  if (typeof when === 'boolean') {
    return when ? (fallback ?? null) : children;
  }

  return (
    <HideMedia fallback={fallback} when={when}>
      {children}
    </HideMedia>
  );
});
Hide.displayName = 'Hide';
