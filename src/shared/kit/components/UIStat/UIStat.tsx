import { forwardRef, memo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export interface IUIStatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly testId?: string;
  /** Подпись метрики (сверху). */
  readonly label: ReactNode;
  /** Значение метрики (крупно). */
  readonly value: ReactNode;
  /**
   * Изменение в процентах. Знак определяет направление и цвет:
   * `> 0` — рост (success), `< 0` — падение (destructive), `0` — нейтрально.
   */
  readonly delta?: number;
  /** Суффикс дельты. Default: `'%'`. */
  readonly deltaSuffix?: string;
  /**
   * Инвертирует цвет дельты: когда падение — это хорошо (напр. «отписки», «время загрузки»).
   * На направление стрелки не влияет, только на семантику цвета.
   */
  readonly invertDelta?: boolean;
  /** Пояснение под значением (мелким шрифтом). */
  readonly hint?: ReactNode;
  /** Иконка в правом верхнем углу (в скруглённой плашке). */
  readonly icon?: ReactNode;
}

const formatDelta = (delta: number, suffix: string): string =>
  `${delta > 0 ? '+' : ''}${String(delta)}${suffix}`;

/**
 * Плитка метрики для дашбордов: подпись, значение, изменение со стрелкой и цветом.
 *
 * @example
 * <UIStat label="Активных подписок" value="12 480" delta={12.5} hint="за 30 дней" />
 */
const UIStatBase = forwardRef<HTMLDivElement, IUIStatProps>(
  (
    { className, testId, label, value, delta, deltaSuffix = '%', invertDelta = false, hint, icon, ...props },
    ref,
  ) => {
    const hasDelta = delta != null;
    const up = hasDelta && delta > 0;
    const down = hasDelta && delta < 0;
    // при invertDelta «хорошим» считается падение — меняем цветовую семантику местами
    const positive = invertDelta ? down : up;
    const negative = invertDelta ? up : down;

    return (
      <div
        ref={ref}
        data-name={testId ? `UIStat-${testId}` : 'UIStat'}
        className={cn('rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm', className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {icon != null && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              {icon}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-3xl font-bold tabular-nums tracking-tight">{value}</span>
          {hasDelta && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold tabular-nums',
                // emphasis-варианты: базовый статус-цвет на своей /10-подложке не добирает AA
                positive && 'bg-success/10 text-success-emphasis',
                negative && 'bg-destructive/10 text-destructive-emphasis',
                !positive && !negative && 'bg-muted text-muted-foreground',
              )}
            >
              {up && <UIIcons.ChevronUp className="size-3" />}
              {down && <UIIcons.ChevronDown className="size-3" />}
              {formatDelta(delta, deltaSuffix)}
            </span>
          )}
        </div>

        {hint != null && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  },
);
UIStatBase.displayName = 'UIStat';
export const UIStat = memo(UIStatBase);
