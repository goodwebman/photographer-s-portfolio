/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UIProgress } from './UIProgress';

afterEach(() => {
  cleanup();
});

describe('UIProgress', () => {
  it('role="progressbar" и data-name', () => {
    render(<UIProgress />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('data-name', 'UIProgress');
  });

  it('aria-valuenow / min / max', () => {
    render(<UIProgress value={30} max={100} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '30');
    expect(el).toHaveAttribute('aria-valuemin', '0');
    expect(el).toHaveAttribute('aria-valuemax', '100');
  });

  it('value=0', () => {
    render(<UIProgress value={0} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '0');
  });

  it('value=max → 100%', () => {
    render(<UIProgress value={100} />);
    // внутренний индикатор должен быть с transform на 0
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(indicator.style.transform).toBe('translateX(0%)');
  });

  it('value=50 → середина', () => {
    render(<UIProgress value={50} />);
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(indicator.style.transform).toBe('translateX(-50%)');
  });

  it('value выше max не даёт > 100%', () => {
    render(<UIProgress value={200} max={100} />);
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(indicator.style.transform).toBe('translateX(0%)');
  });

  it('value ниже 0 не даёт < 0%', () => {
    render(<UIProgress value={-10} />);
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(indicator.style.transform).toBe('translateX(-100%)');
  });

  it('testId в data-name', () => {
    render(<UIProgress testId="upload" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-name', 'UIProgress-upload');
  });

  it('indeterminate при value=null: aria-busy и нет aria-valuenow', () => {
    render(<UIProgress value={null} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el).not.toHaveAttribute('aria-valuenow');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIProgress ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
