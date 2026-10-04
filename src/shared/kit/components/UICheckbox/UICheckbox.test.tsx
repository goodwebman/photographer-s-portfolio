/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UICheckbox
 *   - role="checkbox" и data-name
 *   - toggles при клике
 *   - indeterminate → aria-checked="mixed"
 *   - disabled не вызывает onCheckedChange
 *   - onCheckedChange получает новое значение
 *   - ref
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UICheckbox } from './UICheckbox';

afterEach(() => {
  cleanup();
});

describe('UICheckbox', () => {
  it('имеет role="checkbox" и data-name', () => {
    render(<UICheckbox />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('data-name', 'UICheckbox');
  });

  it('toggles при клике', () => {
    const onChange = vi.fn();
    render(<UICheckbox onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('снимается при повторном клике', () => {
    const onChange = vi.fn();
    render(<UICheckbox checked onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('indeterminate → aria-checked="mixed"', () => {
    render(<UICheckbox checked="indeterminate" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('indeterminate → клик → checked', () => {
    const onChange = vi.fn();
    render(<UICheckbox checked="indeterminate" onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('disabled не вызывает onCheckedChange', () => {
    const onChange = vi.fn();
    render(<UICheckbox disabled onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<UICheckbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
