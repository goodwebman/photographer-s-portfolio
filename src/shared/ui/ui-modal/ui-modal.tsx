'use client';

import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';
import { UIIconButton } from '@/shared/ui/ui-icon-button';

/**
 * # Интерфейс пропсов для компонента UIModal
 * @interface IUIModalProps
 * @property {boolean} open - открыта ли модалка
 * @property {() => void} onClose - закрыть
 * @property {() => void} [onPrev] - листнуть назад (рисует левую стрелку)
 * @property {() => void} [onNext] - листнуть вперёд (рисует правую стрелку)
 * @property {string} label - доступное имя диалога (aria-label)
 * @property {string} [closeLabel] - подпись кнопки закрытия
 * @property {string} [prevLabel] - подпись стрелки «назад»
 * @property {string} [nextLabel] - подпись стрелки «вперёд»
 * @property {ReactNode} children - содержимое панели
 * @property {cnParams | string} [className] - доп. классы панели
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onPrev?: () => void;
  readonly onNext?: () => void;
  readonly label: string;
  readonly closeLabel?: string;
  readonly prevLabel?: string;
  readonly nextLabel?: string;
  readonly children: ReactNode;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Позиционирование стрелок — оформление берётся из `UIIconButton`.
 * До `sm` стрелки лежат в потоке под панелью (по бокам их некуда деть: панель
 * занимает всю ширину вьюпорта и перекрывала бы их), с `sm` — абсолютом по краям
 * оверлея поверх панели (`z-20` > `z-10` панели, иначе клик не доходит).
 */
const ARROW_CLASS = 'sm:absolute sm:top-1/2 sm:z-20 sm:-translate-y-1/2';

/**
 * Модалка-лайтбокс: затемняющий оверлей с blur, центральная панель и опциональные
 * боковые стрелки для листания. Клавиатура (Esc / ←→), блокировка скролла,
 * возврат фокуса. Анимации — spring в стиле проекта, с учётом reduced-motion.
 *
 * @component
 */
export const UIModal: FC<IUIModalProps> = ({
  open,
  onClose,
  onPrev,
  onNext,
  label,
  closeLabel = 'Close',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  children,
  className,
  dataName,
}) => {
  const shouldReduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const panelClassNames = useCn(
    'relative z-10 w-full max-w-lg overflow-y-auto rounded-card border border-border bg-card p-6 shadow-2xl ring-1 ring-inset ring-white/5 sm:p-8',
    className,
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowLeft') onPrev?.();
      else if (event.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {/* Прямой тернарник, а не <Show>: AnimatePresence отслеживает появление/
          удаление своих ПРЯМЫХ детей для exit-анимации. Обёртка-компонент между
          ними скрыла бы размонтирование и убила бы анимацию закрытия. */}
      {open ? (
        <motion.div
          data-name={dataName ? `UIModal-${dataName}` : 'UIModal'}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-background/80 p-4 backdrop-blur-md"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={panelClassNames}
            initial={shouldReduce ? false : { opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 10 }}
            transition={
              shouldReduce
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 300, damping: 26 }
            }
            onClick={(event) => event.stopPropagation()}
          >
            <UIIconButton
              ref={closeRef}
              label={closeLabel}
              variant="plain"
              size="S"
              className="absolute right-3 top-3"
              onClick={onClose}
            >
              <LuX className="size-5" />
            </UIIconButton>
            {children}
          </motion.div>

          {/* `sm:contents` убирает обёртку из раскладки — на десктопе стрелки
              позиционируются абсолютом от оверлея, как раньше. */}
          <Show when={Boolean(onPrev ?? onNext)}>
            <div className="flex shrink-0 gap-3 sm:contents">
              <Show when={Boolean(onPrev)}>
                <UIIconButton
                  label={prevLabel}
                  variant="glass"
                  size="L"
                  className={`${ARROW_CLASS} sm:left-3 md:left-6`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onPrev?.();
                  }}
                >
                  <LuChevronLeft className="size-5" />
                </UIIconButton>
              </Show>

              <Show when={Boolean(onNext)}>
                <UIIconButton
                  label={nextLabel}
                  variant="glass"
                  size="L"
                  className={`${ARROW_CLASS} sm:right-3 md:right-6`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onNext?.();
                  }}
                >
                  <LuChevronRight className="size-5" />
                </UIIconButton>
              </Show>
            </div>
          </Show>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
