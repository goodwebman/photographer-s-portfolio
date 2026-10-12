import type { StaticImageData } from 'next/image';

/** Жанр кадра — основа фильтра в портфолио. */
export type PhotoCategory = 'city' | 'portrait' | 'love-story' | 'kids';

/** Работа Полины. */
export interface IPhoto {
  /** Стабильный id: `<серия>-<NN>`, совпадает с именем файла в `assets/`. */
  readonly id: string;
  /**
   * Static import: `next/image` сам берёт intrinsic width/height и
   * `blurDataURL` — сетка не прыгает при загрузке, есть blur-плейсхолдер.
   */
  readonly src: StaticImageData;
  /** Описание кадра для скринридеров и подписи в лайтбоксе. */
  readonly alt: string;
  readonly category: PhotoCategory;
  /**
   * `object-position` для мест, где кадр обрезается (широкая полоса,
   * карточка контактов): голова и главное в кадре остаются видны.
   */
  readonly focal?: string;
}

/** Жанр для фильтра: id + подпись. */
export interface IPhotoCategory {
  readonly id: PhotoCategory;
  readonly label: string;
}
