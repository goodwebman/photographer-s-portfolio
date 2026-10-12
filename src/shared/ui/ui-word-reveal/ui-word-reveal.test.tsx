/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIWordReveal } from './ui-word-reveal';

afterEach(() => {
  cleanup();
});

const animatedPieces = (container: HTMLElement) =>
  container.querySelectorAll('span[aria-hidden="true"]');

describe('UIWordReveal', () => {
  it('по умолчанию рендерит h1, доступное имя — текст целиком', () => {
    render(<UIWordReveal text="Жду вас в кадре" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Жду вас в кадре' })).toBeInTheDocument();
  });

  it('as="h2" меняет уровень заголовка', () => {
    render(<UIWordReveal as="h2" text="Мои работы" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('split="word" анимирует каждое слово отдельно', () => {
    const { container } = render(<UIWordReveal text="раз два три" />);

    expect(animatedPieces(container)).toHaveLength(3);
  });

  it('split="char" режет по буквам, но скринридер читает слово целиком', () => {
    const { container } = render(<UIWordReveal text="Полина" split="char" />);

    expect(animatedPieces(container)).toHaveLength(6);
    expect(screen.getByRole('heading', { name: 'Полина' })).toBeInTheDocument();
  });

  it('className уходит на заголовок', () => {
    render(<UIWordReveal text="Текст" className="text-hero" />);

    expect(screen.getByRole('heading')).toHaveClass('text-hero');
  });

  it('label — полное имя заголовка, видимым остаётся text', () => {
    render(<UIWordReveal text="Полина" label="Полина — фотограф в Омске" split="char" />);

    expect(screen.getByRole('heading', { name: 'Полина — фотограф в Омске' })).toBeInTheDocument();
  });

  it('между словами настоящие пробелы — текст для поисковика не слипается', () => {
    const { container } = render(<UIWordReveal text="Жду вас в кадре" />);
    const visible = Array.from(container.querySelector('h1')?.childNodes ?? [])
      .filter((node) => !(node instanceof HTMLElement && node.classList.contains('sr-only')))
      .map((node) => node.textContent)
      .join('');

    expect(visible).toBe('Жду вас в кадре');
  });

  it('помечен для CSS-каскада: data-reveal и индекс куска', () => {
    const { container } = render(<UIWordReveal text="раз два" delay={0.15} />);
    const heading = container.querySelector('h1');
    const pieces = container.querySelectorAll<HTMLElement>('[data-piece]');

    expect(heading).toHaveAttribute('data-reveal', 'pieces');
    expect(heading?.style.getPropertyValue('--pieces-delay')).toBe('0.15s');
    expect(pieces[1].style.getPropertyValue('--i')).toBe('1');
  });
});
