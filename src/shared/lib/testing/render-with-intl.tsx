import type { ReactElement } from 'react';

import { render, type RenderResult } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { routing } from '@/shared/i18n';

/**
 * # Рендер в контексте next-intl
 *
 * Locale-aware `Link` из `@/shared/i18n` внутри читает текущую локаль из
 * контекста и без провайдера падает. Хелпер оборачивает дерево минимальным
 * провайдером, чтобы тесты компонентов со ссылками не тащили этот бойлерплейт.
 *
 * @param ui - тестируемое дерево
 * @param messages - словарь, если компонент использует переводы
 */
export const renderWithIntl = (
  ui: ReactElement,
  messages: Record<string, unknown> = {},
): RenderResult =>
  render(
    <NextIntlClientProvider locale={routing.defaultLocale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
