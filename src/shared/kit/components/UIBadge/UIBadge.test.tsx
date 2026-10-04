/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - data-name
 * - variant-классы (default, secondary, destructive, outline)
 * - className кастомный мержится
 * - ref
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { UIBadge } from './UIBadge';

afterEach(() => {
  cleanup();
});

describe('UIBadge', () => {
  it('имеет data-name', () => {
    const { container } = render(<UIBadge />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIBadge');
  });

  it('variant:default по умолчанию', () => {
    const { container } = render(<UIBadge />);
    expect(container.firstChild).toHaveClass('bg-primary');
  });

  it('variant:secondary', () => {
    const { container } = render(<UIBadge variant="secondary" />);
    expect(container.firstChild).toHaveClass('bg-secondary');
  });

  it('variant:destructive', () => {
    const { container } = render(<UIBadge variant="destructive" />);
    expect(container.firstChild).toHaveClass('bg-destructive');
  });

  it('variant:outline', () => {
    const { container } = render(<UIBadge variant="outline" />);
    expect(container.firstChild).toHaveClass('border-border');
  });

  it('testId в data-name', () => {
    const { container } = render(<UIBadge testId="new" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIBadge-new');
  });

  it('className не затирает базовые классы', () => {
    const { container } = render(<UIBadge className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
    expect(container.firstChild).toHaveClass('bg-primary');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<UIBadge ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
