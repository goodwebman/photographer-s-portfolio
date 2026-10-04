/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithIntl } from '@/shared/lib/testing';

import { UINavLink } from './ui-nav-link';

afterEach(() => {
  cleanup();
});

describe('UINavLink', () => {
  it('активный пункт помечается aria-current="page"', () => {
    renderWithIntl(
      <UINavLink href="/projects" active>
        Проекты
      </UINavLink>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('неактивный пункт без aria-current', () => {
    renderWithIntl(<UINavLink href="/projects">Проекты</UINavLink>);

    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('вариант drawer подсвечивает активный пункт фоном', () => {
    renderWithIntl(
      <UINavLink href="/about" variant="drawer" active>
        Обо мне
      </UINavLink>,
    );

    expect(screen.getByRole('link')).toHaveClass('bg-accent/15');
  });

  it('вариант footer не завязан на состояние активности', () => {
    renderWithIntl(
      <UINavLink href="/about" variant="footer" active>
        Обо мне
      </UINavLink>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-muted-foreground');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('клик пробрасывается наружу', async () => {
    const onClick = vi.fn();
    renderWithIntl(
      <UINavLink href="/about" onClick={onClick}>
        Обо мне
      </UINavLink>,
    );

    await userEvent.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
