/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UIIconButton } from './ui-icon-button';

afterEach(() => {
  cleanup();
});

describe('UIIconButton', () => {
  it('label становится доступным именем кнопки', () => {
    render(
      <UIIconButton label="Закрыть">
        <svg />
      </UIIconButton>,
    );

    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
  });

  it('по умолчанию type=button — не сабмитит форму', () => {
    render(
      <UIIconButton label="Меню">
        <svg />
      </UIIconButton>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('размеры S/M/L и варианты дают ожидаемые классы', () => {
    const { rerender } = render(
      <UIIconButton label="a" size="S" variant="plain">
        <svg />
      </UIIconButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('size-9');
    expect(screen.getByRole('button')).toHaveClass('text-muted-foreground');

    rerender(
      <UIIconButton label="a" size="L" variant="surface">
        <svg />
      </UIIconButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('size-11');
    expect(screen.getByRole('button')).toHaveClass('bg-card');
  });

  it('вызывает onClick и прокидывает остаточные пропсы', async () => {
    const onClick = vi.fn();
    render(
      <UIIconButton label="Меню" onClick={onClick} aria-expanded={false}>
        <svg />
      </UIIconButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
