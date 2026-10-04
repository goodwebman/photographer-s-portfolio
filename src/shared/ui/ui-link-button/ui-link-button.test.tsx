/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';

import { renderWithIntl } from '@/shared/lib/testing';

import { UILinkButton } from './ui-link-button';

afterEach(() => {
  cleanup();
});

describe('UILinkButton', () => {
  it('внутренний маршрут — locale-aware ссылка с префиксом локали', () => {
    renderWithIntl(<UILinkButton href="/portfolio">Портфолио</UILinkButton>);

    const link = screen.getByRole('link', { name: 'Портфолио' });
    expect(link).toHaveAttribute('href', '/ru/portfolio');
    expect(link).not.toHaveAttribute('target');
  });

  it('внешняя ссылка открывается в новой вкладке и защищена rel', () => {
    renderWithIntl(<UILinkButton href="https://t.me/x">Telegram</UILinkButton>);

    const link = screen.getByRole('link', { name: 'Telegram' });
    expect(link).toHaveAttribute('href', 'https://t.me/x');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('mailto остаётся в текущей вкладке', () => {
    renderWithIntl(<UILinkButton href="mailto:a@b.c">Написать</UILinkButton>);

    const link = screen.getByRole('link', { name: 'Написать' });
    expect(link).toHaveAttribute('href', 'mailto:a@b.c');
    expect(link).not.toHaveAttribute('target');
  });

  it('вариант и размер дают те же классы, что у UIButton кита', () => {
    renderWithIntl(
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
    renderWithIntl(
      <UILinkButton href="/" fullWidth>
        Домой
      </UILinkButton>,
    );

    expect(screen.getByRole('link', { name: 'Домой' })).toHaveClass('w-full');
  });

  it('data-name по умолчанию и с суффиксом', () => {
    const { container } = renderWithIntl(
      <UILinkButton href="/" dataName="cta">
        Домой
      </UILinkButton>,
    );

    expect(
      container.querySelector('[data-name="UILinkButton-cta"]'),
    ).toBeInTheDocument();
  });
});
