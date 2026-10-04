import { UIDialogRoot } from './UIDialogRoot';
import { UIDialogOverlay } from './UIDialogOverlay';
import { UIDialogContent } from './UIDialogContent';
import { UIDialogClose } from './UIDialogClose';
import { UIDialogTitle } from './UIDialogTitle';
import { UIDialogDescription } from './UIDialogDescription';

export const UIDialog = Object.assign(UIDialogRoot, {
  Overlay: UIDialogOverlay,
  Content: UIDialogContent,
  Close: UIDialogClose,
  Title: UIDialogTitle,
  Description: UIDialogDescription,
});

export type { IUIDialogProps } from './UIDialogRoot';
export type { IUIDialogOverlayProps } from './UIDialogOverlay';
export type { IUIDialogContentProps } from './UIDialogContent';
export type { IUIDialogCloseProps } from './UIDialogClose';
export type { IUIDialogTitleProps } from './UIDialogTitle';
export type { IUIDialogDescriptionProps } from './UIDialogDescription';
