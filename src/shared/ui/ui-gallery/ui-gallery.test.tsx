/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UIGallery } from './ui-gallery';

afterEach(() => {
  cleanup();
});

const IMAGES = ['/a.jpg', '/b.jpg', '/c.jpg'];

const setup = () =>
  render(
    <UIGallery
      images={IMAGES}
      altFor={(index) => `Кадр ${String(index + 1)}`}
      openLabelFor={(index) => `Открыть скриншот ${String(index + 1)}`}
      dialogLabel="Галерея"
      closeLabel="Закрыть"
      prevLabel="Предыдущий"
      nextLabel="Следующий"
    />,
  );

/** Открывает лайтбокс на кадре `index` (1-based) и возвращает диалог. */
const openLightbox = async (index: number): Promise<HTMLElement> => {
  await userEvent.click(
    screen.getByRole('button', { name: `Открыть скриншот ${String(index)}` }),
  );

  return screen.getByRole('dialog', { name: 'Галерея' });
};

/** Ждёт завершения exit-анимации: AnimatePresence снимает узел не сразу. */
const expectLightboxClosed = async (): Promise<void> => {
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
};

describe('UIGallery', () => {
  it('рендерит миниатюру-кнопку на каждое изображение', () => {
    setup();

    expect(
      screen.getByRole('button', { name: 'Открыть скриншот 1' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(IMAGES.length);
  });

  it('клик по миниатюре открывает лайтбокс и блокирует скролл страницы', async () => {
    setup();

    await openLightbox(2);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('Esc закрывает лайтбокс и возвращает скролл', async () => {
    setup();

    await openLightbox(1);
    await userEvent.keyboard('{Escape}');

    await expectLightboxClosed();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('стрелки листают по кругу', async () => {
    setup();

    const dialog = await openLightbox(1);
    expect(within(dialog).getByAltText('Кадр 1')).toBeInTheDocument();

    // с первого кадра назад — попадаем на последний
    await userEvent.click(within(dialog).getByRole('button', { name: 'Предыдущий' }));
    expect(
      within(dialog).getByAltText(`Кадр ${String(IMAGES.length)}`),
    ).toBeInTheDocument();

    await userEvent.click(within(dialog).getByRole('button', { name: 'Следующий' }));
    expect(within(dialog).getByAltText('Кадр 1')).toBeInTheDocument();
  });

  it('клавиатурная навигация ←/→ работает в открытом лайтбоксе', async () => {
    setup();

    const dialog = await openLightbox(1);
    await userEvent.keyboard('{ArrowRight}');

    expect(within(dialog).getByAltText('Кадр 2')).toBeInTheDocument();
  });

  it('кнопка закрытия закрывает лайтбокс', async () => {
    setup();

    const dialog = await openLightbox(1);
    await userEvent.click(within(dialog).getByRole('button', { name: 'Закрыть' }));

    await expectLightboxClosed();
  });
});
