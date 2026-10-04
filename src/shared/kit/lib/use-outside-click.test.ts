/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - useOutsideClick
 *   - вызывает callback при pointerdown вне ref
 *   - НЕ вызывает при pointerdown внутри ref
 *   - игнорирует клики по ignoreRefs
 *   - не вызывает когда disabled
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import { useOutsideClick } from './use-outside-click';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe('useOutsideClick', () => {
  it('calls callback on pointerdown outside ref', () => {
    const cb = vi.fn();
    const el = document.createElement('div');
    const ref = { current: el };
    renderHook(() => useOutsideClick(ref, cb));

    fireEvent.pointerDown(document.body);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does NOT call on pointerdown inside ref', () => {
    const cb = vi.fn();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const ref = { current: el };
    renderHook(() => useOutsideClick(ref, cb));

    fireEvent.pointerDown(el);
    expect(cb).not.toHaveBeenCalled();
  });

  it('ignores clicks on ignoreRefs', () => {
    const cb = vi.fn();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const ignoreButton = document.createElement('button');
    document.body.appendChild(ignoreButton);
    const ref = { current: el };
    const ignoreRef = { current: ignoreButton };

    renderHook(() => useOutsideClick(ref, cb, { ignoreRefs: [ignoreRef] }));

    fireEvent.pointerDown(el);
    expect(cb).not.toHaveBeenCalled();

    fireEvent.pointerDown(ignoreButton);
    expect(cb).not.toHaveBeenCalled();

    fireEvent.pointerDown(document.body);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not call when disabled', () => {
    const cb = vi.fn();
    const ref = { current: document.createElement('div') };
    renderHook(() => useOutsideClick(ref, cb, { enabled: false }));

    fireEvent.pointerDown(document.body);
    expect(cb).not.toHaveBeenCalled();
  });

  it('uses null ref safely', () => {
    const cb = vi.fn();
    const ref = { current: null };
    renderHook(() => useOutsideClick(ref, cb));

    fireEvent.pointerDown(document.body);
    expect(cb).not.toHaveBeenCalled();
  });
});
