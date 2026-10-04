/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UIButton
 *   - data-name по умолчанию и с testId
 *   - рендерит children и доступна по роли
 *   - применяет классы variant
 *   - применяет классы size
 *   - className потребителя не затирает variant
 *   - onClick срабатывает по клику и с клавиатуры
 *   - onClick НЕ срабатывает в disabled и loading
 *   - loading: кнопка disabled + aria-busy + спиннер
 *   - пробрасывает ref на DOM-ноду
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UIButton } from './UIButton';

afterEach(() => {
  cleanup();
});

describe('UIButton', () => {
  it('доступен по роли и получает data-name по умолчанию', () => {
    render(<UIButton>Сохранить</UIButton>);
    const button = screen.getByRole('button', { name: 'Сохранить' });
    expect(button).toHaveAttribute('data-name', 'UIButton');
  });

  it('подставляет testId в data-name', () => {
    render(<UIButton testId="save">OK</UIButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-name', 'UIButton-save');
  });

  it('применяет классы варианта primary по умолчанию', () => {
    render(<UIButton>OK</UIButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('применяет классы варианта destructive', () => {
    render(<UIButton variant="destructive">Удалить</UIButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('применяет размер lg', () => {
    render(<UIButton size="lg">OK</UIButton>);
    expect(screen.getByRole('button')).toHaveClass('h-12', 'px-6');
  });

  it('className потребителя не затирает variant', () => {
    render(<UIButton className="my-extra">OK</UIButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary'); // вариант на месте
    expect(button).toHaveClass('my-extra');
  });

  it('вызывает onClick по клику', () => {
    const onClick = vi.fn();
    render(<UIButton onClick={onClick}>OK</UIButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('срабатывает с клавиатуры (Enter)', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<UIButton onClick={onClick}>OK</UIButton>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick в disabled', () => {
    const onClick = vi.fn();
    render(
      <UIButton disabled onClick={onClick}>
        OK
      </UIButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading блокирует кнопку, ставит aria-busy и рисует спиннер', () => {
    const onClick = vi.fn();
    render(
      <UIButton loading onClick={onClick}>
        OK
      </UIButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('[data-name="UIButton-spinner"]')).not.toBeNull();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('пробрасывает ref на DOM-ноду', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<UIButton ref={ref}>OK</UIButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
