/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UISection } from './ui-section';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UISection"]');
  if (!el) throw new Error('UISection: root not found');

  return el;
}

describe('UISection', () => {
  it('data-name по умолчанию и с суффиксом', () => {
    const { container: c1 } = render(<UISection>x</UISection>);
    expect(getRoot(c1)).toHaveAttribute('data-name', 'UISection');

    const { container: c2 } = render(<UISection dataName="about">x</UISection>);
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UISection-about');
  });

  it('прокидывает id-якорь, отступы и доп. классы', () => {
    const { container } = render(
      <UISection id="about" className="overflow-hidden">
        Секция
      </UISection>,
    );
    const root = getRoot(container);
    expect(root.tagName).toBe('SECTION');
    expect(root).toHaveAttribute('id', 'about');
    expect(root).toHaveClass('py-20', 'overflow-hidden', 'bg-background');
    expect(screen.getByText('Секция')).toBeInTheDocument();
  });

  it('tone="surface" — второй фон секций', () => {
    const { container } = render(<UISection tone="surface">x</UISection>);

    expect(getRoot(container)).toHaveClass('bg-surface');
    expect(getRoot(container)).not.toHaveClass('bg-background');
  });

  it('с ariaLabelledby секция — именованный регион', () => {
    render(
      <UISection ariaLabelledby="t">
        <h2 id="t">Мои работы</h2>
      </UISection>,
    );

    expect(screen.getByRole('region', { name: 'Мои работы' })).toBeInTheDocument();
  });
});
