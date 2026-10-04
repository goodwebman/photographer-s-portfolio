/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIContainer } from './ui-container';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UIContainer"]');
  if (!el) throw new Error('UIContainer: root not found');

  return el;
}

describe('UIContainer', () => {
  it('data-name по умолчанию и с суффиксом', () => {
    const { container: c1 } = render(<UIContainer>x</UIContainer>);
    expect(getRoot(c1)).toHaveAttribute('data-name', 'UIContainer');

    const { container: c2 } = render(<UIContainer dataName="hero">x</UIContainer>);
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UIContainer-hero');
  });

  it('рендерит children, центрирующие классы и className', () => {
    const { container } = render(
      <UIContainer className="pt-10">Контент</UIContainer>,
    );
    const root = getRoot(container);
    expect(screen.getByText('Контент')).toBeInTheDocument();
    expect(root).toHaveClass('mx-auto');
    expect(root).toHaveClass('max-w-6xl');
    expect(root).toHaveClass('pt-10');
  });
});
