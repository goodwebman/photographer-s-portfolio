import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface IUITimelineProps extends HTMLAttributes<HTMLOListElement> {
  readonly testId?: string;
}

/**
 * Вертикальная лента событий. Соединительная линия у последнего элемента гасится
 * автоматически (`[&>li:last-child_[data-connector]]:hidden`) — хвост не торчит.
 */
const UITimelineRoot = forwardRef<HTMLOListElement, IUITimelineProps>(
  ({ className, testId, ...props }, ref) => (
    <ol
      ref={ref}
      data-name={testId ? `UITimeline-${testId}` : 'UITimeline'}
      className={cn('flex flex-col [&>li:last-child_[data-connector]]:hidden', className)}
      {...props}
    />
  ),
);
UITimelineRoot.displayName = 'UITimeline';
const MemoUITimelineRoot = memo(UITimelineRoot);
export { MemoUITimelineRoot as UITimelineRoot };
