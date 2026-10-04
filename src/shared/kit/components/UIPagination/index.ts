import { UIPaginationRoot } from './UIPaginationRoot';
import { UIPaginationButton } from './UIPaginationButton';

export const UIPagination = Object.assign(UIPaginationRoot, {
  Button: UIPaginationButton,
});

export type { IUIPaginationProps } from './UIPaginationRoot';
