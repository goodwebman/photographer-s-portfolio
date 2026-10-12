/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UILogo } from './ui-logo';

afterEach(() => {
  cleanup();
});

describe('UILogo', () => {
  it('по умолчанию ведёт к началу страницы', () => {
    render(<UILogo name="studio.frame" />);

    expect(screen.getByRole('link', { name: 'studio.frame' })).toHaveAttribute('href', '#top');
  });

  it('точка бренда выделена акцентом, текст читается целиком', () => {
    const { container } = render(<UILogo name="studio.frame" />);

    expect(container.querySelector('.text-brand-emphasis')).toHaveTextContent('.');
    expect(screen.getByRole('link')).toHaveTextContent('studio.frame');
  });

  it('label заменяет доступное имя', () => {
    render(<UILogo name="studio.frame" label="studio.frame — наверх" />);

    expect(screen.getByRole('link', { name: 'studio.frame — наверх' })).toBeInTheDocument();
  });

  it('бренд без точки рендерится как есть', () => {
    const { container } = render(<UILogo name="Полина" />);

    expect(screen.getByRole('link')).toHaveTextContent('Полина');
    expect(container.querySelector('.text-brand-emphasis')).toBeNull();
  });

  it('вариант footer крупнее и клик пробрасывается', async () => {
    const onClick = vi.fn();
    render(<UILogo name="a.f" variant="footer" onClick={onClick} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-h2');
    await userEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
