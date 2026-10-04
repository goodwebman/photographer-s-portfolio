/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { UIModal } from './ui-modal';

afterEach(() => {
  cleanup();
});

const noop = (): void => {};

describe('UIModal', () => {
  it('не рендерит диалог при open=false', () => {
    render(
      <UIModal open={false} onClose={noop} label="Диалог">
        Контент
      </UIModal>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('рендерит диалог при open=true с aria-label и data-name', () => {
    render(
      <UIModal open onClose={noop} label="Галерея">
        Контент
      </UIModal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Галерея');
    expect(dialog).toHaveAttribute('data-name', 'UIModal');
    expect(screen.getByText('Контент')).toBeInTheDocument();
  });

  it('data-name с суффиксом dataName', () => {
    render(
      <UIModal open onClose={noop} label="L" dataName="lightbox">
        C
      </UIModal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'data-name',
      'UIModal-lightbox',
    );
  });

  it('кнопка закрытия вызывает onClose', () => {
    const onClose = vi.fn();
    render(
      <UIModal open onClose={onClose} label="L" closeLabel="Закрыть">
        C
      </UIModal>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('клик по оверлею вызывает onClose', () => {
    const onClose = vi.fn();
    render(
      <UIModal open onClose={onClose} label="L">
        C
      </UIModal>,
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Escape вызывает onClose', () => {
    const onClose = vi.fn();
    render(
      <UIModal open onClose={onClose} label="L">
        C
      </UIModal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('без onPrev/onNext стрелок нет', () => {
    render(
      <UIModal open onClose={noop} label="L">
        C
      </UIModal>,
    );
    expect(screen.queryByRole('button', { name: 'Previous' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
  });

  it('со стрелками: рендер и клавиши ←→ дергают onPrev/onNext', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <UIModal open onClose={noop} onPrev={onPrev} onNext={onNext} label="L">
        C
      </UIModal>,
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onPrev).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('клик по панели не вызывает onClose (stopPropagation)', () => {
    const onClose = vi.fn();
    render(
      <UIModal open onClose={onClose} label="L">
        <span>Панель</span>
      </UIModal>,
    );
    fireEvent.click(screen.getByText('Панель'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
