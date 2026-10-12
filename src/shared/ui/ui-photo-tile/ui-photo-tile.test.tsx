/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TEST_IMAGE } from '@/shared/lib/testing';

import { UIPhotoTile } from './ui-photo-tile';

afterEach(() => {
  cleanup();
});

describe('UIPhotoTile', () => {
  it('кнопка с доступным именем из alt и пометкой, что откроется диалог', () => {
    render(
      <UIPhotoTile src={TEST_IMAGE} alt="Пара на закате" sizes="50vw" caption="Love story" onOpen={vi.fn()} />,
    );

    const button = screen.getByRole('button', { name: 'Пара на закате' });
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('подпись декоративна и не попадает в имя кнопки', () => {
    render(<UIPhotoTile src={TEST_IMAGE} alt="Кадр" sizes="50vw" caption="Портрет" onOpen={vi.fn()} />);

    expect(screen.getByRole('button')).toHaveAccessibleName('Кадр');
  });

  it('клик и Enter открывают кадр', async () => {
    const onOpen = vi.fn();
    render(<UIPhotoTile src={TEST_IMAGE} alt="Кадр" sizes="50vw" onOpen={onOpen} />);

    await userEvent.click(screen.getByRole('button'));
    screen.getByRole('button').focus();
    await userEvent.keyboard('{Enter}');

    expect(onOpen).toHaveBeenCalledTimes(2);
  });

  it('fit="portrait" — ровная ячейка 2:3 для сетки', () => {
    render(<UIPhotoTile src={TEST_IMAGE} alt="Кадр" sizes="50vw" fit="portrait" onOpen={vi.fn()} />);

    expect(screen.getByRole('button')).toHaveClass('aspect-2/3');
  });
});
