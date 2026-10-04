/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIRating } from './UIRating';

afterEach(() => {
  cleanup();
});

describe('UIRating', () => {
  it('интерактивный — role="slider" с aria-valuenow', () => {
    const { container } = render(<UIRating defaultValue={3} />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIRating');
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '3');
    expect(slider).toHaveAttribute('aria-valuemax', '5');
  });

  it('readOnly — role="img", без slider и tabIndex', () => {
    render(<UIRating value={4} readOnly />);
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).not.toHaveAttribute('tabindex');
    expect(img).toHaveAttribute('aria-label', 'Оценка: 4 из 5');
  });

  it('ArrowRight увеличивает на 1 (неуправляемый)', () => {
    render(<UIRating defaultValue={3} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '4');
  });

  it('ArrowLeft уменьшает, шаг 0.5 при allowHalf', () => {
    render(<UIRating defaultValue={3} allowHalf />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider).toHaveAttribute('aria-valuenow', '2.5');
  });

  it('Home → 0, End → max', () => {
    render(<UIRating defaultValue={3} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider).toHaveAttribute('aria-valuenow', '5');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('onChange вызывается с новым значением', () => {
    const onChange = vi.fn();
    render(<UIRating defaultValue={2} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('управляемый режим не меняет значение сам, ждёт проп', () => {
    const { rerender } = render(<UIRating value={2} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    // value не изменился (контролируется извне)
    expect(slider).toHaveAttribute('aria-valuenow', '2');
    rerender(<UIRating value={4} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '4');
  });

  it('disabled — не реагирует на клавиатуру', () => {
    const onChange = vi.fn();
    render(<UIRating defaultValue={2} disabled onChange={onChange} />);
    const el = screen.getByRole('img');
    fireEvent.keyDown(el, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIRating ref={ref} defaultValue={1} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
