import type { FC } from 'react';

import Image, { type StaticImageData } from 'next/image';

import type { cnParams } from '@/shared/lib/cn';
import { cx } from '@/shared/lib/cn/cx';

import { ExpandIcon } from '../icons';
import { UIFrameLoader } from '../ui-frame-loader';

/**
 * Как кадр вписан в плитку:
 * - `intrinsic` — целиком, высота из пропорций файла (masonry)
 * - `portrait` — ячейка 2:3, `object-cover` (ровная сетка). Почти все работы
 *   сняты в 2:3, поэтому кроп затрагивает только редкие кадры другой пропорции.
 */
export type UIPhotoTileFit = 'intrinsic' | 'portrait';

/**
 * # Интерфейс пропсов для компонента UIPhotoTile
 * @interface IUIPhotoTileProps
 * @property {StaticImageData} src - кадр (static import → intrinsic size и blur)
 * @property {string} alt - описание кадра; оно же доступное имя кнопки
 * @property {string} sizes - честный `sizes` под раскладку сетки
 * @property {() => void} [onOpen] - открыть кадр в лайтбоксе (из клиентского кода)
 * @property {string} [itemId] - id кадра в `data-item-id`: по нему открывает
 *   лайтбокс галерея, когда плитка отрендерена на сервере (делегирование клика)
 * @property {UIPhotoTileFit} [fit] - кадр целиком или в ровной ячейке 2:3
 * @property {string} [focal] - `object-position` для `fit="portrait"`
 * @property {string} [caption] - подпись, проявляется на hover/focus (жанр)
 * @property {boolean} [priority] - кадр на первом экране: preload + высокий приоритет загрузки
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIPhotoTileProps {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly sizes: string;
  readonly onOpen?: () => void;
  readonly itemId?: string;
  readonly fit?: UIPhotoTileFit;
  readonly focal?: string;
  readonly caption?: string;
  readonly priority?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Кадр в сетке портфолио — кнопка, открывающая лайтбокс. Размер плитки
 * известен до загрузки (intrinsic size или фиксированная 2:3), поэтому сетка
 * не прыгает. В лайтбоксе кадр всегда целиком. Hover: лёгкий `scale(1.03)` внутри
 * `overflow-hidden` и проявление подписи. Без теней, рамок и фильтров.
 *
 * Server-safe: без хуков. Пока кадр грузится, поверх blur-превью —
 * декоративный `UIFrameLoader` (с задержкой: из кэша кадр приходит раньше).
 * Показывает его CSS (`globals.css`, PHOTO TILE): только внутри галереи с
 * `data-tiles-ready` (её клиентский код прошёл гидратацию) и пока на плитке
 * нет `data-loaded`. Без JS лоадер не виден — иначе остался бы висеть.
 *
 * @component
 */
export const UIPhotoTile: FC<IUIPhotoTileProps> = ({
  src,
  alt,
  sizes,
  onOpen,
  itemId,
  fit = 'intrinsic',
  focal,
  caption,
  priority = false,
  className,
  dataName,
}) => (
  <button
    type="button"
    aria-haspopup="dialog"
    onClick={onOpen}
    data-photo-tile=""
    data-item-id={itemId}
    data-name={dataName ? `UIPhotoTile-${dataName}` : 'UIPhotoTile'}
    className={cx(
      'group relative block w-full cursor-zoom-in overflow-hidden bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      fit === 'portrait' && 'aspect-2/3',
      className,
    )}
  >
    {fit === 'portrait' ? (
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? 'high' : undefined}
        placeholder="blur"
        fill
        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        style={{ objectPosition: focal }}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? 'high' : undefined}
        placeholder="blur"
        className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
      />
    )}
    <span data-tile-loader="" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <UIFrameLoader size="sm" />
    </span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/65 via-black/20 to-transparent px-4 pb-4 pt-16 text-eyebrow uppercase text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <span>{caption}</span>
      <ExpandIcon className="size-4 shrink-0" />
    </span>
  </button>
);
