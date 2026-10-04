/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { UIKbd } from './UIKbd';

afterEach(() => {
  cleanup();
});

describe('UIKbd', () => {
  it('рендерит <kbd> с data-name', () => {
    const { container } = render(<UIKbd>K</UIKbd>);
    const kbd = container.querySelector('kbd');
    expect(kbd).toBeInTheDocument();
    expect(kbd).toHaveAttribute('data-name', 'UIKbd');
    expect(kbd).toHaveTextContent('K');
  });

  it('size:md по умолчанию', () => {
    const { container } = render(<UIKbd>K</UIKbd>);
    expect(container.firstChild).toHaveClass('h-5');
  });

  it('size:lg', () => {
    const { container } = render(<UIKbd size="lg">K</UIKbd>);
    expect(container.firstChild).toHaveClass('h-6');
  });

  it('testId в data-name', () => {
    const { container } = render(<UIKbd testId="save">S</UIKbd>);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIKbd-save');
  });

  it('className мержится с базовыми', () => {
    const { container } = render(<UIKbd className="my-class">K</UIKbd>);
    expect(container.firstChild).toHaveClass('my-class');
    expect(container.firstChild).toHaveClass('font-mono');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLElement>();
    render(<UIKbd ref={ref}>K</UIKbd>);
    expect(ref.current?.tagName).toBe('KBD');
  });
});
