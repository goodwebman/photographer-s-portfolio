/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';

import { renderWithIntl } from '@/shared/lib/testing';

import { UIIconLink } from './ui-icon-link';

afterEach(() => {
  cleanup();
});

describe('UIIconLink', () => {
  it('внешняя иконочная ссылка: имя, target и rel', () => {
    renderWithIntl(
      <UIIconLink href="https://github.com/x" label="GitHub">
        <svg />
      </UIIconLink>,
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('mailto без target', () => {
    renderWithIntl(
      <UIIconLink href="mailto:a@b.c" label="Почта">
        <svg />
      </UIIconLink>,
    );

    expect(screen.getByRole('link', { name: 'Почта' })).not.toHaveAttribute(
      'target',
    );
  });

  it('внутренний маршрут получает префикс локали', () => {
    renderWithIntl(
      <UIIconLink href="/contact" label="Контакты">
        <svg />
      </UIIconLink>,
    );

    expect(screen.getByRole('link', { name: 'Контакты' })).toHaveAttribute(
      'href',
      '/ru/contact',
    );
  });
});
