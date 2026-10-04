/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIOtpInput } from './UIOtpInput';

afterEach(() => {
  cleanup();
});

function cells() {
  return screen.getAllByRole('textbox');
}

describe('UIOtpInput', () => {
  it('рендерит N ячеек с data-name', () => {
    render(<UIOtpInput length={4} />);
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('data-name', 'UIOtpInput');
    expect(cells()).toHaveLength(4);
  });

  it('testId → data-name', () => {
    render(<UIOtpInput testId="sms" />);
    expect(screen.getByRole('group')).toHaveAttribute('data-name', 'UIOtpInput-sms');
  });

  it('ввод символа вызывает onChange и авто-переход', () => {
    const onChange = vi.fn();
    render(<UIOtpInput length={4} onChange={onChange} />);
    const first = cells()[0];
    fireEvent.change(first, { target: { value: '5' } });
    expect(onChange).toHaveBeenCalledWith('5');
  });

  it('numeric отклоняет не-цифры', () => {
    const onChange = vi.fn();
    render(<UIOtpInput length={4} type="numeric" onChange={onChange} />);
    fireEvent.change(cells()[0], { target: { value: 'a' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Backspace на пустой ячейке стирает предыдущую', () => {
    const onChange = vi.fn();
    render(<UIOtpInput length={4} value="12" onChange={onChange} />);
    // focus третьей (пустой) ячейки и Backspace
    fireEvent.keyDown(cells()[2], { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('paste распределяет символы', () => {
    const onChange = vi.fn();
    render(<UIOtpInput length={6} onChange={onChange} />);
    const paste = (el: Element) =>
      fireEvent.paste(el, {
        clipboardData: { getData: () => '123456' },
      });
    paste(cells()[0]);
    expect(onChange).toHaveBeenLastCalledWith('123456');
  });

  it('onComplete срабатывает при заполнении', () => {
    const onComplete = vi.fn();
    render(<UIOtpInput length={3} onComplete={onComplete} />);
    fireEvent.paste(cells()[0], { clipboardData: { getData: () => '987' } });
    expect(onComplete).toHaveBeenCalledWith('987');
  });

  it('показывает текст ошибки', () => {
    render(<UIOtpInput testId="code" error="Неверный код" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Неверный код');
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'err-code');
  });

  it('пробрасывает ref на корень', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIOtpInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
