'use client';

import type { FC } from 'react';
import { memo } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LuMoon, LuSun } from 'react-icons/lu';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { useTheme } from '@/shared/theme';
import { Show } from '@/shared/ui/show';

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

/**
 * Переключатель темы: анимированный crossfade + rotate между sun/moon.
 * При `prefers-reduced-motion` иконка меняется без анимации.
 *
 * @component
 */
export const UIThemeToggle: FC<IUIThemeToggleProps> = memo(
  ({
    className,
    dataName,
    labelToDark = 'Включить тёмную тему',
    labelToLight = 'Включить светлую тему',
  }) => {
    const { theme, toggleTheme } = useTheme();
    const shouldReduce = useReducedMotion();
    const isDark = theme === 'dark';

    const classNames = useCn(
      'relative inline-flex size-10 items-center justify-center overflow-hidden rounded-pill border border-border bg-card text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      className,
    );

    return (
      <button
        type="button"
        data-name={dataName ? `UIThemeToggle-${dataName}` : 'UIThemeToggle'}
        className={classNames}
        onClick={toggleTheme}
        aria-label={isDark ? labelToLight : labelToDark}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className="inline-flex"
            initial={shouldReduce ? false : { opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduce ? undefined : { opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Show
              when={isDark}
              fallback={<LuSun className="size-5" aria-hidden="true" />}
            >
              <LuMoon className="size-5" aria-hidden="true" />
            </Show>
          </motion.span>
        </AnimatePresence>
      </button>
    );
  },
);
UIThemeToggle.displayName = 'UIThemeToggle';
