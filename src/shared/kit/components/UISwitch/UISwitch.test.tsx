/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UISwitch
 *   - role="switch"
 *   - data-name
 *   - toggles на клике
 *   - aria-checked соответствует checked
 *   - disabled не срабатывает
 *   - ref
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UISwitch } from './UISwitch';

afterEach(() => {
  cleanup();
});

describe('UISwitch', () => {
  it('имеет role="switch" и data-name', () => {
    render(<UISwitch />);
    const sw = screen.getByRole('switch');
    expect(sw).toHaveAttribute('data-name', 'UISwitch');
  });

  it('aria-checked=false по умолчанию', () => {
    render(<UISwitch />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('aria-checked=true при checked', () => {
    render(<UISwitch checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles на клике', () => {
    const onChange = vi.fn();
    render(<UISwitch onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles false → true при checked', () => {
    const onChange = vi.fn();
    render(<UISwitch checked onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('disabled не вызывает onCheckedChange', () => {
    const onChange = vi.fn();
    render(<UISwitch disabled onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<UISwitch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
