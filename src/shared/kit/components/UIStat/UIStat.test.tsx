/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UIStat } from './UIStat';

afterEach(() => {
  cleanup();
});

describe('UIStat', () => {
  it('рендерит label и value с data-name', () => {
    const { container } = render(<UIStat label="Подписки" value="12 480" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIStat');
    expect(screen.getByText('Подписки')).toBeInTheDocument();
    expect(screen.getByText('12 480')).toBeInTheDocument();
  });

  it('положительная дельта → +N% и зелёный цвет', () => {
    render(<UIStat label="x" value="1" delta={12.5} />);
    const badge = screen.getByText('+12.5%');
    expect(badge).toHaveClass('text-success-emphasis');
  });

  it('отрицательная дельта → -N% и красный цвет', () => {
    render(<UIStat label="x" value="1" delta={-3} />);
    const badge = screen.getByText('-3%');
    expect(badge).toHaveClass('text-destructive-emphasis');
  });

  it('invertDelta инвертирует цвет, но не знак', () => {
    render(<UIStat label="x" value="1" delta={-18} invertDelta />);
    const badge = screen.getByText('-18%');
    expect(badge).toHaveClass('text-success-emphasis');
  });

  it('нулевая дельта → нейтральный цвет', () => {
    render(<UIStat label="x" value="1" delta={0} />);
    const badge = screen.getByText('0%');
    expect(badge).toHaveClass('text-muted-foreground');
  });

  it('без delta бейдж не рендерится', () => {
    render(<UIStat label="x" value="1" />);
    expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
  });

  it('testId в data-name', () => {
    const { container } = render(<UIStat testId="views" label="x" value="1" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIStat-views');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIStat ref={ref} label="x" value="1" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
