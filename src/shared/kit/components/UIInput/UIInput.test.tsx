/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UIInput
 *   - data-name по умолчанию и с testId
 *   - type="text" по умолчанию
 *   - error → aria-invalid
 *   - error = строка → aria-errormessage
 *   - disabled
 *   - onChange
 *   - ref через createRef
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIInput } from './UIInput';

afterEach(() => {
  cleanup();
});

describe('UIInput', () => {
  it('renders with data-name', () => {
    render(<UIInput />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-name', 'UIInput');
  });

  it('подставляет testId', () => {
    render(<UIInput testId="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-name', 'UIInput-email');
  });

  it('имеет type text по умолчанию', () => {
    render(<UIInput />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('устанавливает aria-invalid при error={true}', () => {
    render(<UIInput error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('устанавливает aria-invalid и aria-errormessage при error="строка"', () => {
    render(<UIInput testId="email" error="Required" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', 'err-email');
  });

  it('показывает текст ошибки-подсказки при error="строка"', () => {
    render(<UIInput testId="email" error="Поле обязательно" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Поле обязательно');
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'err-email');
  });

  it('не показывает подсказку при error={true} (без текста)', () => {
    render(<UIInput error />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('рендерит leftSlot/rightSlot и добавляет отступы', () => {
    render(<UIInput leftSlot={<span>🔍</span>} rightSlot={<button>x</button>} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-9', 'pr-9');
    expect(screen.getByText('🔍')).toBeInTheDocument();
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('без error нет aria-invalid', () => {
    render(<UIInput />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('disabled блокирует ввод', () => {
    const onChange = vi.fn();
    render(<UIInput disabled onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onChange срабатывает', () => {
    const onChange = vi.fn();
    render(<UIInput onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('ref пробрасывается на DOM-ноду', () => {
    const ref = createRef<HTMLInputElement>();
    render(<UIInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('className не затирает базовые классы', () => {
    render(<UIInput className="my-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('my-class', 'border-input');
  });
});
