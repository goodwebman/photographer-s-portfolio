/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UISpinner } from './UISpinner';

afterEach(() => {
  cleanup();
});

describe('UISpinner', () => {
  it('role="status" и aria-label', () => {
    render(<UISpinner />);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-label', 'Loading…');
    expect(el).toHaveAttribute('data-name', 'UISpinner');
  });

  it('size:sm → class size-4', () => {
    const { container } = render(<UISpinner size="sm" />);
    expect(container.firstChild).toHaveClass('size-4');
  });

  it('size:md по умолчанию', () => {
    const { container } = render(<UISpinner />);
    expect(container.firstChild).toHaveClass('size-6');
  });

  it('size:lg', () => {
    const { container } = render(<UISpinner size="lg" />);
    expect(container.firstChild).toHaveClass('size-8');
  });

  it('size:xl', () => {
    const { container } = render(<UISpinner size="xl" />);
    expect(container.firstChild).toHaveClass('size-12');
  });

  it('testId в data-name', () => {
    render(<UISpinner testId="load" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-name', 'UISpinner-load');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<SVGSVGElement>();
    render(<UISpinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
