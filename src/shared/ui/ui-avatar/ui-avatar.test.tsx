/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { UIAvatar } from './ui-avatar';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UIAvatar"]');
  if (!el) throw new Error('UIAvatar: root not found');

  return el;
}

describe('UIAvatar', () => {
  it('data-name по умолчанию и с суффиксом', () => {
    const { container: c1 } = render(<UIAvatar src="/me.jpg" alt="Я" />);
    expect(getRoot(c1)).toHaveAttribute('data-name', 'UIAvatar');

    const { container: c2 } = render(
      <UIAvatar src="/me.jpg" alt="Я" dataName="hero" />,
    );
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UIAvatar-hero');
  });

  it('рендерит изображение с alt', () => {
    render(<UIAvatar src="/me.jpg" alt="Портрет" />);
    expect(screen.getByAltText('Портрет')).toBeInTheDocument();
  });

  it('размер по умолчанию M', () => {
    const { container } = render(<UIAvatar src="/me.jpg" alt="Я" />);
    expect(getRoot(container)).toHaveClass('size-16');
  });

  it('size L: класс размера', () => {
    const { container } = render(<UIAvatar src="/me.jpg" alt="Я" size="L" />);
    expect(getRoot(container)).toHaveClass('size-28');
  });

  it('ring: акцентная обводка', () => {
    const { container } = render(<UIAvatar src="/me.jpg" alt="Я" ring />);
    expect(getRoot(container)).toHaveClass('ring-2');
    expect(getRoot(container)).toHaveClass('ring-accent');
  });

  it('hoverSrc: тап переключает второе фото, мышь — нет', () => {
    const { container } = render(
      <UIAvatar src="/me.jpg" alt="Я" hoverSrc="/me-blink.jpg" />,
    );
    const root = getRoot(container);
    const hoverImg = screen.getByAltText('');

    expect(hoverImg).toHaveClass('opacity-0');

    fireEvent.pointerUp(root, { pointerType: 'mouse' });
    expect(hoverImg).toHaveClass('opacity-0');

    fireEvent.pointerUp(root, { pointerType: 'touch' });
    expect(hoverImg).toHaveClass('opacity-100');

    fireEvent.pointerUp(root, { pointerType: 'touch' });
    expect(hoverImg).toHaveClass('opacity-0');
  });
});
