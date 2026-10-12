/**
 * @vitest-environment jsdom
 */
import type { FC } from 'react';
import { useState } from 'react';

import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TEST_IMAGE } from '@/shared/lib/testing';

import { UILightbox, type IUILightboxItem } from './ui-lightbox';

afterEach(() => {
  cleanup();
});

const ITEMS: readonly IUILightboxItem[] = [
  { id: 'a', src: TEST_IMAGE, alt: 'Первый кадр' },
  { id: 'b', src: TEST_IMAGE, alt: 'Второй кадр' },
  { id: 'c', src: TEST_IMAGE, alt: 'Третий кадр' },
];

const LABELS = {
  dialog: 'Просмотр фотографии',
  close: 'Закрыть',
  prev: 'Предыдущее фото',
  next: 'Следующее фото',
  loading: 'Проявляем кадр',
};

/** Лайтбокс со «своей» миниатюрой-триггером — как в портфолио. */
const Harness: FC = () => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
        }}
      >
        Миниатюра
      </button>
      <UILightbox
        items={ITEMS}
        index={index}
        onIndexChange={setIndex}
        onClose={() => {
          setIndex(null);
        }}
        labels={LABELS}
      />
    </>
  );
};

const openLightbox = async () => {
  render(<Harness />);
  await userEvent.click(screen.getByRole('button', { name: 'Миниатюра' }));

  return screen.getByRole('dialog', { name: LABELS.dialog });
};

describe('UILightbox', () => {
  it('закрыт, пока index = null', () => {
    render(<Harness />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('модальный диалог с именем, счётчиком и подписью кадра', async () => {
    const dialog = await openLightbox();

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Первый кадр' })).toBeInTheDocument();
  });

  it('стрелки клавиатуры листают по кругу', async () => {
    await openLightbox();

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByText('3 / 3')).toBeInTheDocument();

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Второй кадр' })).toBeInTheDocument();
  });

  it('кнопки ←/→ листают', async () => {
    await openLightbox();

    await userEvent.click(screen.getAllByRole('button', { name: LABELS.next })[0]);
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole('button', { name: LABELS.prev })[0]);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('Esc закрывает и возвращает фокус на миниатюру', async () => {
    await openLightbox();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Миниатюра' })).toHaveFocus();
    });
  });

  it('кнопка «Закрыть» закрывает', async () => {
    await openLightbox();

    await userEvent.click(screen.getByRole('button', { name: LABELS.close }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
