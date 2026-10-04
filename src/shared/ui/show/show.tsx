import type { FC, ReactNode } from 'react';

/**
 * # Интерфейс пропсов для компонента Show
 * @interface IShowProps
 * @property {boolean} when - условие рендера `children`
 * @property {ReactNode} [fallback] - что показать, когда `when === false`
 * @property {ReactNode} children - содержимое при `when === true`
 */
export interface IShowProps {
  readonly when: boolean;
  readonly fallback?: ReactNode;
  readonly children: ReactNode;
}

/**
 * Условный рендер без тернарников в JSX: `children` при `when`, иначе `fallback`.
 *
 * @component
 * @example
 * ```tsx
 * <Show when={Boolean(icon)} fallback={<Placeholder />}>
 *   {icon}
 * </Show>
 * ```
 */
export const Show: FC<IShowProps> = ({ when, fallback = null, children }) =>
  when ? children : fallback;
