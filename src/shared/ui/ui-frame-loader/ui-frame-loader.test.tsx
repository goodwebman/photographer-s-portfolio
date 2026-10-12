/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIFrameLoader } from './ui-frame-loader';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UIFrameLoader"]');
  if (!el) throw new Error('UIFrameLoader: root not found');

  return el;
}

describe('UIFrameLoader', () => {
  it('с подписью — живой регион status с видимым текстом', () => {
    render(<UIFrameLoader label="Проявляем кадр" />);

    expect(screen.getByRole('status')).toHaveTextContent('Проявляем кадр');
  });

  it('без подписи — декоративный: скрыт от скринридеров', () => {
    const root = getRoot(render(<UIFrameLoader />).container);

    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).not.toHaveAttribute('role');
  });

  it('появляется с задержкой, по умолчанию 250 мс', () => {
    const { container, rerender } = render(<UIFrameLoader />);
    expect(getRoot(container).style.animationDelay).toBe('250ms');

    rerender(<UIFrameLoader delay={400} />);
    expect(getRoot(container).style.animationDelay).toBe('400ms');
  });

  it('data-name по умолчанию и с суффиксом', () => {
    const { container } = render(<UIFrameLoader dataName="lightbox" />);

    expect(getRoot(container)).toHaveAttribute('data-name', 'UIFrameLoader-lightbox');
  });
});
