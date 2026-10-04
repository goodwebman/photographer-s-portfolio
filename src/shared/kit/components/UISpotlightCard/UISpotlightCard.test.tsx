/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UISpotlightCard } from '.';

afterEach(() => {
  cleanup();
});

describe('UISpotlightCard', () => {
  it('имеет data-name и рендерит children', () => {
    const { container } = render(<UISpotlightCard>Контент</UISpotlightCard>);
    expect(container.querySelector('[data-name="UISpotlightCard"]')).toBeInTheDocument();
    expect(screen.getByText('Контент')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = render(<UISpotlightCard testId="cta">x</UISpotlightCard>);
    expect(container.querySelector('[data-name="UISpotlightCard-cta"]')).toBeInTheDocument();
  });

  it('рендерит слой подсветки (aria-hidden)', () => {
    const { container } = render(<UISpotlightCard>x</UISpotlightCard>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UISpotlightCard ref={ref}>x</UISpotlightCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-name', 'UISpotlightCard');
  });
});
