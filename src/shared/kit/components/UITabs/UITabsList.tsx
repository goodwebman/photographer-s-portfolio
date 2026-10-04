import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUITabsListProps = HTMLAttributes<HTMLDivElement>;

const UITabsList = forwardRef<HTMLDivElement, IUITabsListProps>(
  ({ className, ...props }, ref) => (
    // клавиатурная навигация живёт на самих вкладках (UITabsTab): tablist по WAI-ARIA
    // не участвует в таб-порядке, вешать обработчик на нефокусируемый контейнер нельзя
    <div
      ref={ref}
      role="tablist"
      data-name="UITabsList"
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
);
UITabsList.displayName = 'UITabsList';
export { UITabsList };
