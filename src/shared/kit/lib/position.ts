/**
 * Типы размещения floating-элемента относительно anchor.
 * - basic: top / bottom / left / right
 * - +start / +end для выравнивания по перпендикуляру
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface AnchorRect {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
  readonly right: number;
  readonly bottom: number;
}

export interface FloatingSize {
  readonly width: number;
  readonly height: number;
}

export interface PositionOptions {
  /** Отступ от anchor, px */
  readonly gutter?: number;
  /** Отступ от краёв viewport при collision-сдвиге, px */
  readonly viewportPadding?: number;
  /** Максимум попыток flip (предотвращение бесконечного цикла) */
  readonly maxFlips?: number;
}

export interface PositionResult {
  readonly top: number;
  readonly left: number;
  readonly placement: Placement;
}

// ─── упорядоченный список fallback-placement'ов ────────────────────────────
// для flip при collision
const OPPOSITES: Record<Placement, Placement[]> = {
  top: ['bottom'],
  'top-start': ['bottom-start'],
  'top-end': ['bottom-end'],
  bottom: ['top'],
  'bottom-start': ['top-start'],
  'bottom-end': ['top-end'],
  left: ['right'],
  'left-start': ['right-start'],
  'left-end': ['right-end'],
  right: ['left'],
  'right-start': ['left-start'],
  'right-end': ['left-end'],
};

const MAIN_AXIS: Record<Placement, 'vertical' | 'horizontal'> = {
  top: 'vertical',
  'top-start': 'vertical',
  'top-end': 'vertical',
  bottom: 'vertical',
  'bottom-start': 'vertical',
  'bottom-end': 'vertical',
  left: 'horizontal',
  'left-start': 'horizontal',
  'left-end': 'horizontal',
  right: 'horizontal',
  'right-start': 'horizontal',
  'right-end': 'horizontal',
};

const DEFAULT_OPTIONS: Required<PositionOptions> = {
  gutter: 8,
  viewportPadding: 8,
  maxFlips: 3,
};

const VIEWPORT = { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };

function getViewport(): AnchorRect {
  if (typeof window === 'undefined') {
    return VIEWPORT;
  }
  return {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };
}

function calcPosition(
  anchor: AnchorRect,
  floating: FloatingSize,
  placement: Placement,
  gutter: number,
): PositionResult {
  const { width: fw, height: fh } = floating;
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
    case 'top-start':
    case 'top-end':
      top = anchor.top - fh - gutter;
      break;
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top = anchor.bottom + gutter;
      break;
    case 'left':
    case 'left-start':
    case 'left-end':
      left = anchor.left - fw - gutter;
      top = anchor.top;
      break;
    case 'right':
    case 'right-start':
    case 'right-end':
      left = anchor.right + gutter;
      top = anchor.top;
      break;
  }

  // выравнивание alignment
  const isVertical = MAIN_AXIS[placement] === 'vertical';
  if (isVertical) {
    switch (placement) {
      case 'top':
      case 'bottom':
        left = anchor.left + anchor.width / 2 - fw / 2;
        break;
      case 'top-start':
      case 'bottom-start':
        left = anchor.left;
        break;
      case 'top-end':
      case 'bottom-end':
        left = anchor.right - fw;
        break;
    }
  } else {
    switch (placement) {
      case 'left':
      case 'right':
        top = anchor.top + anchor.height / 2 - fh / 2;
        break;
      case 'left-start':
      case 'right-start':
        top = anchor.top;
        break;
      case 'left-end':
      case 'right-end':
        top = anchor.bottom - fh;
        break;
    }
  }

  return { top, left, placement };
}

function fitsInViewport(
  pos: PositionResult,
  floating: FloatingSize,
  vp: AnchorRect,
  padding: number,
): boolean {
  return (
    pos.left + floating.width <= vp.right - padding &&
    pos.left >= vp.left + padding &&
    pos.top + floating.height <= vp.bottom - padding &&
    pos.top >= vp.top + padding
  );
}

function shiftIntoViewport(
  pos: PositionResult,
  floating: FloatingSize,
  vp: AnchorRect,
  padding: number,
): PositionResult {
  const { width: fw, height: fh } = floating;
  let { top, left } = pos;

  left = Math.max(vp.left + padding, Math.min(left, vp.right - fw - padding));
  top = Math.max(vp.top + padding, Math.min(top, vp.bottom - fh - padding));

  return { ...pos, top, left };
}

/**
 * Вычисляет позицию floating-элемента относительно anchor c учётом viewport:
 * 1. Пробует указанный placement
 * 2. Если не влезает — flip (противоположный placement)
 * 3. Если flip не помог — shift (втискивание в viewport)
 *
 * Pure function — тестируется без DOM.
 */
export function computePosition(
  anchor: AnchorRect,
  floating: FloatingSize,
  placement: Placement = 'bottom-start',
  options: PositionOptions = {},
): PositionResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const vp = getViewport();
  let best: PositionResult | null = null;

  let currentPlacement: Placement = placement;

  for (let attempt = 0; attempt <= opts.maxFlips; attempt++) {
    const pos = calcPosition(anchor, floating, currentPlacement, opts.gutter);
    best = pos;

    if (fitsInViewport(pos, floating, vp, opts.viewportPadding)) {
      return pos;
    }

    // на следующую итерацию пробуем противоположное размещение
    currentPlacement = OPPOSITES[currentPlacement][0];
  }

  // если все flip не влезли — shift
  return shiftIntoViewport(best!, floating, vp, opts.viewportPadding);
}
