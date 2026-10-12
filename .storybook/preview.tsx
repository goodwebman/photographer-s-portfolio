import type { Decorator, Preview } from '@storybook/nextjs-vite';

import { fontVariables } from '@/app/fonts';
import { revealBoot } from '@/shared/lib/reveal';
import type { Theme } from '@/shared/theme';

// Токены дизайн-системы + Tailwind (свой вход: сканирует и сторис).
import './preview.css';

// Scroll-reveal как на сайте: в приложении его запускает inline-скрипт в <head>.
revealBoot();

/**
 * Оборачивает каждую историю в окружение проекта:
 * - `data-theme` на `<html>` → резолвятся CSS-переменные токенов, `useTheme`
 *   читает тему оттуда же (как на сайте: тему ставит inline-скрипт);
 * - классы шрифтов на контейнере → `font-serif` / `font-sans` получают
 *   Playfair Display и Inter Tight, как `<html>` в приложении.
 */
const withProviders: Decorator = (Story, context) => {
  const theme = (context.globals.theme as Theme | undefined) ?? 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  return (
    // key по теме → чистый ремоунт истории при переключении в тулбаре.
    // isolate → обёртка = корень stacking-context, как body в приложении.
    <div
      key={theme}
      className={`${fontVariables} isolate bg-background p-10 font-sans text-foreground`}
    >
      <Story />
    </div>
  );
};

export const globalTypes = {
  theme: {
    description: 'Тема оформления дизайн-системы',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'dark', title: 'Ночь', icon: 'moon' },
        { value: 'light', title: 'День', icon: 'sun' },
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
