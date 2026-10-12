'use client';

import type { FC, PointerEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Image, { type StaticImageData } from 'next/image';

import { UIButton, UIDialog } from '@/shared/kit';
import { cn } from '@/shared/lib/cn';

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../icons';
import { UIFrameLoader } from '../ui-frame-loader';

/** Кадр лайтбокса. */
export interface IUILightboxItem {
  readonly id: string;
  readonly src: StaticImageData;
  readonly alt: string;
}

/** Подписи элементов управления — приходят снаружи, компонент не знает про тексты сайта. */
export interface IUILightboxLabels {
  /** Доступное имя диалога. */
  readonly dialog: string;
  readonly close: string;
  readonly prev: string;
  readonly next: string;
  /** Подпись лоадера, пока кадр грузится. */
  readonly loading: string;
}

/**
 * # Интерфейс пропсов для компонента UILightbox
 * @interface IUILightboxProps
 * @property {readonly IUILightboxItem[]} items - кадры в порядке листания
 * @property {number | null} index - открытый кадр; `null` — лайтбокс закрыт
 * @property {(index: number) => void} onIndexChange - перейти к кадру
 * @property {() => void} onClose - закрыть
 * @property {IUILightboxLabels} labels - подписи кнопок и диалога
 */
export interface IUILightboxProps {
  readonly items: readonly IUILightboxItem[];
  readonly index: number | null;
  readonly onIndexChange: (index: number) => void;
  readonly onClose: () => void;
  readonly labels: IUILightboxLabels;
}

/** Минимальный горизонтальный сдвиг пальца, px, чтобы жест считался свайпом. */
const SWIPE_THRESHOLD = 48;

/**
 * Индексы кадров, которые держим в DOM: текущий и соседи по кругу, по порядку
 * и без повторов (при 1–2 кадрах соседи совпадают).
 */
const frameWindow = (index: number, count: number): number[] =>
  [...new Set([index - 1, index, index + 1].map((i) => (i + count) % count))].sort(
    (a, b) => a - b,
  );

/** Высота «рамы» лайтбокса над и под кадром (счётчик, подпись, кнопки). */
const CHROME_HEIGHT = '9rem';

/**
 * Честный `sizes` для кадра целиком (`object-contain`): ширина ограничена
 * либо высотой экрана (кадр уже экрана по пропорциям), либо его шириной.
 * Вместо `100vw`: на десктопе портретный кадр шириной ~600px качался в
 * 1920–3840px. Ошибка допустима только в большую сторону — так и выходит:
 * поля по высоте больше полей по ширине.
 */
const frameSizes = ({ width, height }: StaticImageData): string =>
  `(min-aspect-ratio: ${String(width)}/${String(height)}) calc((100vh - ${CHROME_HEIGHT}) * ${(width / height).toFixed(3)}), calc(100vw - 1rem)`;

/**
 * Полноэкранный просмотр кадра. Оболочка — `UIDialog` кита: focus trap,
 * Esc, блокировка скролла и портал уже там, а после закрытия фокус
 * возвращается на миниатюру, с которой открыли.
 *
 * Листание: кнопки ←/→, стрелки клавиатуры, свайп на таче; по кругу.
 * Кадр показывается целиком (`object-contain`) на почти чёрном фоне.
 * Панель локально тёмная (`data-theme="dark"`) в обеих темах сайта.
 *
 * Соседние кадры уже лежат в DOM (невидимыми, `loading="eager"`), поэтому
 * листание обычно мгновенное, а смена кадра — кроссфейд. Если кадр ещё не
 * пришёл, он «проявляется»: под ним размытый негатив из `blurDataURL`,
 * поверх — `UIFrameLoader`; загрузился — резкий кадр проступает поверх.
 *
 * @component
 */
export const UILightbox: FC<IUILightboxProps> = ({
  items,
  index,
  onIndexChange,
  onClose,
  labels,
}) => {
  const count = items.length;
  const current = index === null ? undefined : items[index];
  const open = current !== undefined;
  const swipeStart = useRef<number | null>(null);
  const [loadedIds, setLoadedIds] = useState<ReadonlySet<string>>(() => new Set());

  const markLoaded = useCallback((id: string) => {
    setLoadedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [go, open]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') swipeStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  const onOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  return (
    <UIDialog open={open} onOpenChange={onOpenChange}>
      {current ? (
        <UIDialog.Content
          aria-label={labels.dialog}
          data-theme="dark"
          className="flex h-dvh max-w-none flex-col rounded-none border-0 bg-[#0b0a09] p-0 text-foreground shadow-none"
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p aria-live="polite" className="text-eyebrow text-muted-foreground lining-nums">
              {`${String((index ?? 0) + 1)} / ${String(count)}`}
            </p>
            <UIButton
              variant="ghost"
              size="icon"
              aria-label={labels.close}
              onClick={onClose}
              testId="lightbox-close"
            >
              <CloseIcon className="size-5" />
            </UIButton>
          </div>

          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            <div className="relative mx-auto h-full w-full max-w-6xl">
              <div className="absolute inset-y-0 inset-x-2 sm:inset-x-20">
                {frameWindow(index ?? 0, count).map((frameIndex) => {
                  const item = items[frameIndex];
                  const isCurrent = frameIndex === index;
                  const isLoaded = loadedIds.has(item.id);

                  return (
                    <div
                      key={item.id}
                      aria-hidden={isCurrent ? undefined : true}
                      className={cn(
                        'absolute inset-0 transition-opacity duration-500 ease-out',
                        isCurrent ? 'opacity-100' : 'opacity-0',
                      )}
                    >
                      {/* негатив: крошечное превью, растянутое и размытое */}
                      <div
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-0 bg-contain bg-center bg-no-repeat blur-2xl transition-opacity duration-700',
                          isLoaded && 'opacity-0 delay-300',
                        )}
                        style={{ backgroundImage: `url(${item.src.blurDataURL ?? ''})` }}
                      />
                      <Image
                        src={item.src}
                        alt={isCurrent ? item.alt : ''}
                        fill
                        sizes={frameSizes(item.src)}
                        loading="eager"
                        onLoad={() => {
                          markLoaded(item.id);
                        }}
                        className={cn(
                          'object-contain transition-[opacity,filter] duration-700 ease-out-expo',
                          isLoaded ? 'opacity-100 blur-none' : 'opacity-0 blur-md',
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              {loadedIds.has(current.id) ? null : (
                <UIFrameLoader
                  label={labels.loading}
                  dataName="lightbox"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>

            <UIButton
              variant="ghost"
              size="icon"
              aria-label={labels.prev}
              onClick={() => {
                go(-1);
              }}
              testId="lightbox-prev"
              className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 rounded-full sm:inline-flex sm:left-4"
            >
              <ChevronLeftIcon className="size-6" />
            </UIButton>
            <UIButton
              variant="ghost"
              size="icon"
              aria-label={labels.next}
              onClick={() => {
                go(1);
              }}
              testId="lightbox-next"
              className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 rounded-full sm:inline-flex sm:right-4"
            >
              <ChevronRightIcon className="size-6" />
            </UIButton>
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <p className="max-w-3xl text-small text-muted-foreground">{current.alt}</p>
            <div className="flex shrink-0 gap-1 sm:hidden">
              <UIButton
                variant="ghost"
                size="icon"
                aria-label={labels.prev}
                onClick={() => {
                  go(-1);
                }}
              >
                <ChevronLeftIcon className="size-5" />
              </UIButton>
              <UIButton
                variant="ghost"
                size="icon"
                aria-label={labels.next}
                onClick={() => {
                  go(1);
                }}
              >
                <ChevronRightIcon className="size-5" />
              </UIButton>
            </div>
          </div>
        </UIDialog.Content>
      ) : null}
    </UIDialog>
  );
};
