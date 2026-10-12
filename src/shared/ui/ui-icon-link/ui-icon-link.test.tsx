/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIIconLink } from './ui-icon-link';

afterEach(() => {
  cleanup();
});

describe('UIIconLink', () => {
  it('внешняя иконочная ссылка: имя, target и rel', () => {
    render(
      <UIIconLink href="https://t.me/x" label="Telegram">
        <svg />
      </UIIconLink>,
    );

    const link = screen.getByRole('link', { name: 'Telegram' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('mailto без target', () => {
    render(
      <UIIconLink href="mailto:a@b.c" label="Почта">
        <svg />
      </UIIconLink>,
    );

    expect(screen.getByRole('link', { name: 'Почта' })).not.toHaveAttribute(
      'target',
    );
  });

  it('якорь секции — обычная ссылка в той же вкладке', () => {
    render(
      <UIIconLink href="#top" label="Наверх">
        <svg />
      </UIIconLink>,
    );

    const link = screen.getByRole('link', { name: 'Наверх' });
    expect(link).toHaveAttribute('href', '#top');
    expect(link).not.toHaveAttribute('target');
  });
});
