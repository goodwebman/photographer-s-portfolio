/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen, within } from '@testing-library/react';

import { UINumberedList } from './ui-numbered-list';

afterEach(() => {
  cleanup();
});

describe('UINumberedList', () => {
  it('упорядоченный список с пунктами в исходном порядке', () => {
    render(<UINumberedList ariaLabel="Что входит" items={['Образ', 'Локация', 'Съёмка']} />);

    const list = screen.getByRole('list', { name: 'Что входит' });
    expect(list.tagName).toBe('OL');

    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[2]).toHaveTextContent('Съёмка');
  });

  it('визуальный номер в две цифры и скрыт от скринридера', () => {
    render(<UINumberedList items={['Образ', 'Локация']} />);

    const number = screen.getByText('02');
    expect(number).toHaveAttribute('aria-hidden', 'true');
  });
});
