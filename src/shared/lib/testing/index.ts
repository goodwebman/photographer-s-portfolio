import type { StaticImageData } from 'next/image';

/** 1×1 прозрачный PNG — валидный `blurDataURL` для тестов. */
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/**
 * Заглушка static import'а картинки. Vitest отдаёт импорт `.webp` строкой, а
 * `next/image` с `placeholder="blur"` требует `width`/`height`/`blurDataURL` —
 * в тестах компонентов с фото подставляем этот объект.
 */
export const TEST_IMAGE: StaticImageData = {
  src: '/test-photo.webp',
  width: 800,
  height: 1200,
  blurDataURL: PIXEL,
};
