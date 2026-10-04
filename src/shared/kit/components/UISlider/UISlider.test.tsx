/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UISlider
 *   - data-name
 *   - type="range"
 *   - value / onValueChange
 *   - min / max / step
 *   - disabled
 *   - aria-valuemin/max/now
 *   - ref
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UISlider } from './UISlider';

afterEach(() => {
  cleanup();
});

describe('UISlider', () => {
  it('имеет data-name', () => {
    render(<UISlider />);
    const el = screen.getByRole('slider');
    expect(el).toHaveAttribute('data-name', 'UISlider');
  });

  it('type="range"', () => {
    render(<UISlider />);
    // FIXME in jsdom the getByRole('slider') works with native range
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('type', 'range');
  });

  it('передаёт value', () => {
    render(<UISlider value={42} />);
    const slider = screen.getByRole<HTMLInputElement>('slider');
    expect(slider.value).toBe('42');
  });

  it('дефолтные min=0 max=100 step=1', () => {
    render(<UISlider />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('step', '1');
  });

  it('кастомные min / max / step', () => {
    render(<UISlider min={10} max={50} step={5} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '50');
    expect(slider).toHaveAttribute('step', '5');
  });

  it('onValueChange вызывается при change', () => {
    const onChange = vi.fn();
    render(<UISlider onValueChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  it('disabled атрибут', () => {
    render(<UISlider disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('aria-valuemin / max / now', () => {
    render(<UISlider value={30} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<UISlider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('testId добавляется к data-name', () => {
    render(<UISlider testId="volume" />);
    const el = screen.getByRole('slider');
    expect(el).toHaveAttribute('data-name', 'UISlider-volume');
  });
});
