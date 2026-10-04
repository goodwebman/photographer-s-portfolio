'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { UIIconButton } from '@/shared/ui/ui-icon-button';

/**
 * # Интерфейс пропсов для компонента UIGallery
 * @interface IUIGalleryProps
 * @property {readonly string[]} images - пути изображений
 * @property {(index: number) => string} altFor - альт-текст по индексу (0-based)
 * @property {(index: number) => string} openLabelFor - подпись кнопки-миниатюры
 * @property {string} dialogLabel - доступное имя лайтбокса
 * @property {string} closeLabel - подпись кнопки закрытия
 * @property {string} prevLabel - подпись кнопки «назад»
 * @property {string} nextLabel - подпись кнопки «вперёд»
 * @property {cnParams | string} [className] - доп. классы сетки
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIGalleryProps {
  readonly images: readonly string[];
  readonly altFor: (index: number) => string;
  readonly openLabelFor: (index: number) => string;
  readonly dialogLabel: string;
  readonly closeLabel: string;
  readonly prevLabel: string;
  readonly nextLabel: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Галерея скриншотов: сетка миниатюр + полноэкранный лайтбокс.
 *
 * Клавиатура — Esc / ←→, скролл страницы блокируется на время показа, фокус
 * уходит на кнопку закрытия и возвращается на миниатюру при выходе.
 * Все подписи приходят снаружи — компонент не знает про i18n.
 *
 * @component
 */
export const UIGallery: FC<IUIGalleryProps> = ({
  images,
  altFor,
  openLabelFor,
  dialogLabel,
  closeLabel,
  prevLabel,
  nextLabel,
  className,
  dataName,
}) => {
  const shouldReduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const gridClassNames = useCn('grid grid-cols-2 gap-4 sm:grid-cols-3', className);

  const close = useCallback(() => {
    setActive(null);
  }, []);
  const prev = useCallback(() => {
    setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setActive((a) => (a === null ? a : (a + 1) % images.length));
  }, [images.length]);

  const open = useCallback((index: number) => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setActive(index);
  }, []);

  useEffect(() => {
    if (active === null) return;

    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') prev();
      else if (event.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
    // `active` в deps намеренно: эффект переподписывается при каждой смене
    // кадра, зато фокус и блокировка скролла всегда соответствуют состоянию.
  }, [active, close, prev, next]);

  return (
    <div data-name={dataName ? `UIGallery-${dataName}` : 'UIGallery'}>
      <div className={gridClassNames}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              open(index);
            }}
            className="group relative aspect-screenshot overflow-hidden rounded-card bg-muted shadow-[0_0_0_1px_var(--color-border)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={openLabelFor(index)}
          >
            <Image
              src={src}
              alt={altFor(index)}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel}
          >
            <UIIconButton
              ref={closeRef}
              label={closeLabel}
              size="L"
              className="absolute right-4 top-4"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
            >
              <LuX className="size-5" />
            </UIIconButton>

            <UIIconButton
              label={prevLabel}
              size="L"
              className="absolute left-4"
              onClick={(event) => {
                event.stopPropagation();
                prev();
              }}
            >
              <LuChevronLeft className="size-5" />
            </UIIconButton>

            <motion.div
              className="relative aspect-screenshot max-h-[85dvh] w-full max-w-6xl overflow-hidden rounded-card bg-muted shadow-[0_0_0_1px_var(--color-border)]"
              initial={shouldReduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Image
                src={images[active]}
                alt={altFor(active)}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <UIIconButton
              label={nextLabel}
              size="L"
              className="absolute right-4 bottom-4 sm:bottom-auto sm:right-4"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
            >
              <LuChevronRight className="size-5" />
            </UIIconButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
