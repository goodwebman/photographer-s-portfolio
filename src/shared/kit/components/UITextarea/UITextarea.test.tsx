/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UITextarea
 *   - data-name
 *   - testId
 *   - error → aria-invalid
 *   - disabled
 *   - onChange
 *   - ref
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UITextarea } from './UITextarea';

afterEach(() => {
  cleanup();
});

describe('UITextarea', () => {
  it('renders with data-name', () => {
    render(<UITextarea />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-name', 'UITextarea');
  });

  it('подставляет testId', () => {
    render(<UITextarea testId="desc" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-name', 'UITextarea-desc');
  });

  it('error → aria-invalid', () => {
    render(<UITextarea error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('без error нет aria-invalid', () => {
    render(<UITextarea />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('disabled блокирует ввод', () => {
    const onChange = vi.fn();
    render(<UITextarea disabled onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'x' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onChange срабатывает', () => {
    const onChange = vi.fn();
    render(<UITextarea onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'x' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('показывает текст ошибки при error="строка"', () => {
    render(<UITextarea testId="bio" error="Слишком коротко" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Слишком коротко');
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'err-bio');
  });

  it('показывает счётчик символов при maxLength', () => {
    render(<UITextarea maxLength={50} defaultValue="hello" />);
    expect(screen.getByText('5/50')).toBeInTheDocument();
  });

  it('счётчик краснеет при достижении лимита', () => {
    render(<UITextarea maxLength={5} defaultValue="hello" />);
    expect(screen.getByText('5/5')).toHaveClass('text-destructive');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<UITextarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
