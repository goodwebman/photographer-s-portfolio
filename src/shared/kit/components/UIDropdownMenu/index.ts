import { UIDropdownMenuRoot } from './UIDropdownMenuRoot';
import { UIDropdownMenuItem } from './UIDropdownMenuItem';

export const UIDropdownMenu = Object.assign(UIDropdownMenuRoot, {
  Item: UIDropdownMenuItem,
});

export type { IUIDropdownMenuProps } from './UIDropdownMenuRoot';
export type { IUIDropdownMenuItemProps } from './UIDropdownMenuItem';
