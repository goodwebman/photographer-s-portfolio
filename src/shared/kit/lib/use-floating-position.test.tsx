/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - useFloatingPosition
 *   - при open=false возвращает скрытый стиль (opacity 0, pointer-events none)
 *   - при open=true cчитает fixed-позицию от anchor и выставляет opacity 1
 *   - scroll/resize форсят пересчёт
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { useFloatingPosition } from './use-floating-position';
import type { RefObject } from 'react';

// jsdom не считает layout — подменяем габариты.
// DOMRectInit не включает top/right/bottom (они вычисляемые в DOMRect), поэтому
// принимаем развёрнутый объект и кастуем уже на возврате из getBoundingClientRect.
interface FakeRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
  toJSON(): void;
}

function mockRect(el: HTMLElement, rect: FakeRect) {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(rect as unknown as DOMRect);
  Object.defineProperty(el, 'offsetWidth', { value: rect.width, configurable: true });
  Object.defineProperty(el, 'offsetHeight', { value: rect.height, configurable: true });
}

function Probe({
  anchorRef,
  floatingRef,
  open,
  ...opts
}: {
  anchorRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLElement | null>;
  open: boolean;
  placement?: 'top' | 'bottom-start';
  gutter?: number;
  matchWidth?: boolean;
}) {
  const style = useFloatingPosition({ anchorRef, floatingRef, open, ...opts });
  return <div data-testid="style" data-style={JSON.stringify(style)} />;
}

describe('useFloatingPosition', () => {
  beforeEach(() => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('при open=false стиль скрыт', () => {
    const anchorRef = { current: document.createElement('div') };
    const floatingRef = { current: document.createElement('div') };
    const { getByTestId } = render(<Probe anchorRef={anchorRef} floatingRef={floatingRef} open={false} />);
    const style = JSON.parse(getByTestId('style').getAttribute('data-style')!);
    expect(style.opacity).toBe(0);
    expect(style.pointerEvents).toBe('none');
    expect(style.position).toBe('fixed');
  });

  it('при open=true считает позицию и выставляет opacity 1', () => {
    const anchor = document.createElement('button');
    const floating = document.createElement('div');
    mockRect(anchor, { top: 100, left: 50, width: 80, height: 40, right: 130, bottom: 140, x: 50, y: 100, toJSON() {} });
    mockRect(floating, { width: 200, height: 60, top: 0, left: 0, right: 200, bottom: 60, x: 0, y: 0, toJSON() {} });

    const { getByTestId } = render(
      <Probe anchorRef={{ current: anchor }} floatingRef={{ current: floating }} open placement="bottom-start" gutter={8} />,
    );
    const style = JSON.parse(getByTestId('style').getAttribute('data-style')!);
    expect(style.opacity).toBe(1);
    expect(style.top).toBe(148); // anchor.bottom(140) + gutter(8)
    expect(style.left).toBe(50); // bottom-start → left = anchor.left
  });

  it('matchWidth прокидывает --anchor-width', () => {
    const anchor = document.createElement('button');
    const floating = document.createElement('div');
    mockRect(anchor, { top: 0, left: 0, width: 120, height: 40, right: 120, bottom: 40, x: 0, y: 0, toJSON() {} });
    mockRect(floating, { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON() {} });

    const { getByTestId } = render(
      <Probe anchorRef={{ current: anchor }} floatingRef={{ current: floating }} open matchWidth />,
    );
    const style = JSON.parse(getByTestId('style').getAttribute('data-style')!);
    expect(style['--anchor-width']).toBe('120px');
  });
});
