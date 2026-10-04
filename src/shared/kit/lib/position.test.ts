/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - computePosition
 *   - default placement = bottom-start
 *   - custom placement (top, right-start)
 *   - gutter
 *   - flip при нехватке пространства
 *   - shift в viewport когда flip тоже не влезает
 */
import { afterEach, describe, expect, it } from 'vitest';
import { computePosition } from './position';

const anchor = {
  top: 200,
  left: 200,
  width: 100,
  height: 50,
  right: 300,
  bottom: 250,
};
const floating = { width: 120, height: 40 };

afterEach(() => {
  // сброс viewport
  global.innerWidth = 1024;
  global.innerHeight = 768;
});

describe('computePosition', () => {
  it('default placement is bottom-start', () => {
    const r = computePosition(anchor, floating);
    expect(r.placement).toBe('bottom-start');
    expect(r.top).toBe(anchor.bottom + 8); // gutter 8
    expect(r.left).toBe(anchor.left);
  });

  it('places top above anchor', () => {
    const r = computePosition(anchor, floating, 'top');
    expect(r.top).toBe(anchor.top - floating.height - 8);
    expect(r.left).toBe(anchor.left + anchor.width / 2 - floating.width / 2);
  });

  it('places right-start', () => {
    const r = computePosition(anchor, floating, 'right-start');
    expect(r.left).toBe(anchor.right + 8);
    expect(r.top).toBe(anchor.top);
  });

  it('respects custom gutter', () => {
    const r = computePosition(anchor, floating, 'bottom', { gutter: 16 });
    expect(r.top).toBe(anchor.bottom + 16);
  });

  it('flips top to bottom when anchor too close to top', () => {
    // anchor у верхнего края — top не влезет (floating высота 40 + gutter 4 > space)
    const topAnchor = { ...anchor, top: 0, bottom: 50, left: 0, right: 100 };
    const r = computePosition(topAnchor, floating, 'top', { gutter: 4 });
    // должен сфлипнуть в bottom
    expect(r.placement).toBe('bottom');
    expect(r.top).toBe(topAnchor.bottom + 4);
  });

  it('shifts into viewport when flip is not enough', () => {
    global.innerWidth = 400;
    global.innerHeight = 400;
    const floating = { width: 80, height: 40 };
    // anchor в правом нижнем углу: bottom-start вылезет за правый край
    const farAnchor = {
      top: 380,
      left: 380,
      width: 30,
      height: 30,
      right: 410,
      bottom: 410,
    };
    const r = computePosition(farAnchor, floating, 'bottom-start', {
      gutter: 4,
      viewportPadding: 4,
    });
    // shift должен втиснуть в viewport
    expect(r.left).toBeGreaterThanOrEqual(0);
    expect(r.top).toBeGreaterThanOrEqual(0);
    expect(r.left + floating.width).toBeLessThanOrEqual(global.innerWidth);
    expect(r.top + floating.height).toBeLessThanOrEqual(global.innerHeight);
  });
});
