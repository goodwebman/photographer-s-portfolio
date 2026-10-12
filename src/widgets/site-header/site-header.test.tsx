/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NAV, SITE } from '@/shared/config';

import { SiteHeader } from './site-header';

afterEach(() => {
  cleanup();
});

const renderHeader = () => render(<SiteHeader />);

describe('SiteHeader', () => {
  it('навигация — якоря на секции страницы, без переходов на другие страницы', () => {
    renderHeader();

    const nav = screen.getByRole('navigation', { name: 'Разделы сайта' });
    const links = within(nav).getAllByRole('link');

    expect(links).toHaveLength(NAV.length);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `#${NAV[index].id}`);
    });
  });

  it('логотип ведёт к началу страницы', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: `${SITE.brand} — наверх` })).toHaveAttribute('href', '#top');
  });

  it('«Записаться» ведёт в Telegram в новой вкладке', () => {
    renderHeader();

    const cta = screen.getByRole('link', { name: 'Записаться' });
    expect(cta).toHaveAttribute('href', SITE.telegram);
    expect(cta).toHaveAttribute('target', '_blank');
  });

  it('переключателя языка нет — сайт только на русском', () => {
    renderHeader();

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByText(/^en$/i)).not.toBeInTheDocument();
  });

  it('бургер открывает полноэкранное меню, Esc закрывает и возвращает фокус', async () => {
    renderHeader();

    const burger = screen.getByRole('button', { name: 'Открыть меню' });
    await userEvent.click(burger);

    // меню — отдельный чанк: появляется после загрузки
    const menu = await screen.findByRole('dialog', { name: 'Меню' });
    expect(within(menu).getAllByRole('link', { name: /Обо мне|Портфолио|Услуги|Контакты/ })).toHaveLength(
      NAV.length,
    );

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(burger).toHaveFocus();
    });
  });

  it('клик по пункту меню закрывает меню', async () => {
    renderHeader();

    await userEvent.click(screen.getByRole('button', { name: 'Открыть меню' }));
    const menu = await screen.findByRole('dialog', { name: 'Меню' });
    await userEvent.click(within(menu).getByRole('link', { name: /Контакты/ }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
