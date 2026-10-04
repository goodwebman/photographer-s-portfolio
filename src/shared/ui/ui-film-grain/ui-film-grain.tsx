import type { CSSProperties, FC } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * Тайл шума: `feTurbulence` → обесцвечивание. 240px с `stitchTiles` —
 * бесшовный повтор без видимой сетки. Генерируется браузером один раз при
 * разборе data-URI: ни запросов, ни JS, ни анимации.
 */
const NOISE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">' +
  '<filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>' +
  '<feColorMatrix type="saturate" values="0"/></filter>' +
  '<rect width="100%" height="100%" filter="url(#g)"/></svg>';

/** Готовое значение `background-image` (экспорт — для тестов и сторис). */
export const FILM_GRAIN_IMAGE = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/**
 * # Интерфейс пропсов для компонента UIFilmGrain
 * @interface IUIFilmGrainProps
 * @property {number} [opacity] - плотность зерна, 0..1 (по умолчанию 0.05)
 * @property {boolean} [contained] - залить родителя (`absolute`) вместо вьюпорта (`fixed`)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIFilmGrainProps {
  readonly opacity?: number;
  readonly contained?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Плёночное зерно поверх сайта — замена анимированному WebGL-фону портфолио.
 * Статичный SVG-шум с низкой непрозрачностью (≈ 4–6%): даёт фактуру
 * «бумаги»/плёнки, не спорит с фотографиями и ничего не стоит по CPU.
 *
 * Чисто декоративный слой: `aria-hidden`, `pointer-events-none` — клики и
 * выделение текста проходят сквозь него. Server-safe (без хуков).
 *
 * @component
 * @example
 * ```tsx
 * <body>…<UIFilmGrain /></body>
 * ```
 */
export const UIFilmGrain: FC<IUIFilmGrainProps> = ({
  opacity = 0.05,
  contained = false,
  className,
  dataName,
}) => {
  const style: CSSProperties = { backgroundImage: FILM_GRAIN_IMAGE, opacity };

  return (
    <div
      aria-hidden="true"
      data-name={dataName ? `UIFilmGrain-${dataName}` : 'UIFilmGrain'}
      className={cn(
        'pointer-events-none inset-0 z-60 bg-repeat',
        contained ? 'absolute' : 'fixed',
        className,
      )}
      style={style}
    />
  );
};
