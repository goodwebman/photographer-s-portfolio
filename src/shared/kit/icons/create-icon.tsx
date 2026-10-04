import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes, type SVGProps } from 'react';
import { cn } from '../lib/cn';

export interface IUIIconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /**
   * Размер в px (ширина = высота). По умолчанию 24.
   * Tailwind-класс размера (`size-4`, `h-5 w-5`) имеет приоритет — CSS перебивает
   * атрибуты width/height.
   */
  readonly size?: number | string;
  /**
   * Доступное имя иконки. Если задано (или задан `aria-label`) — иконка становится
   * `role="img"` и объявляется скринридером. Без него иконка декоративная
   * (`aria-hidden`).
   */
  readonly title?: string;
}

/** Тип сгенерированного icon-компонента. */
export type UIIconComponent = ForwardRefExoticComponent<
  IUIIconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Фабрика типизированных иконок. Держит единый контракт для всех иконок кита:
 * `currentColor`, `stroke`-стиль (lucide-подобный), размер через `size`/Tailwind,
 * корректная a11y. Используется кодогенератором ({@link file://scripts/generate-icons.mjs}).
 *
 * @param iconName kebab-имя (попадает в `data-icon`)
 * @param viewBox  строка viewBox исходного svg
 * @param paths    внутренняя разметка иконки (уже как JSX)
 */
export function createIcon(iconName: string, viewBox: string, paths: ReactNode): UIIconComponent {
  const Icon = forwardRef<SVGSVGElement, IUIIconProps>(function UIIcon(
    { size = 24, title, className, ...rest }, ref,
  ) {
    const labelled = title != null || rest['aria-label'] != null || rest['aria-labelledby'] != null;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={labelled ? 'img' : undefined}
        aria-hidden={labelled || rest.role != null ? undefined : true}
        {...rest}
        data-icon={iconName}
        className={cn('inline-block shrink-0', className)}
      >
        {title != null ? <title>{title}</title> : null}
        {paths}
      </svg>
    );
  });

  Icon.displayName = `UIIcon(${iconName})`;
  return Icon;
}
