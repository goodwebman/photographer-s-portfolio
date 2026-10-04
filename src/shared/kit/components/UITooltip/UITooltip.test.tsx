/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import { UITooltip } from './UITooltip';

afterEach(() => {
  cleanup();
});

describe('UITooltip', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UITooltip content="tip">Hover me</UITooltip>,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UITooltip');
  });

  it('показывает контент при hover', () => {
    vi.useFakeTimers();
    render(<UITooltip content="Tooltip text" delay={10}>Hover</UITooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover'));
    act(() => { vi.advanceTimersByTime(10); });
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('скрывает контент при mouseLeave', () => {
    vi.useFakeTimers();
    render(<UITooltip content="Tooltip text" delay={10}>Hover</UITooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover'));
    act(() => { vi.advanceTimersByTime(10); });
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Hover'));
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('controlled mode: open/onOpenChange', () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(
      <UITooltip content="tip" open={false} onOpenChange={onChange} delay={10}>
        Hover
      </UITooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('Hover'));
    act(() => { vi.advanceTimersByTime(10); });
    expect(onChange).toHaveBeenCalledWith(true);
    vi.useRealTimers();
  });

  it('content имеет role="tooltip"', () => {
    vi.useFakeTimers();
    render(<UITooltip content="Tooltip text" delay={10}>Hover</UITooltip>);
    fireEvent.mouseEnter(screen.getByText('Hover'));
    act(() => { vi.advanceTimersByTime(10); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
