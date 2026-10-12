import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cx } from '@/shared/lib/cn/cx';

/**
 * # Интерфейс пропсов для компонента UIFab
 * @interface IUIFabProps
 * @property {boolean} visible - показана ли кнопка (управляет появлением/уходом)
 * @property {string} label - доступное имя (`aria-label`)
 * @property {() => void} onClick - обработчик клика
 * @property {ReactNode} children - иконка
 * @property {cnParams | string} [className] - доп. классы обёртки
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIFabProps {
  readonly visible: boolean;
  readonly label: string;
  readonly onClick: () => void;
  readonly children: ReactNode;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Плавающая круглая кнопка в правом нижнем углу вьюпорта (floating action
 * button): полупрозрачный фон с блюром, появление/уход, hover- и tap-отклик.
 *
 * Анимации — CSS-transition, без JS-рантайма: кнопка всегда в DOM, скрытая —
 * прозрачная, уменьшенная и `inert` (не фокусируется, не кликается, не видна
 * скринридеру). Состояние видимости приходит снаружи — компонент отвечает
 * только за оформление. Классы склеиваются `cx` (без `tailwind-merge`):
 * компонент живёт в клиентском острове `BackToTop`.
 *
 * @component
 */
export const UIFab: FC<IUIFabProps> = ({
  visible,
  label,
  onClick,
  children,
  className,
  dataName,
}) => (
  <div
    data-name={dataName ? `UIFab-${dataName}` : 'UIFab'}
    inert={!visible}
    className={cx(
      'fixed bottom-5 right-5 z-40 transition-[opacity,translate,scale] duration-300 ease-out-expo sm:bottom-8 sm:right-8',
      visible ? 'opacity-100' : 'pointer-events-none translate-y-4 scale-60 opacity-0',
      className,
    )}
  >
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md outline-none transition-[color,border-color,scale] duration-200 ease-out-expo hover:border-brand-emphasis/50 hover:text-brand-emphasis focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:scale-110 motion-safe:active:scale-95 sm:size-12"
    >
      {children}
    </button>
  </div>
);
