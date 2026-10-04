import { UIToastProvider } from './UIToastProvider';
import { UIToastItem } from './UIToastItem';

export const UIToast = Object.assign(UIToastProvider, {
  Item: UIToastItem,
});

export { useToast } from './toast-context';
export type { Toast, ToastVariant } from './toast-context';
export type { IToastProviderProps } from './UIToastProvider';
export type { IUIToastItemProps } from './UIToastItem';
