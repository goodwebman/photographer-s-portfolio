/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIReveal } from './ui-reveal';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UIReveal"]');
  if (!el) throw new Error('UIReveal: root not found');

  return el;
}

describe('UIReveal', () => {
  it('рендерит children с data-name и className', () => {
    const { container } = render(
      <UIReveal className="grid" dataName="hero">
        Появление
      </UIReveal>,
    );
    const root = getRoot(container);
    expect(screen.getByText('Появление')).toBeInTheDocument();
    expect(root).toHaveAttribute('data-name', 'UIReveal-hero');
    expect(root).toHaveClass('grid');
  });

  it('помечен для CSS-ревила; значения по умолчанию в разметку не пишутся', () => {
    const { container } = render(<UIReveal>x</UIReveal>);
    const root = getRoot(container);

    expect(root).toHaveAttribute('data-reveal', 'fade');
    expect(root).not.toHaveAttribute('style');
  });

  it('задержка, сдвиг и масштаб — CSS-переменными', () => {
    const { container } = render(
      <UIReveal delay={0.5} y={12} scale={0.94}>
        x
      </UIReveal>,
    );
    const { style } = getRoot(container);

    expect(style.getPropertyValue('--reveal-delay')).toBe('0.5s');
    expect(style.getPropertyValue('--reveal-y')).toBe('12px');
    expect(style.getPropertyValue('--reveal-scale')).toBe('0.94');
  });
});
