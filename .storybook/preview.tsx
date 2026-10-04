import type { Decorator, Preview } from '@storybook/nextjs-vite';

import { NextIntlClientProvider } from 'next-intl';

import { ThemeProvider, type Theme } from '@/shared/theme';

import { fontVariables } from '@/app/fonts';

// Токены дизайн-системы + Tailwind. Без этого импорта компоненты без стилей.
import '@/app/globals.css';

/**
 * Оборачивает каждую историю в провайдеры проекта:
 * - `data-theme` на контейнере → резолвятся CSS-переменные токенов (bg/fg/brand);
 * - классы `next/font` на контейнере → `font-serif` / `font-sans` получают
 *   Playfair Display и Inter Tight, как `<html>` в приложении;
 * - `ThemeProvider` (key по теме → чистый ремоунт при переключении в тулбаре) —
 *   нужен `UIThemeToggle`;
 * - `NextIntlClientProvider` — нужен locale-aware `Link` в карточках и ссылках.
 */
const withProviders: Decorator = (Story, context) => {
  const theme = (context.globals.theme as Theme | undefined) ?? 'dark';

  return (
    <NextIntlClientProvider locale="ru" messages={{}}>
      <ThemeProvider key={theme} initialTheme={theme}>
        {/* isolate → обёртка = корень stacking-context, как body в приложении. */}
        <div
          data-theme={theme}
          className={`${fontVariables} isolate bg-background p-10 font-sans text-foreground`}
        >
          <Story />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export const globalTypes = {
  theme: {
    description: 'Тема оформления дизайн-системы',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'dark', title: 'Dark', icon: 'moon' },
        { value: 'light', title: 'Light', icon: 'sun' },
      ],
      dynamicTitle: true,
    },
  },
};

export const initialGlobals = {
  theme: 'dark',
};

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withProviders],
};

export default preview;
