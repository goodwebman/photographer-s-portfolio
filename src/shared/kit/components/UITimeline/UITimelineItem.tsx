import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export const timelineDotVariants = cva(
  'relative z-10 flex shrink-0 items-center justify-center rounded-full [&>svg]:size-4',
  {
    variants: {
      variant: {
        default: 'border-2 border-muted-foreground/40 bg-card text-muted-foreground',
        primary: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      withIcon: {
        true: 'size-8',
        false: 'size-4',
      },
    },
    defaultVariants: { variant: 'default', withIcon: false },
  },
);

export interface IUITimelineItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'title'>,
    Pick<VariantProps<typeof timelineDotVariants>, 'variant'> {
  readonly testId?: string;
  /** Заголовок события. */
  readonly title?: ReactNode;
  /** Метка времени (справа от заголовка). */
  readonly time?: ReactNode;
  /** Иконка внутри маркера (вместо точки). */
  readonly icon?: ReactNode;
}

/**
 * Событие ленты: маркер (точка или иконка) + заголовок, время и описание (`children`).
 */
const UITimelineItemBase = forwardRef<HTMLLIElement, IUITimelineItemProps>(
  ({ className, testId, title, time, variant, icon, children, ...props }, ref) => (
    <li
      ref={ref}
      data-name={testId ? `UITimelineItem-${testId}` : 'UITimelineItem'}
      className={cn('flex gap-4 pb-8 last:pb-0', className)}
      {...props}
    >
      {/* Колонка маркера: точка/иконка сверху, соединитель тянется вниз до следующего события */}
      <div className="flex shrink-0 flex-col items-center">
        <span className={cn(timelineDotVariants({ variant, withIcon: icon != null }), 'mt-0.5')}>
          {icon}
        </span>
        <span data-connector aria-hidden className="mt-1 w-px flex-1 bg-border" />
      </div>

      <div className="min-w-0 flex-1 pb-1">
        {(title != null || time != null) && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            {title != null && <p className="font-medium text-foreground">{title}</p>}
            {time != null && <span className="text-xs tabular-nums text-muted-foreground">{time}</span>}
          </div>
        )}
        {children != null && <div className="mt-1 text-sm text-muted-foreground">{children}</div>}
      </div>
    </li>
  ),
);
UITimelineItemBase.displayName = 'UITimeline.Item';
export const UITimelineItem = memo(UITimelineItemBase);
