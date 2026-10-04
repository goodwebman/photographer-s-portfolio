/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { UISkeleton } from './UISkeleton';

afterEach(() => {
  cleanup();
});

describe('UISkeleton', () => {
  it('имеет data-name', () => {
    const { container } = render(<UISkeleton />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UISkeleton');
  });

  it('aria-hidden=true', () => {
    const { container } = render(<UISkeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('базовые классы shimmer и bg-foreground/15', () => {
    const { container } = render(<UISkeleton />);
    expect(container.firstChild).toHaveClass('bg-foreground/15');
    expect(container.firstChild).toHaveClass('before:animate-shimmer');
  });

  it('testId в data-name', () => {
    const { container } = render(<UISkeleton testId="card" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UISkeleton-card');
  });

  it('className не затирает базовые классы', () => {
    const { container } = render(<UISkeleton className="h-10 w-full" />);
    expect(container.firstChild).toHaveClass('h-10');
    expect(container.firstChild).toHaveClass('bg-foreground/15');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UISkeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
