/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UIButton } from './ui-button';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UIButton"]');
  if (!el) throw new Error('UIButton: root element not found');

  return el;
}

describe('UIButton', () => {
  it('data-name по умолчанию', () => {
    const { container } = render(<UIButton>Отправить</UIButton>);
    expect(getRoot(container)).toHaveAttribute('data-name', 'UIButton');
  });

  it('data-name с суффиксом name', () => {
    const { container } = render(<UIButton name="checkout">Оплатить</UIButton>);
    expect(getRoot(container)).toHaveAttribute('data-name', 'UIButton-checkout');
  });

  it('рендерит children и применяет className', () => {
    const { container } = render(<UIButton className="min-w-0">Далее</UIButton>);
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(getRoot(container)).toHaveClass('min-w-0');
  });

  it('variant accent (по умолчанию): классы фона и текста', () => {
    const { container } = render(<UIButton>Accent</UIButton>);
    const root = getRoot(container);
    expect(root).toHaveClass('bg-accent');
    expect(root).toHaveClass('text-accent-foreground');
  });

  it('variant primary: классы фона и текста', () => {
    const { container } = render(<UIButton variant="primary">Primary</UIButton>);
    const root = getRoot(container);
    expect(root).toHaveClass('bg-foreground');
    expect(root).toHaveClass('text-background');
  });

  it('variant outline: рамка', () => {
    const { container } = render(<UIButton variant="outline">Outline</UIButton>);
    const root = getRoot(container);
    expect(root).toHaveClass('border');
    expect(root).toHaveClass('border-border');
  });

  it('нативный type по умолчанию button и настраивается', () => {
    const { container: c1 } = render(<UIButton>A</UIButton>);
    expect(getRoot(c1)).toHaveAttribute('type', 'button');

    const { container: c2 } = render(<UIButton type="submit">B</UIButton>);
    expect(getRoot(c2)).toHaveAttribute('type', 'submit');
  });

  it('size S: высота и радиус', () => {
    const { container } = render(<UIButton size="S">S</UIButton>);
    const root = getRoot(container);
    expect(root).toHaveClass('h-11');
    expect(root).toHaveClass('rounded-xl');
  });

  it('size M: высота и радиус', () => {
    const { container } = render(<UIButton size="M">M</UIButton>);
    const root = getRoot(container);
    expect(root).toHaveClass('h-13');
    expect(root).toHaveClass('rounded-2xl');
  });

  it('без size: адаптивные классы', () => {
    const { container } = render(<UIButton>Адаптив</UIButton>);
    const root = getRoot(container);
    expect(root).toHaveClass('h-11');
    expect(root).toHaveClass('sm:h-13');
  });

  it('disabled: атрибут, cursor и приглушённый фон', () => {
    const { container } = render(<UIButton disabled>Off</UIButton>);
    const root = getRoot(container);
    expect(root).toBeDisabled();
    expect(root).toHaveClass('cursor-not-allowed');
    expect(root).toHaveClass('bg-accent-muted');
  });

  it('loading: контент прозрачный, спиннер виден, cursor-default', () => {
    const { container } = render(
      <UIButton loading size="S">
        Текст
      </UIButton>,
    );
    const root = getRoot(container);
    expect(root).toHaveClass('cursor-default');
    expect(root).not.toBeDisabled();
    expect(screen.getByText('Текст')).toHaveClass('opacity-0');
    expect(container.querySelector('svg.animate-spin')).not.toBeNull();
  });

  it('без loading спиннера нет', () => {
    const { container } = render(<UIButton>Готово</UIButton>);
    expect(container.querySelector('svg.animate-spin')).toBeNull();
  });

  it('onClick при обычном состоянии', () => {
    const onClick = vi.fn();
    const { container } = render(<UIButton onClick={onClick}>OK</UIButton>);
    fireEvent.click(getRoot(container));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick при disabled', () => {
    const onClick = vi.fn();
    const { container } = render(
      <UIButton onClick={onClick} disabled>
        OK
      </UIButton>,
    );
    fireEvent.click(getRoot(container));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('не вызывает onClick при loading', () => {
    const onClick = vi.fn();
    const { container } = render(
      <UIButton onClick={onClick} loading size="S">
        OK
      </UIButton>,
    );
    fireEvent.click(getRoot(container));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('Enter по фокусу вызывает onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(<UIButton onClick={onClick}>OK</UIButton>);
    getRoot(container).focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
