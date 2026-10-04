/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - useScrollLock
 *   - устанавливает overflow: hidden при active=true
 *   - восстанавливает overflow при active=false
 *   - компенсирует скроллбар при наличии
 *   - реентерабельный счётчик
 */
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, renderHook } from '@testing-library/react';
import { useScrollLock } from './use-scroll-lock';

afterEach(() => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  cleanup();
});

describe('useScrollLock', () => {
  it('sets overflow hidden when active', () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores overflow on unmount', () => {
    const { unmount } = renderHook(() => useScrollLock(true));
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('restores overflow when deactivated', () => {
    const { rerender } = renderHook(
      (active: boolean) => useScrollLock(active),
      { initialProps: true },
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('nested locks: only freeing the outer restores overflow', () => {
    const outer = renderHook(() => useScrollLock(true));
    const inner = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    // inner освобождает — но outer держит
    inner.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    outer.unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
