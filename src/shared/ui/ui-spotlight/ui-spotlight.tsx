'use client';

import type { CSSProperties, FC, PointerEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cx } from '@/shared/lib/cn/cx';

/**
 * # Интерфейс пропсов для компонента UISpotlight
 * @interface IUISpotlightProps
 * @property {ReactNode} children - содержимое поверхности (может быть серверным)
 * @property {string} [color] - цвет пятна (любой CSS-цвет)
 * @property {number} [size] - диаметр пятна, px
 * @property {cnParams | string} [className] - классы поверхности
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUISpotlightProps {
  readonly children: ReactNode;
  readonly color?: string;
  readonly size?: number;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Поверхность с радиальной подсветкой, следующей за курсором (замена
 * `UISpotlightCard` кита для клиентского бандла сайта).
 *
 * Градиент — статичный класс на CSS-переменных; JS пишет только
 * `--spot-x`/`--spot-y` на корень в `requestAnimationFrame` — без состояния,
 * ре-рендеров и `tailwind-merge`. Появление пятна — CSS-transition по
 * `data-active`. Содержимое приходит children'ами и остаётся серверным.
 *
 * @component
 */
export const UISpotlight: FC<IUISpotlightProps> = ({
  children,
  color = 'rgba(255,255,255,0.12)',
  size = 320,
  className,
  dataName,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      root.style.setProperty('--spot-x', `${String(clientX - rect.left)}px`);
      root.style.setProperty('--spot-y', `${String(clientY - rect.top)}px`);
    });
  };

  const style = { '--spot-color': color, '--spot-size': `${String(size)}px` } as CSSProperties;

  return (
    <div
      ref={rootRef}
      data-name={dataName ? `UISpotlight-${dataName}` : 'UISpotlight'}
      onPointerMove={onPointerMove}
      onPointerEnter={(event) => {
        event.currentTarget.setAttribute('data-active', '');
      }}
      onPointerLeave={(event) => {
        event.currentTarget.removeAttribute('data-active');
      }}
      className={cx('group/spot relative overflow-hidden', className)}
      style={style}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(var(--spot-size)_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--spot-color),transparent_70%)] opacity-0 transition-opacity duration-300 group-data-active/spot:opacity-100"
      />
      {/* контент над пятном; z-10, чтобы подсветка была фоном, а не поверх текста */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
