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
});
