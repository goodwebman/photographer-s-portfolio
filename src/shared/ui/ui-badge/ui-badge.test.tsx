/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { UIBadge } from './ui-badge';

afterEach(() => {
  cleanup();
});

const getRoot = (container: HTMLElement): HTMLElement => {
  const el = container.querySelector<HTMLElement>('[data-name^="UIBadge"]');
  if (!el) throw new Error('UIBadge: root not found');

  return el;
};

describe('UIBadge', () => {
  it('рендерит подпись и точку-маркер по умолчанию', () => {
    const { container } = render(<UIBadge>Frontend Developer</UIBadge>);
    const root = getRoot(container);

    expect(root).toHaveTextContent('Frontend Developer');
    expect(root.querySelector('.bg-accent')).toBeInTheDocument();
  });

  it('без точки при dot={false}', () => {
    const { container } = render(<UIBadge dot={false}>Роль</UIBadge>);

    expect(getRoot(container).querySelector('.bg-accent')).not.toBeInTheDocument();
  });

  it('прокидывает остаточные пропсы на корень (data-атрибуты ревила)', () => {
    const { container } = render(<UIBadge data-gsap="fade-up">Роль</UIBadge>);

    expect(getRoot(container)).toHaveAttribute('data-gsap', 'fade-up');
  });

  it('склеивает className и data-name с суффиксом', () => {
    const { container } = render(
      <UIBadge className="mt-3" dataName="role">
        Роль
      </UIBadge>,
    );
    const root = getRoot(container);

    expect(root).toHaveClass('mt-3');
    expect(root).toHaveAttribute('data-name', 'UIBadge-role');
  });
});
