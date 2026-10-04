import { forwardRef, memo, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface IUIMarqueeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  readonly testId?: string;
  readonly children: ReactNode;
  /** Длительность одного полного прохода, сек. Меньше — быстрее. Default: `30`. */
  readonly durationSec?: number;
  /** Направление движения. Default: `'left'`. */
  readonly direction?: 'left' | 'right';
  /** Зазор между элементами, px. Default: `24`. */
  readonly gap?: number;
  /** Пауза при наведении. Default: `true`. */
  readonly pauseOnHover?: boolean;
  /** Растворение краёв (mask-image). Default: `true`. */
  readonly fade?: boolean;
}

/**
 * Бесконечная бегущая лента (логотипы, отзывы, теги).
 *
 * Рендерит две одинаковые дорожки и сдвигает контейнер на `-50%` (keyframe `ui-marquee`) —
 * получается бесшовный цикл. Длительность/направление задаются inline (`animation-duration`/
 * `-direction`), пауза при наведении — через `group`. Края растворяются `mask-image`, поэтому
 * не зависят от цвета фона. При `prefers-reduced-motion` глобальные стили гасят анимацию — лента
 * замирает статичной. Вторая дорожка `aria-hidden`, чтобы скринридер не читал контент дважды.
 *
 * Важно: контента должно хватать минимум на ширину контейнера, иначе в цикле будет виден зазор.
 *
 * @example
 * <UIMarquee durationSec={25}>{logos.map(l => <Logo key={l.id} {...l} />)}</UIMarquee>
 */
const UIMarqueeBase = forwardRef<HTMLDivElement, IUIMarqueeProps>(
  (
    {
      testId,
      children,
      durationSec = 30,
      direction = 'left',
      gap = 24,
      pauseOnHover = true,
      fade = true,
      className,
      ...props
    },
    ref,
  ) => {
    // gap внутри дорожки + такой же трейлинг-отступ → расстояние на стыке копий равно внутреннему
    const trackStyle: CSSProperties = { gap: `${String(gap)}px`, paddingInlineEnd: `${String(gap)}px` };
    const animStyle: CSSProperties = {
      animationDuration: `${String(durationSec)}s`,
      animationDirection: direction === 'right' ? 'reverse' : 'normal',
    };

    const track = (hidden: boolean): ReactNode => (
      <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center" style={trackStyle}>
        {children}
      </div>
    );

    return (
      <div
        ref={ref}
        data-name={testId ? `UIMarquee-${testId}` : 'UIMarquee'}
        className={cn(
          'group relative w-full overflow-hidden',
          fade &&
            '[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex w-max animate-[ui-marquee_linear_infinite]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
          style={animStyle}
        >
          {track(false)}
          {track(true)}
        </div>
      </div>
    );
  },
);
UIMarqueeBase.displayName = 'UIMarquee';
export const UIMarquee = memo(UIMarqueeBase);
