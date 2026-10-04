/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UIFab } from './ui-fab';

afterEach(() => {
  cleanup();
});

const noop = () => undefined;

describe('UIFab', () => {
  it('скрыта, пока visible=false', () => {
    render(
      <UIFab visible={false} label="Наверх" onClick={noop}>
        <svg />
      </UIFab>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('показывается с доступным именем при visible=true', () => {
    render(
      <UIFab visible label="Наверх" onClick={noop}>
        <svg />
      </UIFab>,
    );

    expect(screen.getByRole('button', { name: 'Наверх' })).toBeInTheDocument();
  });

  it('клик пробрасывается наружу', async () => {
    const onClick = vi.fn();
    render(
      <UIFab visible label="Наверх" onClick={onClick}>
        <svg />
      </UIFab>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
