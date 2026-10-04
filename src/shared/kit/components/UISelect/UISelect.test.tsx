/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UISelect } from '.';

afterEach(() => { cleanup(); });

describe('UISelect', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UISelect value="" onValueChange={() => {}}>
        <UISelect.Option value="a">A</UISelect.Option>
      </UISelect>,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UISelect');
  });

  it('открывает список по клику', () => {
    render(
      <UISelect value="" onValueChange={() => {}}>
        <UISelect.Option value="a">Option A</UISelect.Option>
      </UISelect>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('выбирает опцию и вызывает onValueChange', () => {
    const onChange = vi.fn();
    render(
      <UISelect value="" onValueChange={onChange}>
        <UISelect.Option value="a">Option A</UISelect.Option>
      </UISelect>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option A'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('помечает выбранную опцию aria-selected и показывает чек-иконку', () => {
    render(
      <UISelect value="a" onValueChange={() => {}}>
        <UISelect.Option value="a">Option A</UISelect.Option>
      </UISelect>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    const option = screen.getByRole('option');
    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(option.querySelector('svg[data-icon="check"]')).toBeInTheDocument();
  });

  it('закрывается по клику вне', () => {
    render(
      <>
        <UISelect value="" onValueChange={() => {}}>
          <UISelect.Option value="a">Option A</UISelect.Option>
        </UISelect>
        <button>Outside</button>
      </>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Option A')).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByText('Outside'));
    expect(screen.queryByText('Option A')).not.toBeInTheDocument();
  });
});
