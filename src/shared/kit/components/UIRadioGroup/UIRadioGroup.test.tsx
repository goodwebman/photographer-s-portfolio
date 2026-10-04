/**
 * @vitest-environment jsdom
 *
 * Тесткейсы для UIRadioGroup + UIRadio:
 * - UIRadioGroup
 *   - рендерит fieldset + legend
 *   - data-name
 * - UIRadio (сама)
 *   - role="radio"
 *   - aria-checked соответствует ctx
 *   - data-name
 * - Совместная работа
 *   - клик по radio вызывает onValueChange с её value
 *   - переключение с одного на другое
 *   - disabled radio не реагирует на клик
 *   - ref пробрасывается
 * - Без группы (контекст null) — не падает
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIRadioGroup } from './UIRadioGroup';
import { UIRadio } from './UIRadio';

afterEach(() => {
  cleanup();
});

describe('UIRadioGroup', () => {
  it('рендерит fieldset и legend', () => {
    render(
      <UIRadioGroup name="test" value="a" onValueChange={() => {}} legend="Options">
        <UIRadio value="a">A</UIRadio>
        <UIRadio value="b">B</UIRadio>
      </UIRadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByText('Options')).toBeInTheDocument();
  });
});

describe('UIRadio', () => {
  it('имеет role="radio" и data-name', () => {
    render(
      <UIRadioGroup name="test" value="a" onValueChange={() => {}}>
        <UIRadio value="a">A</UIRadio>
      </UIRadioGroup>,
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('data-name', 'UIRadio');
  });

  it('aria-checked=true когда выбран', () => {
    render(
      <UIRadioGroup name="test" value="a" onValueChange={() => {}}>
        <UIRadio value="a">A</UIRadio>
      </UIRadioGroup>,
    );
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('aria-checked=false когда не выбран', () => {
    render(
      <UIRadioGroup name="test" value="b" onValueChange={() => {}}>
        <UIRadio value="a">A</UIRadio>
      </UIRadioGroup>,
    );
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false');
  });

  it('клик по невыбранному вызывает onValueChange с его value', () => {
    const onChange = vi.fn();
    render(
      <UIRadioGroup name="test" value="b" onValueChange={onChange}>
        <UIRadio value="a">A</UIRadio>
        <UIRadio value="b">B</UIRadio>
      </UIRadioGroup>,
    );
    fireEvent.click(screen.getByText('A'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('клик по текущему не вызывает onValueChange', () => {
    const onChange = vi.fn();
    render(
      <UIRadioGroup name="test" value="a" onValueChange={onChange}>
        <UIRadio value="a">A</UIRadio>
        <UIRadio value="b">B</UIRadio>
      </UIRadioGroup>,
    );
    fireEvent.click(screen.getByText('A'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled radio не реагирует на клик', () => {
    const onChange = vi.fn();
    render(
      <UIRadioGroup name="test" value="b" onValueChange={onChange}>
        <UIRadio value="a" disabled>
          A
        </UIRadio>
        <UIRadio value="b">B</UIRadio>
      </UIRadioGroup>,
    );
    fireEvent.click(screen.getByText('A'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('рендерит children-label', () => {
    render(
      <UIRadioGroup name="test" value="" onValueChange={() => {}}>
        <UIRadio value="x">Option X</UIRadio>
      </UIRadioGroup>,
    );
    expect(screen.getByText('Option X')).toBeInTheDocument();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <UIRadioGroup name="test" value="a" onValueChange={() => {}}>
        <UIRadio value="a" ref={ref}>
          A
        </UIRadio>
      </UIRadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('без RadioGroup (контекст null) не падает', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <UIRadio value="x" ref={ref}>
        Orphan
      </UIRadio>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(screen.getByText('Orphan')).toBeInTheDocument();
  });
});
