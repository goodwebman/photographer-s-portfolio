/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { UIThemeToggle } from './ui-theme-toggle';

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute('data-theme');
  document.cookie = 'theme=;path=/;max-age=0';
});

describe('UIThemeToggle', () => {
  it('рендерит кнопку с data-name', () => {
    const { container } = render(<UIThemeToggle />);
    expect(container.querySelector('[data-name^="UIThemeToggle"]')).toBeInTheDocument();
  });

  it('стартует с тёмной темы по умолчанию (aria-label «включить светлую»)', () => {
    render(<UIThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Включить светлую тему');
  });

  it('читает тему с <html>: светлая, выставленная до монтирования', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<UIThemeToggle />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Включить тёмную тему');
  });

  it('клик переключает data-theme на <html>, cookie и aria-label', () => {
    render(<UIThemeToggle />);
    const btn = screen.getByRole('button');

    fireEvent.click(btn);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.cookie).toContain('theme=light');
    expect(btn).toHaveAttribute('aria-label', 'Включить тёмную тему');

    fireEvent.click(btn);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(btn).toHaveAttribute('aria-label', 'Включить светлую тему');
  });

  it('обе иконки в разметке — видимую выбирает CSS по теме', () => {
    const { container } = render(<UIThemeToggle />);
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });
});
