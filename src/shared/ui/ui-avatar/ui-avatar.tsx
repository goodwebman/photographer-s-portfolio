'use client';

import type { FC } from 'react';
import { memo, useState } from 'react';

import Image from 'next/image';

import type { cnParams } from '@/shared/lib/cn';
import { cn, useCn } from '@/shared/lib/cn';

/** Размер аватара. */
export type UIAvatarSize = 'S' | 'M' | 'L';

/** Способ вписывания изображения: cover — заполнить с обрезкой, contain — уместить целиком. */
export type UIAvatarFit = 'cover' | 'contain';

/**
 * # Интерфейс пропсов для компонента UIAvatar
 * @interface IUIAvatarProps
 * @property {string} src - путь к изображению (светлая тема)
 * @property {string} [srcDark] - путь к изображению для тёмной темы
 * @property {string} [hoverSrc] - альтернативное фото для crossfade при наведении
 * @property {string} alt - альт-текст
 * @property {UIAvatarSize} [size] - размер
 * @property {UIAvatarFit} [fit] - способ вписывания (cover / contain)
 * @property {boolean} [ring] - акцентная обводка вокруг фото
 * @property {boolean} [halo] - вращающееся градиентное кольцо вокруг фото
 * @property {boolean} [glow] - мягкое свечение акцентом
 * @property {boolean} [priority] - приоритетная загрузка (для hero)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIAvatarProps {
  readonly src: string;
  readonly srcDark?: string;
  readonly hoverSrc?: string;
  readonly alt: string;
  readonly size?: UIAvatarSize;
  readonly fit?: UIAvatarFit;
  readonly ring?: boolean;
  readonly halo?: boolean;
  readonly glow?: boolean;
  readonly priority?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

const SIZE_CLASS: Record<UIAvatarSize, string> = {
  S: 'size-10',
  M: 'size-16',
  L: 'size-28',
};

const SIZE_PX: Record<UIAvatarSize, string> = {
  S: '40px',
  M: '64px',
  // L используется крупно (до ~384px в hero) — sizes должен отражать реальный
  // размер, иначе next/image отдаст мелкий srcset и фото будет мыльным.
  L: '384px',
};

const FIT_CLASS: Record<UIAvatarFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
};

/**
 * Аватар: круглая маска с изображением (без фоновой заливки — поэтому фото с
 * альфа-каналом сливается с фоном страницы) и опциональными обводкой, градиентным
 * halo и свечением.
 *
 * @component
 */
export const UIAvatar: FC<IUIAvatarProps> = memo(
  ({
    src,
    srcDark,
    hoverSrc,
    alt,
    size = 'M',
    fit = 'cover',
    ring = false,
    halo = false,
    glow = false,
    priority = false,
    className,
    dataName,
  }) => {
    // Тач: hover-состояния нет, поэтому второе фото переключается тапом.
    // Мышь отсекаем по pointerType — на десктопе всё остаётся на :hover.
    const [tapped, setTapped] = useState(false);
    const classNames = useCn(
      'relative inline-block shrink-0 overflow-hidden rounded-full',
      hoverSrc && 'group',
      SIZE_CLASS[size],
      ring && 'ring-2 ring-accent ring-offset-2 ring-offset-background',
      glow && 'shadow-[0_0_50px_-10px_var(--accent)]',
      className,
    );

    return (
      <span
        data-name={dataName ? `UIAvatar-${dataName}` : 'UIAvatar'}
        className={classNames}
        onPointerUp={
          hoverSrc
            ? (e) => {
                if (e.pointerType === 'mouse') return;
                setTapped((v) => !v);
              }
            : undefined
        }
      >
        {/* Вращающееся градиентное кольцо-бордюр (центр вырезан маской,
            поэтому через прозрачные участки фото крутится только ободок) */}
        {halo && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-0.75 animate-avatar-spin rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, var(--accent), transparent 28%, var(--accent) 50%, transparent 78%, var(--accent))',
              // Оставляем видимым только внешний ободок ~3px
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
            }}
          />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          sizes={SIZE_PX[size]}
          priority={priority}
          className={cn(FIT_CLASS[fit], srcDark && 'dark:hidden')}
        />
        {srcDark && (
          <Image
            src={srcDark}
            alt={alt}
            fill
            sizes={SIZE_PX[size]}
            priority={priority}
            className={cn(FIT_CLASS[fit], 'hidden dark:block')}
          />
        )}
        {/* Crossfade на hover: плавное появление второго фото с задержкой
            только на «вход» (delay берётся из целевого состояния → при уходе
            мыши fade стартует сразу, без залипания). Декоративный дубль — alt пуст. */}
        {hoverSrc && (
          <Image
            src={hoverSrc}
            alt=""
            fill
            sizes={SIZE_PX[size]}
            className={cn(
              FIT_CLASS[fit],
              'opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100 group-hover:delay-150',
              tapped && 'opacity-100',
            )}
          />
        )}
      </span>
    );
  },
);
UIAvatar.displayName = 'UIAvatar';
