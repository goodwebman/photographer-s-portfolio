/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { VirtuosoGridMockContext } from 'react-virtuoso';
import { UIVirtualGrid, type UIVirtualGridHandle } from '.';

afterEach(() => {
  cleanup();
});

const renderWithMock = (ui: React.ReactElement) =>
  render(
    <VirtuosoGridMockContext.Provider
      value={{ viewportHeight: 500, viewportWidth: 480, itemHeight: 120, itemWidth: 120 }}
    >
      {ui}
    </VirtuosoGridMockContext.Provider>,
  );

const items = Array.from({ length: 60 }, (_, i) => ({ id: i, label: `Ячейка ${String(i)}` }));

describe('UIVirtualGrid', () => {
  it('рендерит контейнер сетки и data-name', () => {
    const { container } = renderWithMock(
      <UIVirtualGrid
        items={items}
        getItemKey={(it) => it.id}
        renderItem={(it) => <div>{it.label}</div>}
      />,
    );
    expect(container.querySelector('[data-name="UIVirtualGrid"]')).toBeInTheDocument();
    // VirtuosoGrid в jsdom не может измерить ширину списка → проверяем grid-контейнер и классы колонок
    const list = container.querySelector('.grid');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('grid-cols-3');
  });

  it('testId → data-name', () => {
    const { container } = renderWithMock(
      <UIVirtualGrid testId="gallery" items={items} renderItem={(it) => <div>{it.label}</div>} />,
    );
    expect(container.querySelector('[data-name="UIVirtualGrid-gallery"]')).toBeInTheDocument();
  });

  it('пустое состояние', () => {
    renderWithMock(<UIVirtualGrid items={[]} renderItem={() => null} empty="Ничего нет" />);
    expect(screen.getByText('Ничего нет')).toBeInTheDocument();
  });

  it('пробрасывает imperative handle', () => {
    const ref = createRef<UIVirtualGridHandle>();
    renderWithMock(
      <UIVirtualGrid ref={ref} items={items} renderItem={(it) => <div>{it.label}</div>} />,
    );
    expect(typeof ref.current?.scrollToIndex).toBe('function');
  });
});
