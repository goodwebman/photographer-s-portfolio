/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - useEscape
 *   - вызывает callback на Escape
 *   - НЕ вызывает на другие клавиши
 *   - не вызывает когда disabled
 *   - не вызывает после unmount
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import { useEscape } from './use-escape';

afterEach(() => {
  cleanup();
});

describe('useEscape', () => {
  it('calls callback on Escape keydown', () => {
    const cb = vi.fn();
    renderHook(() => useEscape(cb));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does NOT call on other keys', () => {
    const cb = vi.fn();
    renderHook(() => useEscape(cb));
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(cb).not.toHaveBeenCalled();
  });

  it('does not call when disabled', () => {
    const cb = vi.fn();
    renderHook(() => useEscape(cb, false));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cb).not.toHaveBeenCalled();
  });

  it('cleanup removes listener', () => {
    const cb = vi.fn();
    const { unmount } = renderHook(() => useEscape(cb));
    unmount();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cb).not.toHaveBeenCalled();
  });
});
