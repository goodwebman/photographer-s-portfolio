/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UITimeline } from '.';

afterEach(() => {
  cleanup();
});

describe('UITimeline', () => {
  it('рендерит <ol> с data-name', () => {
    const { container } = render(
      <UITimeline>
        <UITimeline.Item title="A" />
      </UITimeline>,
    );
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    expect(ol).toHaveAttribute('data-name', 'UITimeline');
  });

  it('Item рендерит title, time и описание', () => {
    render(
      <UITimeline>
        <UITimeline.Item title="Создано" time="09:41">
          Описание события
        </UITimeline.Item>
      </UITimeline>,
    );
    expect(screen.getByText('Создано')).toBeInTheDocument();
    expect(screen.getByText('09:41')).toBeInTheDocument();
    expect(screen.getByText('Описание события')).toBeInTheDocument();
  });

  it('variant задаёт цвет маркера', () => {
    render(
      <UITimeline>
        <UITimeline.Item testId="ok" title="A" variant="success" />
      </UITimeline>,
    );
    const marker = screen
      .getByText('A')
      .closest('li')
      ?.querySelector('span');
    expect(marker).toHaveClass('bg-success');
  });

  it('соединитель последнего элемента скрыт через класс на ol', () => {
    const { container } = render(
      <UITimeline>
        <UITimeline.Item title="A" />
        <UITimeline.Item title="B" />
      </UITimeline>,
    );
    expect(container.querySelector('ol')).toHaveClass(
      '[&>li:last-child_[data-connector]]:hidden',
    );
    // оба элемента имеют соединитель в разметке (последний гасится чисто CSS)
    expect(container.querySelectorAll('[data-connector]')).toHaveLength(2);
  });

  it('пробрасывает ref на ol', () => {
    const ref = createRef<HTMLOListElement>();
    render(
      <UITimeline ref={ref}>
        <UITimeline.Item title="A" />
      </UITimeline>,
    );
    expect(ref.current?.tagName).toBe('OL');
  });
});
