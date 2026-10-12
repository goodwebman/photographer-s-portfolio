/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UILinkButton } from './ui-link-button';

afterEach(() => {
  cleanup();
});

describe('UILinkButton', () => {
  it('якорь секции — ссылка в той же вкладке без префиксов', () => {
    render(<UILinkButton href="#portfolio">Смотреть работы</UILinkButton>);

    const link = screen.getByRole('link', { name: 'Смотреть работы' });
    expect(link).toHaveAttribute('href', '#portfolio');
    expect(link).not.toHaveAttribute('target');
  });

  it('внутренний маршрут — next/link без target', () => {
    render(<UILinkButton href="/">На главную</UILinkButton>);

    const link = screen.getByRole('link', { name: 'На главную' });
    expect(link).toHaveAttribute('href', '/');
    expect(link).not.toHaveAttribute('target');
  });

  it('внешняя ссылка открывается в новой вкладке и защищена rel', () => {
    render(<UILinkButton href="https://t.me/x">Telegram</UILinkButton>);

    const link = screen.getByRole('link', { name: 'Telegram' });
    expect(link).toHaveAttribute('href', 'https://t.me/x');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('mailto остаётся в текущей вкладке', () => {
    render(<UILinkButton href="mailto:a@b.c">Написать</UILinkButton>);

    const link = screen.getByRole('link', { name: 'Написать' });
    expect(link).toHaveAttribute('href', 'mailto:a@b.c');
    expect(link).not.toHaveAttribute('target');
  });

  it('вариант и размер дают те же классы, что у UIButton кита', () => {
    render(
      <UILinkButton href="/" variant="outline" size="lg" className="mt-8">
        Домой
      </UILinkButton>,
    );

    const link = screen.getByRole('link', { name: 'Домой' });
    expect(link).toHaveClass('border-border');
    expect(link).toHaveClass('h-12');
    expect(link).toHaveClass('mt-8');
  });

  it('fullWidth растягивает ссылку на всю ширину', () => {
    render(
      <UILinkButton href="/" fullWidth>
        Домой
      </UILinkButton>,
    );

    expect(screen.getByRole('link', { name: 'Домой' })).toHaveClass('w-full');
  });

  it('data-name по умолчанию и с суффиксом', () => {
    const { container } = render(
      <UILinkButton href="/" dataName="cta">
        Домой
      </UILinkButton>,
    );

    expect(
      container.querySelector('[data-name="UILinkButton-cta"]'),
    ).toBeInTheDocument();
  });
});
