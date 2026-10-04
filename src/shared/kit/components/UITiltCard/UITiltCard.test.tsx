/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UITiltCard } from '.';

afterEach(() => {
  cleanup();
});

describe('UITiltCard', () => {
  it('имеет data-name и рендерит children', () => {
    const { container } = render(<UITiltCard>Контент</UITiltCard>);
    expect(container.querySelector('[data-name="UITiltCard"]')).toBeInTheDocument();
    expect(screen.getByText('Контент')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = render(<UITiltCard testId="promo">x</UITiltCard>);
    expect(container.querySelector('[data-name="UITiltCard-promo"]')).toBeInTheDocument();
  });

  it('рендерит слой блика (glare) по умолчанию и убирает при glare={false}', () => {
    const { container, rerender } = render(<UITiltCard>x</UITiltCard>);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(1);
    rerender(<UITiltCard glare={false}>x</UITiltCard>);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(0);
  });

  it('пробрасывает ref на поверхность', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UITiltCard ref={ref}>x</UITiltCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-name', 'UITiltCard');
  });

  it('прокидывает className на поверхность', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <UITiltCard ref={ref} className="custom-surface">
        x
      </UITiltCard>,
    );
    expect(ref.current).toHaveClass('custom-surface');
  });
});
