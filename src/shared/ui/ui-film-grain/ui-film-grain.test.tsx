/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { UIFilmGrain } from './ui-film-grain';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UIFilmGrain"]');
  if (!el) throw new Error('UIFilmGrain: root not found');

  return el;
}

describe('UIFilmGrain', () => {
  it('декоративный слой: скрыт от скринридеров и не перехватывает клики', () => {
    const root = getRoot(render(<UIFilmGrain />).container);

    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveClass('pointer-events-none');
  });

  it('по умолчанию закреплён на вьюпорте с плотностью 5%', () => {
    const root = getRoot(render(<UIFilmGrain />).container);

    expect(root).toHaveClass('fixed');
    expect(root.style.opacity).toBe('0.05');
  });

  it('фактура — статичный SVG-шум feTurbulence в data-URI, без сетевых запросов', () => {
    const root = getRoot(render(<UIFilmGrain />).container);
    const image = decodeURIComponent(root.style.backgroundImage);

    expect(image).toContain('data:image/svg+xml');
    expect(image).toContain('feTurbulence');
  });

  it('contained заливает родителя вместо вьюпорта; opacity настраивается', () => {
    const root = getRoot(render(<UIFilmGrain contained opacity={0.04} />).container);

    expect(root).toHaveClass('absolute');
    expect(root).not.toHaveClass('fixed');
    expect(root.style.opacity).toBe('0.04');
  });

  it('data-name по умолчанию и с суффиксом', () => {
    const { container } = render(<UIFilmGrain dataName="site" />);

    expect(getRoot(container)).toHaveAttribute('data-name', 'UIFilmGrain-site');
  });
});
