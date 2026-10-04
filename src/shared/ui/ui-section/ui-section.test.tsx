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

    const { container: c2 } = render(<UISection dataName="skills">x</UISection>);
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UISection-skills');
  });

  it('прокидывает id-якорь и вертикальные отступы', () => {
    const { container } = render(
      <UISection id="skills" className="bg-muted">
        Секция
      </UISection>,
    );
    const root = getRoot(container);
    expect(root.tagName).toBe('SECTION');
    expect(root).toHaveAttribute('id', 'skills');
    expect(root).toHaveClass('py-16');
    expect(root).toHaveClass('bg-muted');
    expect(screen.getByText('Секция')).toBeInTheDocument();
  });
});
