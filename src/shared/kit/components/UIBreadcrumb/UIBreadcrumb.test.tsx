/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIBreadcrumb, type IUIBreadcrumbItem } from './UIBreadcrumb';

afterEach(() => {
  cleanup();
});

const items: IUIBreadcrumbItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Фильмы', href: '/movies' },
  { label: 'Дюна' },
];

describe('UIBreadcrumb', () => {
  it('рендерит nav с data-name и aria-label', () => {
    render(<UIBreadcrumb items={items} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('data-name', 'UIBreadcrumb');
    expect(nav).toHaveAttribute('aria-label', 'Хлебные крошки');
  });

  it('крошки с href — ссылки, последняя — текущая страница', () => {
    render(<UIBreadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Главная' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Фильмы' })).toHaveAttribute('href', '/movies');
    // последняя не ссылка
    expect(screen.queryByRole('link', { name: 'Дюна' })).not.toBeInTheDocument();
    const current = screen.getByText('Дюна');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('onClick-крошка — это button', () => {
    const onClick = vi.fn();
    render(
      <UIBreadcrumb
        items={[{ label: 'Назад', onClick }, { label: 'Текущая' }]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('сворачивает середину в «…» при maxItems', () => {
    const long: IUIBreadcrumbItem[] = [
      { label: 'A', href: '#' },
      { label: 'B', href: '#' },
      { label: 'C', href: '#' },
      { label: 'D', href: '#' },
      { label: 'E' },
    ];
    render(<UIBreadcrumb items={long} maxItems={3} />);
    expect(screen.getByText('…')).toBeInTheDocument();
    // видны первая и две последние, середина скрыта
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });

  it('без сворачивания при items.length <= maxItems', () => {
    render(<UIBreadcrumb items={items} maxItems={5} />);
    expect(screen.queryByText('…')).not.toBeInTheDocument();
  });

  it('пробрасывает ref на nav', () => {
    const ref = createRef<HTMLElement>();
    render(<UIBreadcrumb ref={ref} items={items} />);
    expect(ref.current?.tagName).toBe('NAV');
  });
});
