/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UIShowcase } from '.';

afterEach(() => {
  cleanup();
});

const cards = [
  <div key="a">Карта A</div>,
  <div key="b">Карта B</div>,
  <div key="c">Карта C</div>,
];

describe('UIShowcase', () => {
  it('имеет data-name и рендерит все карточки', () => {
    const { container } = render(<UIShowcase>{cards}</UIShowcase>);
    expect(container.querySelector('[data-name="UIShowcase"]')).toBeInTheDocument();
    expect(screen.getByText('Карта A')).toBeInTheDocument();
    expect(screen.getByText('Карта B')).toBeInTheDocument();
    expect(screen.getByText('Карта C')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = render(<UIShowcase testId="places">{cards}</UIShowcase>);
    expect(container.querySelector('[data-name="UIShowcase-places"]')).toBeInTheDocument();
  });

  it('оборачивает каждого ребёнка (число обёрток = числу карт)', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIShowcase ref={ref}>{cards}</UIShowcase>);
    expect(ref.current?.children).toHaveLength(3);
  });

  it('корректно работает с одной карточкой', () => {
    render(
      <UIShowcase>
        <div>Одна</div>
      </UIShowcase>,
    );
    expect(screen.getByText('Одна')).toBeInTheDocument();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIShowcase ref={ref}>{cards}</UIShowcase>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
