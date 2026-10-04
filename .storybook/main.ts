import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  // Отдаём public/ статикой — работают next/image и пути вида "/avatar.svg".
  staticDirs: ['../public'],
  // Тот же "@" → src алиас, что в tsconfig/vitest, чтобы @/-импорты резолвились.
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../src', import.meta.url)),
        },
      },
    }),
};

export default config;
