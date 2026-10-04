/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { VirtuosoMockContext } from 'react-virtuoso';
import { UIRail, type UIRailHandle } from '.';

afterEach(() => {
  cleanup();
});

const renderWithMock = (ui: React.ReactElement) =>
  render(
    <VirtuosoMockContext.Provider value={{ viewportHeight: 280, itemHeight: 280 }}>
      {ui}
    </VirtuosoMockContext.Provider>,
  );

const items = Array.from({ length: 10 }, (_, i) => ({ id: i, label: `Карта ${String(i)}` }));

describe('UIRail', () => {
  it('рендерит регион с data-name', () => {
    const { container } = renderWithMock(
      <UIRail items={items} getItemKey={(m) => m.id} renderItem={(m) => <div>{m.label}</div>} />,
    );
    expect(container.querySelector('[data-name="UIRail"]')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = renderWithMock(
      <UIRail testId="movies" items={items} renderItem={(m) => <div>{m.label}</div>} />,
    );
    expect(container.querySelector('[data-name="UIRail-movies"]')).toBeInTheDocument();
  });

  it('рендерит заголовок и берёт его как aria-label', () => {
    renderWithMock(
      <UIRail title="Рекомендуем" items={items} renderItem={(m) => <div>{m.label}</div>} />,
    );
    expect(screen.getByRole('heading', { name: 'Рекомендуем' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Рекомендуем' })).toBeInTheDocument();
  });

  it('рендерит стрелки навигации', () => {
    renderWithMock(<UIRail items={items} renderItem={(m) => <div>{m.label}</div>} />);
    expect(screen.getByLabelText('Прокрутить назад')).toBeInTheDocument();
    expect(screen.getByLabelText('Прокрутить вперёд')).toBeInTheDocument();
  });

  it('прячет стрелки при showArrows={false}', () => {
    renderWithMock(
      <UIRail showArrows={false} items={items} renderItem={(m) => <div>{m.label}</div>} />,
    );
    expect(screen.queryByLabelText('Прокрутить вперёд')).not.toBeInTheDocument();
  });

  it('пустое состояние', () => {
    renderWithMock(<UIRail items={[]} renderItem={() => null} />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
  });

  it('кастомный empty', () => {
    renderWithMock(<UIRail items={[]} empty="Пусто тут" renderItem={() => null} />);
    expect(screen.getByText('Пусто тут')).toBeInTheDocument();
  });

  it('пробрасывает imperative handle (next/prev/scrollToIndex)', () => {
    const ref = createRef<UIRailHandle>();
    renderWithMock(
      <UIRail ref={ref} items={items} renderItem={(m) => <div>{m.label}</div>} />,
    );
    expect(typeof ref.current?.next).toBe('function');
    expect(typeof ref.current?.prev).toBe('function');
    expect(typeof ref.current?.scrollToIndex).toBe('function');
  });
});
