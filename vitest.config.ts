import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/** 1×1 PNG — валидный `blurDataURL` для `next/image` с `placeholder="blur"`. */
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/**
 * Static import картинки в Next отдаёт `StaticImageData` (src + размеры +
 * blur), а Vite — строку-URL. `next/image` со строкой без `width`/`height`
 * падает, поэтому в тестах подменяем импорт объектом той же формы.
 */
const staticImageStub = (): Plugin => ({
  name: 'static-image-stub',
  enforce: 'pre',
  load(id) {
    if (!/\.(webp|jpe?g|png|avif)$/i.test(id)) return null;
    const src = `/${id.split(/[\/]/).pop() ?? 'image'}`;

    return `export default ${JSON.stringify({ src, width: 800, height: 1200, blurDataURL: PIXEL })};`;
  },
});

export default defineConfig({
  plugins: [react(), staticImageStub()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
