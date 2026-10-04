import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    server: {
      // next-intl поставляется как ESM и импортит подпуть `next/navigation`.
      // Без инлайна Vite оставляет пакет внешним, и его резолвит Node — уже без
      // алиасов Vite, из-за чего подпуть без расширения не находится.
      deps: { inline: ['next-intl'] },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // next-intl импортит `next/navigation` из ESM-сборки, а Vite резолвит
      // подпуть без exports-карты Next и не находит файл. Явный алиас на
      // реальный модуль чинит запуск тестов с locale-aware `Link`.
      'next/navigation': fileURLToPath(
        new URL('./node_modules/next/navigation.js', import.meta.url),
      ),
    },
  },
});
