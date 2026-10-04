/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { VirtuosoMockContext } from 'react-virtuoso';
import { UIVirtualList, type UIVirtualListHandle } from '.';

afterEach(() => {
  cleanup();
});

// Virtuoso в jsdom не измеряет DOM — подсовываем фиксированные размеры через mock-контекст.
const renderWithMock = (ui: React.ReactElement) =>
  render(
    <VirtuosoMockContext.Provider value={{ viewportHeight: 400, itemHeight: 40 }}>
      {ui}
    </VirtuosoMockContext.Provider>,
  );

const items = Array.from({ length: 100 }, (_, i) => ({ id: i, label: `Строка ${String(i)}` }));

describe('UIVirtualList', () => {
  it('рендерит видимые элементы и data-name', () => {
    const { container } = renderWithMock(
      <UIVirtualList
        items={items}
        getItemKey={(it) => it.id}
        renderItem={(it) => <div>{it.label}</div>}
      />,
    );
    expect(container.querySelector('[data-name="UIVirtualList"]')).toBeInTheDocument();
    expect(screen.getByText('Строка 0')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = renderWithMock(
      <UIVirtualList testId="feed" items={items} renderItem={(it) => <div>{it.label}</div>} />,
    );
    expect(container.querySelector('[data-name="UIVirtualList-feed"]')).toBeInTheDocument();
  });

  it('показывает пустое состояние без hasMore', () => {
    renderWithMock(
      <UIVirtualList items={[]} renderItem={() => null} empty="Пусто тут" />,
    );
    expect(screen.getByText('Пусто тут')).toBeInTheDocument();
  });

  it('дефолтный текст пустого состояния', () => {
    renderWithMock(<UIVirtualList items={[]} renderItem={() => null} />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
  });

  it('пробрасывает imperative handle', () => {
    const ref = createRef<UIVirtualListHandle>();
    renderWithMock(
      <UIVirtualList ref={ref} items={items} renderItem={(it) => <div>{it.label}</div>} />,
    );
    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.scrollToIndex).toBe('function');
    expect(typeof ref.current?.scrollTo).toBe('function');
  });
});
