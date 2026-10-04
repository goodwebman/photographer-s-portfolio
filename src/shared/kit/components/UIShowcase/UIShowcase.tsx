'use client';

import {
  Children,
  forwardRef,
  memo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export interface IUIShowcaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  readonly testId?: string;
  /** Карточки веера — каждый прямой child становится «косой» картой. */
  readonly children: ReactNode;
  /** Угол наклона крайних карт, в градусах. Default: `8`. */
  readonly maxRotation?: number;
  /** Горизонтальное перекрытие соседних карт, в px. Default: `56`. */
  readonly overlap?: number;
  /** Насколько ниже опущены крайние карты (дуга веера), в px. Default: `10`. */
  readonly arc?: number;
  /** Подъём активной карты при наведении, в px. Default: `16`. */
  readonly lift?: number;
  /** Масштаб активной карты. Default: `1.05`. */
  readonly hoverScale?: number;
  /** На сколько px расступаются соседи активной карты. Default: `18`. */
  readonly spread?: number;
}

const sign = (v: number): number => (v > 0 ? 1 : v < 0 ? -1 : 0);

/**
 * Витрина «косых карточек»: раскладывает детей веером с наклоном и перекрытием.
 * При наведении (и `focus-within`) карта выпрямляется, поднимается и выходит вперёд,
 * а соседи расступаются. Ховер отслеживается состоянием — иначе inline-`transform` базовой
 * раскладки перебил бы hover-классы; плавность даёт CSS-transition. Тень — `drop-shadow`,
 * поэтому повторяет скруглённую форму карты, не завися от её радиуса.
 *
 * @example
 * <UIShowcase className="py-10">
 *   <PlaceCard {...a} />
 *   <PlaceCard {...b} />
 *   <PlaceCard {...c} />
 * </UIShowcase>
 */
const UIShowcaseBase = forwardRef<HTMLDivElement, IUIShowcaseProps>(
  (
    {
      testId,
      children,
      maxRotation = 8,
      overlap = 56,
      arc = 10,
      lift = 16,
      hoverScale = 1.05,
      spread = 18,
      className,
      ...props
    },
    ref,
  ) => {
    const [active, setActive] = useState<number | null>(null);
    const cards = Children.toArray(children);
    const n = cards.length;
    const center = (n - 1) / 2;
    const denom = center || 1;

    return (
      <div
        ref={ref}
        data-name={testId ? `UIShowcase-${testId}` : 'UIShowcase'}
        className={cn('relative flex items-center justify-center', className)}
        {...props}
      >
        {cards.map((card, i) => {
          const offset = i - center;
          const norm = offset / denom; // -1..1
          const baseRotate = norm * maxRotation;
          const baseY = Math.abs(norm) * arc;
          const baseZ = Math.round((center - Math.abs(offset)) * 10);

          const isActive = active === i;
          const anyActive = active !== null;

          let transform: string;
          if (isActive) {
            transform = `translateY(${String(-lift)}px) rotate(0deg) scale(${String(hoverScale)})`;
          } else if (anyActive) {
            const push = sign(i - active) * spread;
            transform = `translateX(${String(push)}px) translateY(${String(baseY)}px) rotate(${String(
              baseRotate,
            )}deg)`;
          } else {
            transform = `translateY(${String(baseY)}px) rotate(${String(baseRotate)}deg)`;
          }

          const style: CSSProperties = {
            transform,
            zIndex: isActive ? 100 : baseZ,
            marginLeft: i === 0 ? 0 : -overlap,
            filter: isActive
              ? 'drop-shadow(0 22px 40px rgba(0,0,0,0.30))'
              : 'drop-shadow(0 8px 16px rgba(0,0,0,0.16))',
            opacity: anyActive && !isActive ? 0.88 : 1,
          };

          return (
            <div
              key={i}
              style={style}
              onPointerEnter={() => { setActive(i); }}
              onPointerLeave={() => { setActive((prev) => (prev === i ? null : prev)); }}
              onFocusCapture={() => { setActive(i); }}
              onBlurCapture={() => { setActive((prev) => (prev === i ? null : prev)); }}
              className="relative transition-[transform,opacity,filter] duration-500 ease-out will-change-transform"
            >
              {card}
            </div>
          );
        })}
      </div>
    );
  },
);
UIShowcaseBase.displayName = 'UIShowcase';
export const UIShowcase = memo(UIShowcaseBase);
