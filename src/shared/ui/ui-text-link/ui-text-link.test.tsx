/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';

import { renderWithIntl } from '@/shared/lib/testing';

import { UITextLink } from './ui-text-link';

afterEach(() => {
  cleanup();
});

describe('UITextLink', () => {
  it('тон accent по умолчанию', () => {
    renderWithIntl(<UITextLink href="/projects">Все проекты</UITextLink>);

    expect(screen.getByRole('link')).toHaveClass('text-accent');
  });

  it('тон muted — приглушённая инлайновая ссылка с местом под иконку', () => {
    renderWithIntl(
      <UITextLink href="/projects" tone="muted">
        Назад
      </UITextLink>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-muted-foreground');
    expect(link).toHaveClass('inline-flex');
  });

  it('внешняя ссылка получает target и rel', () => {
    renderWithIntl(<UITextLink href="https://example.com">Сайт</UITextLink>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
