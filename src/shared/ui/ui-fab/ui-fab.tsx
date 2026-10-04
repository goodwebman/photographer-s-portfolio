'use client';

import type { FC, ReactNode } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIFab
 * @interface IUIFabProps
 * @property {boolean} visible - показана ли кнопка (управляет появлением/уходом)
 * @property {string} label - доступное имя (`aria-label`)
 * @property {() => void} onClick - обработчик клика
 * @property {ReactNode} children - иконка
 * @property {cnParams | string} [className] - доп. классы
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

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Плавающая круглая кнопка в правом нижнем углу вьюпорта (floating action
 * button): стекло с блюром, появление/уход пружинкой, hover- и tap-отклик.
 *
 * Состояние видимости приходит снаружи — компонент отвечает только за
 * оформление и анимацию, а не за то, когда показываться.
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
}) => {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {/* Прямой тернарник, а не <Show>: AnimatePresence отслеживает появление/
          удаление своих ПРЯМЫХ детей. Обёртка-компонент между ними скрыла бы
          размонтирование и убила бы анимацию ухода. */}
      {visible ? (
        <motion.button
          key="ui-fab"
          type="button"
          aria-label={label}
          data-name={dataName ? `UIFab-${dataName}` : 'UIFab'}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduce ? undefined : { opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.28, ease: EASE }}
          whileHover={shouldReduce ? undefined : { scale: 1.1 }}
          whileTap={shouldReduce ? undefined : { scale: 0.95 }}
          onClick={onClick}
          className={cn(
            'fixed bottom-6 right-6 z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/4 backdrop-blur-xl outline-none transition-colors duration-200 hover:border-accent/40 hover:text-accent focus-visible:ring-2 focus-visible:ring-ring sm:bottom-8 sm:right-8 sm:size-12',
            className,
          )}
        >
          {children}
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};
