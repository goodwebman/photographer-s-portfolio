'use client';

import { createContext } from 'react';

/**
 * id секции в центре экрана (scroll-spy `HeaderShell`) — для пунктов
 * мобильного меню. `null` — ни одна секция не в зоне (например, hero).
 */
export const ActiveSectionContext = createContext<string | null>(null);
