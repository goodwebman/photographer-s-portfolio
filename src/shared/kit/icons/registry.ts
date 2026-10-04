/* eslint-disable */
// АВТОГЕНЕРАЦИЯ — не редактировать руками. Источник: src/icons/raw. Пересобрать: `npm run icons:build`.
import type { UIIconComponent } from './create-icon';
import { Check } from './generated/check';
import { ChevronDown } from './generated/chevron-down';
import { ChevronLeft } from './generated/chevron-left';
import { ChevronRight } from './generated/chevron-right';
import { ChevronUp } from './generated/chevron-up';
import { Minus } from './generated/minus';
import { Plus } from './generated/plus';
import { Search } from './generated/search';
import { Spinner } from './generated/spinner';
import { X } from './generated/x';

/**
 * Реестр иконок кита. Имена ключей совпадают с именами компонентов (PascalCase),
 * чтобы не было двух конвенций: `<UIIcons.ChevronDown />`.
 * Для tree-shaking бери именованный компонент напрямую: `import { ChevronDown } from 'my-ui-kit'`.
 */
export const UIIcons = {
  Check: Check,
  ChevronDown: ChevronDown,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  ChevronUp: ChevronUp,
  Minus: Minus,
  Plus: Plus,
  Search: Search,
  Spinner: Spinner,
  X: X,
} satisfies Record<string, UIIconComponent>;

export type UIIconName = keyof typeof UIIcons;
