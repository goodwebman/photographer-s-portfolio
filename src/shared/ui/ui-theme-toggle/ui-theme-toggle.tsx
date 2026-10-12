'use client';

import type { FC } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cx } from '@/shared/lib/cn/cx';
import { useTheme } from '@/shared/theme/use-theme';
import { MoonIcon, SunIcon } from '@/shared/ui/icons/stroke-icons';

/**
 * # Интерфейс пропсов для компонента UIThemeToggle
 * @interface IUIThemeToggleProps
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 * @property {string} [labelToDark] - aria-label действия «включить тёмную»
 * @property {string} [labelToLight] - aria-label действия «включить светлую»
 */
export interface IUIThemeToggleProps {
  readonly className?: cnParams | string;
  readonly dataName?: string;
  readonly labelToDark?: string;
  readonly labelToLight?: string;
}

const BASE =
  'relative inline-flex size-10 items-center justify-center overflow-hidden rounded-pill text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const ICON = 'absolute size-[1.125rem] transition-[opacity,rotate,scale] duration-200 ease-out-expo';

/**
 * Переключатель темы: тихая иконочная кнопка без подложки, crossfade + rotate
 * между sun/moon. Иконка показывает ТЕКУЩУЮ тему, `aria-label` — действие.
 *
 * Обе иконки в разметке, видимую выбирает CSS по `data-theme` на `<html>`
 * (вариант `dark:`): верная иконка видна ещё до гидратации, анимация — CSS-
 * transition (гаснет при `prefers-reduced-motion` глобальными стилями).
 * JS нужен только для клика и `aria-label`.
 *
 * @component
 */
export const UIThemeToggle: FC<IUIThemeToggleProps> = ({
  className,
  dataName,
  labelToDark = 'Включить тёмную тему',
  labelToLight = 'Включить светлую тему',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      data-name={dataName ? `UIThemeToggle-${dataName}` : 'UIThemeToggle'}
      className={cx(BASE, className)}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? labelToLight : labelToDark}
    >
      <MoonIcon
        className={cx(ICON, 'rotate-90 scale-50 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100')}
      />
      <SunIcon
        className={cx(ICON, 'rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-50 dark:opacity-0')}
      />
    </button>
  );
};
