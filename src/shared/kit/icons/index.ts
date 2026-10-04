export { createIcon } from './create-icon';
export type { IUIIconProps, UIIconComponent } from './create-icon';

// Именованные компоненты (`import { ChevronDown } from 'my-ui-kit'`) — tree-shakeable.
export * from './generated';

// Реестр-неймспейс (`<UIIcons.ChevronDown />`).
export { UIIcons } from './registry';
export type { UIIconName } from './registry';
