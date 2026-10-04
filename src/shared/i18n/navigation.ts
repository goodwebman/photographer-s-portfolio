import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * Locale-aware обёртки навигации. Используем ЭТИ `Link`/`useRouter`/`usePathname`
 * вместо `next/*`, чтобы префикс локали проставлялся автоматически.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
