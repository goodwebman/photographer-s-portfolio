/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UINavLink } from './ui-nav-link';

afterEach(() => {
  cleanup();
});

describe('UINavLink', () => {
  it('якорь на секцию', () => {
    render(<UINavLink href="#about">Обо мне</UINavLink>);

    expect(screen.getByRole('link', { name: 'Обо мне' })).toHaveAttribute('href', '#about');
  });

  it('активный пункт помечается aria-current="location"', () => {
    render(
      <UINavLink href="#about" active>
        Обо мне
      </UINavLink>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'location');
  });

  it('неактивный пункт без aria-current', () => {
    render(<UINavLink href="#about">Обо мне</UINavLink>);

    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('вариант menu показывает номер пункта', () => {
    render(
      <UINavLink href="#services" variant="menu" index="03">
        Услуги
      </UINavLink>,
    );

    expect(screen.getByRole('link')).toHaveTextContent('03Услуги');
  });

  it('номер не рисуется в других вариантах', () => {
    render(
      <UINavLink href="#services" index="03">
        Услуги
      </UINavLink>,
    );

    expect(screen.getByRole('link')).toHaveTextContent(/^Услуги$/);
  });

  it('клик пробрасывается наружу', async () => {
    const onClick = vi.fn();
    render(
      <UINavLink href="#contact" onClick={onClick}>
        Контакты
      </UINavLink>,
    );

    await userEvent.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
