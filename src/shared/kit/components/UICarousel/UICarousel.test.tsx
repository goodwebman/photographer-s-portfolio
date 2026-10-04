/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { VirtuosoMockContext } from 'react-virtuoso';
import { UICarousel, type UICarouselHandle } from '.';

afterEach(() => {
  cleanup();
});

// horizontalDirection тоже использует itemHeight как «главный размер» слайда в mock-контексте.
const renderWithMock = (ui: React.ReactElement) =>
  render(
    <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 320 }}>
      {ui}
    </VirtuosoMockContext.Provider>,
  );

const slides = Array.from({ length: 8 }, (_, i) => ({ id: i, label: `Слайд ${String(i)}` }));

describe('UICarousel', () => {
  it('рендерит регион карусели и data-name', () => {
    const { container } = renderWithMock(
      <UICarousel
        items={slides}
        getItemKey={(s) => s.id}
        renderItem={(s) => <div>{s.label}</div>}
      />,
    );
    expect(container.querySelector('[data-name="UICarousel"]')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('testId → data-name', () => {
    const { container } = renderWithMock(
      <UICarousel testId="promo" items={slides} renderItem={(s) => <div>{s.label}</div>} />,
    );
    expect(container.querySelector('[data-name="UICarousel-promo"]')).toBeInTheDocument();
  });

  it('рендерит стрелки навигации', () => {
    renderWithMock(<UICarousel items={slides} renderItem={(s) => <div>{s.label}</div>} />);
    expect(screen.getByLabelText('Предыдущий')).toBeInTheDocument();
    expect(screen.getByLabelText('Следующий')).toBeInTheDocument();
  });

  it('рендерит точки-индикаторы (≤12 слайдов)', () => {
    renderWithMock(<UICarousel items={slides} renderItem={(s) => <div>{s.label}</div>} />);
    expect(screen.getByLabelText('Слайд 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Слайд 8')).toBeInTheDocument();
  });

  it('прячет стрелки/точки при single-элементе', () => {
    renderWithMock(<UICarousel items={[slides[0]]} renderItem={(s) => <div>{s.label}</div>} />);
    expect(screen.queryByLabelText('Следующий')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Слайд 1')).not.toBeInTheDocument();
  });

  it('пустое состояние', () => {
    renderWithMock(<UICarousel items={[]} renderItem={() => null} />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
  });

  it('пробрасывает imperative handle (next/prev/scrollToIndex)', () => {
    const ref = createRef<UICarouselHandle>();
    renderWithMock(
      <UICarousel ref={ref} items={slides} renderItem={(s) => <div>{s.label}</div>} />,
    );
    expect(typeof ref.current?.next).toBe('function');
    expect(typeof ref.current?.prev).toBe('function');
    expect(typeof ref.current?.scrollToIndex).toBe('function');
  });
});
