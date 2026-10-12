/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { filterPhotos, PHOTOS } from '@/entities/photo';

import { PortfolioSection } from './portfolio-section';

afterEach(() => {
  cleanup();
});

const photoButtons = () =>
  within(screen.getByRole('tabpanel')).getAllByRole('button');

describe('PortfolioSection', () => {
  it('секция — именованный регион с якорем #portfolio', () => {
    const { container } = render(<PortfolioSection />);

    expect(screen.getByRole('region', { name: 'Мои работы' })).toBeInTheDocument();
    expect(container.querySelector('#portfolio')).toBeInTheDocument();
  });

  it('по умолчанию открыта вкладка «Все» со всеми работами', () => {
    render(<PortfolioSection />);

    expect(screen.getByRole('tab', { name: /Все/ })).toHaveAttribute('aria-selected', 'true');
    expect(photoButtons()).toHaveLength(PHOTOS.length);
  });

  it('вкладка жанра фильтрует кадры', async () => {
    render(<PortfolioSection />);

    await userEvent.click(screen.getByRole('tab', { name: /Love story/ }));

    expect(screen.getByRole('tab', { name: /Love story/ })).toHaveAttribute('aria-selected', 'true');
    expect(photoButtons()).toHaveLength(filterPhotos('love-story').length);
  });

  it('в сетке всегда есть ссылка-CTA на Telegram', () => {
    render(<PortfolioSection />);

    const cta = within(screen.getByRole('tabpanel')).getByRole('link', { name: /Хотите так же/ });
    expect(cta).toHaveAttribute('href', 'https://t.me/qaulina');
    expect(cta).toHaveAttribute('target', '_blank');
  });

  it('CTA — «следующий кадр»: номер на единицу больше числа работ во вкладке', async () => {
    render(<PortfolioSection />);

    const cta = () => within(screen.getByRole('tabpanel')).getByRole('link', { name: /Хотите так же/ });
    expect(within(cta()).getByText(String(PHOTOS.length + 1).padStart(2, '0'))).toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: /Love story/ }));
    const next = String(filterPhotos('love-story').length + 1).padStart(2, '0');
    expect(within(cta()).getByText(next)).toBeInTheDocument();
  });

  it('клик по кадру открывает лайтбокс на этом кадре', async () => {
    render(<PortfolioSection />);

    await userEvent.click(photoButtons()[2]);

    // лайтбокс — отдельный чанк: появляется после загрузки
    const dialog = await screen.findByRole('dialog', { name: 'Просмотр фотографии' });
    expect(within(dialog).getByText(`3 / ${String(PHOTOS.length)}`)).toBeInTheDocument();
    expect(within(dialog).getByRole('img', { name: PHOTOS[2].alt })).toBeInTheDocument();
  });
});
