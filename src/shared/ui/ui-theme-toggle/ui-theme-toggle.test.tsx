/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from '@/shared/theme';

import { UIThemeToggle } from './ui-theme-toggle';

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute('data-theme');
});

function renderToggle() {
  return render(
    <ThemeProvider>
      <UIThemeToggle />
    </ThemeProvider>,
  );
}

describe('UIThemeToggle', () => {
  it('рендерит кнопку с data-name', () => {
    const { container } = renderToggle();
    expect(
      container.querySelector('[data-name^="UIThemeToggle"]'),
    ).toBeInTheDocument();
  });

  it('стартует с тёмной темы по умолчанию (aria-label «включить светлую»)', () => {
    renderToggle();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Включить светлую тему',
    );
  });

  it('клик переключает data-theme на <html> и меняет aria-label', () => {
    renderToggle();
    const btn = screen.getByRole('button');

    fireEvent.click(btn);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(btn).toHaveAttribute('aria-label', 'Включить тёмную тему');

    fireEvent.click(btn);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(btn).toHaveAttribute('aria-label', 'Включить светлую тему');
  });
});
