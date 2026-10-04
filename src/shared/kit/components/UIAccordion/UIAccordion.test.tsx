/**
 * @vitest-environment jsdom
 */
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIAccordion } from '.';

afterEach(() => {
  cleanup();
});

describe('UIAccordion', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UIAccordion value="a" onValueChange={() => {}}>
        <UIAccordion.Item value="a">item</UIAccordion.Item>
      </UIAccordion>,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UIAccordion');
  });

  it('открывает/закрывает Item при клике по Trigger (single)', () => {
    const onChange = vi.fn();
    render(
      <UIAccordion value="" onValueChange={onChange}>
        <UIAccordion.Item value="item1">
          <UIAccordion.Trigger>Trigger 1</UIAccordion.Trigger>
          <UIAccordion.Content>Content 1</UIAccordion.Content>
        </UIAccordion.Item>
      </UIAccordion>,
    );

    // контент всегда смонтирован (нужно для плавной анимации высоты); закрыт → data-state="closed"
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(document.querySelector('[data-name="UIAccordionContent"]')).toHaveAttribute(
      'data-state',
      'closed',
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(onChange).toHaveBeenCalledWith('item1');
  });

  it('закрывает открытый Item при повторном клике', () => {
    const onChange = vi.fn();
    render(
      <UIAccordion value="item1" onValueChange={onChange}>
        <UIAccordion.Item value="item1">
          <UIAccordion.Trigger>Trigger 1</UIAccordion.Trigger>
          <UIAccordion.Content>Content 1</UIAccordion.Content>
        </UIAccordion.Item>
      </UIAccordion>,
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('single strategy: открывает только один Item', () => {
    const onChange = vi.fn();
    render(
      <UIAccordion value="" onValueChange={onChange}>
        <UIAccordion.Item value="a">
          <UIAccordion.Trigger>A</UIAccordion.Trigger>
          <UIAccordion.Content>Content A</UIAccordion.Content>
        </UIAccordion.Item>
        <UIAccordion.Item value="b">
          <UIAccordion.Trigger>B</UIAccordion.Trigger>
          <UIAccordion.Content>Content B</UIAccordion.Content>
        </UIAccordion.Item>
      </UIAccordion>,
    );

    fireEvent.click(screen.getByText('A'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('multiple strategy: открывает несколько Items', () => {
    function TestWrapper() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <UIAccordion value={value} onValueChange={(v) => setValue(v as string[])} strategy="multiple">
          <UIAccordion.Item value="a">
            <UIAccordion.Trigger>A</UIAccordion.Trigger>
          </UIAccordion.Item>
          <UIAccordion.Item value="b">
            <UIAccordion.Trigger>B</UIAccordion.Trigger>
          </UIAccordion.Item>
        </UIAccordion>
      );
    }
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('A'));

    fireEvent.click(screen.getByText('B'));

    expect(screen.getByText('A')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('B')).toHaveAttribute('aria-expanded', 'true');
  });

  it('Trigger имеет aria-expanded', () => {
    render(
      <UIAccordion value="open" onValueChange={() => {}}>
        <UIAccordion.Item value="open">
          <UIAccordion.Trigger>Open</UIAccordion.Trigger>
        </UIAccordion.Item>
        <UIAccordion.Item value="closed">
          <UIAccordion.Trigger>Closed</UIAccordion.Trigger>
        </UIAccordion.Item>
      </UIAccordion>,
    );

    expect(screen.getByText('Open')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Closed')).toHaveAttribute('aria-expanded', 'false');
  });

  it('Content имеет role="region"', () => {
    render(
      <UIAccordion value="a" onValueChange={() => {}}>
        <UIAccordion.Item value="a">
          <UIAccordion.Content>Content</UIAccordion.Content>
        </UIAccordion.Item>
      </UIAccordion>,
    );

    expect(screen.getByText('Content')).toHaveAttribute('role', 'region');
  });

  it('кидает ошибку при использовании sub-components вне корня', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<UIAccordion.Trigger />)).toThrow();
    spy.mockRestore();
  });

  it('пробрасывает ref на корневой элемент', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <UIAccordion ref={ref} value="a" onValueChange={() => {}} />,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
