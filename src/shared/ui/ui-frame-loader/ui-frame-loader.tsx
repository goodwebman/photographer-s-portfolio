import type { CSSProperties, FC } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/** Размер рамки: `sm` — поверх плитки сетки, `md` — в лайтбоксе. */
export type UIFrameLoaderSize = 'sm' | 'md';

/**
 * # Интерфейс пропсов для компонента UIFrameLoader
 * @interface IUIFrameLoaderProps
 * @property {string} [label] - подпись под рамкой; есть — лоадер становится `role="status"`,
 *   нет — чисто декоративный (`aria-hidden`), например внутри кнопки-плитки
 * @property {UIFrameLoaderSize} [size] - размер рамки
 * @property {number} [delay] - задержка появления, мс: быстрая загрузка лоадер не показывает
 * @property {cnParams | string} [className] - доп. классы (позиционирование — снаружи)
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIFrameLoaderProps {
  readonly label?: string;
  readonly size?: UIFrameLoaderSize;
  readonly delay?: number;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

const FRAME_SIZE: Record<UIFrameLoaderSize, string> = {
  sm: 'size-9',
  md: 'size-14',
};

const CORNER_SIZE: Record<UIFrameLoaderSize, string> = {
  sm: 'size-2.5',
  md: 'size-4',
};

const CORNERS = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'bottom-0 left-0 border-b border-l',
  'bottom-0 right-0 border-b border-r',
] as const;

/**
 * Лоадер кадра в языке сайта: уголки видоискателя «ищут резкость», как
 * автофокус камеры, точка в центре мерцает. Тот же мотив, что у плитки-CTA
 * портфолио. Терракота — дозированный акцент, без спиннеров и сплошных плит.
 *
 * Появляется с задержкой (`delay`): кадр из кэша грузится быстрее, и лоадер
 * не мелькает. При `prefers-reduced-motion` рамка стоит неподвижно.
 * Server-safe (без хуков).
 *
 * @component
 * @example
 * ```tsx
 * {loaded ? null : <UIFrameLoader label="Проявляем кадр" />}
 * ```
 */
export const UIFrameLoader: FC<IUIFrameLoaderProps> = ({
  label,
  size = 'md',
  delay = 250,
  className,
  dataName,
}) => {
  const style: CSSProperties = { animationDelay: `${String(delay)}ms` };

  return (
    <span
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
      data-name={dataName ? `UIFrameLoader-${dataName}` : 'UIFrameLoader'}
      className={cn(
        'pointer-events-none flex animate-loader-in flex-col items-center gap-4',
        className,
      )}
      style={style}
    >
      <span
        className={cn('relative block animate-focus-hunt text-brand-emphasis', FRAME_SIZE[size])}
      >
        {CORNERS.map((corner) => (
          <span
            key={corner}
            className={cn('absolute border-current', CORNER_SIZE[size], corner)}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-current" />
      </span>
      {label ? (
        <span className="text-eyebrow uppercase text-muted-foreground">{label}</span>
      ) : null}
    </span>
  );
};
