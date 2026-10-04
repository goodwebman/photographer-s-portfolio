/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIPhoneInput } from '.';

afterEach(() => {
  cleanup();
});

describe('UIPhoneInput', () => {
  it('имеет data-name и дефолтный layout', () => {
    const { container } = render(<UIPhoneInput value={{ dial: '+7', number: '' }} onChange={() => {}} />);
    expect(container.querySelector('[data-name="UIPhoneInput"]')).toBeInTheDocument();
    expect(container.querySelector('[data-name="UIPhoneInputCountry"]')).toBeInTheDocument();
    expect(container.querySelector('[data-name="UIPhoneInputNumber"]')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = render(
      <UIPhoneInput testId="cell" value={{ dial: '+7', number: '' }} onChange={() => {}} />,
    );
    expect(container.querySelector('[data-name="UIPhoneInput-cell"]')).toBeInTheDocument();
  });

  it('ввод номера форматируется по маске страны', () => {
    const onChange = vi.fn();
    render(<UIPhoneInput value={{ dial: '+7', number: '' }} onChange={onChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '9991234567' } });
    expect(onChange).toHaveBeenCalledWith({ dial: '+7', number: '999 123-45-67' });
  });

  it('обрезает лишние цифры сверх маски', () => {
    const onChange = vi.fn();
    render(<UIPhoneInput value={{ dial: '+7', number: '' }} onChange={onChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '99912345678888' } });
    expect(onChange).toHaveBeenCalledWith({ dial: '+7', number: '999 123-45-67' });
  });

  it('автоошибка на blur при неполной маске', () => {
    const { container } = render(
      <UIPhoneInput value={{ dial: '+7', number: '999' }} onChange={() => {}} />,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(container.querySelector('[role="alert"]')).toBeInTheDocument();
  });

  it('нет автоошибки при пустом номере', () => {
    const { container } = render(
      <UIPhoneInput value={{ dial: '+7', number: '' }} onChange={() => {}} />,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
  });

  it('выбор страны меняет dial', () => {
    const onChange = vi.fn();
    render(<UIPhoneInput value={{ dial: '+7', number: '' }} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    // выбираем США (+1) по названию — не завязываемся на порядок в списке.
    // option — сама кнопка: listbox не может владеть интерактивными потомками
    const usOption = screen
      .getAllByRole('option')
      .find((option) => option.textContent!.includes('США'));
    fireEvent.click(usOption!);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ dial: '+1' }));
  });

  it('показывает текст ошибки', () => {
    render(
      <UIPhoneInput value={{ dial: '+7', number: '' }} onChange={() => {}} error="Введите номер" />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Введите номер');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIPhoneInput ref={ref} value={{ dial: '+7', number: '' }} onChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
