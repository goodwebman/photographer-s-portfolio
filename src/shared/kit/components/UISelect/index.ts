import { UISelectRoot } from './UISelectRoot';
import { UISelectOption } from './UISelectOption';

export const UISelect = Object.assign(UISelectRoot, {
  Option: UISelectOption,
});

export type { IUISelectProps } from './UISelectRoot';
export type { IUISelectOptionProps } from './UISelectOption';
