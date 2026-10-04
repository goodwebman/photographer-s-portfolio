/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIWordReveal } from './ui-word-reveal';

afterEach(() => {
  cleanup();
});

describe('UIWordReveal', () => {
  it('по умолчанию рендерит h1 со всеми словами', () => {
    render(<UIWordReveal text="Данил Шебалов" />);

    // Слова лежат в отдельных span'ах (каждое анимируется само), поэтому
    // текстовое содержимое склеено без пробелов — их даёт отступ mr-[0.25em].
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Данил');
    expect(heading).toHaveTextContent('Шебалов');
  });

  it('as="h2" меняет уровень заголовка', () => {
    render(<UIWordReveal as="h2" text="Коротко обо мне" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('разбивает текст по словам — каждое анимируется отдельно', () => {
    const { container } = render(<UIWordReveal text="раз два три" />);

    expect(container.querySelectorAll('span')).toHaveLength(3);
  });

  it('className уходит на заголовок', () => {
    render(<UIWordReveal text="Текст" className="text-h1" />);

    expect(screen.getByRole('heading')).toHaveClass('text-h1');
  });
});
