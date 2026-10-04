/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIPagination } from '.';

afterEach(() => {
  cleanup();
});

describe('UIPagination', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UIPagination current={1} total={5} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UIPagination');
  });

  it('рендерит страницы', () => {
    render(<UIPagination current={1} total={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument();
  });

  it('выделяет текущую страницу', () => {
    render(<UIPagination current={3} total={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Page 3')).toHaveAttribute('aria-current', 'page');
  });

  it('активная страница имеет primary-фон, а не opacity-50', () => {
    render(<UIPagination current={3} total={5} onPageChange={() => {}} />);
    const active = screen.getByLabelText('Page 3');
    expect(active).toHaveClass('bg-primary', 'text-primary-foreground');
    // disabled здесь — «текущая страница», она не должна выцветать
    expect(active.className).not.toContain('opacity-50');
  });

  it('рендерит chevron-иконки в кнопках prev/next', () => {
    render(<UIPagination current={3} total={5} onPageChange={() => {}} />);
    const prev = screen.getByLabelText('Go to previous page');
    const next = screen.getByLabelText('Go to next page');
    expect(prev.querySelector('svg[data-icon="chevron-left"]')).toBeInTheDocument();
    expect(next.querySelector('svg[data-icon="chevron-right"]')).toBeInTheDocument();
  });

  it('вызывает onPageChange при клике', () => {
    const onChange = vi.fn();
    render(<UIPagination current={1} total={5} onPageChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('prev/next кнопки disabled на границах', () => {
    const { rerender } = render(
      <UIPagination current={1} total={5} onPageChange={() => {}} />,
    );
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled();

    rerender(<UIPagination current={5} total={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
  });

  it('prev/next вызывают onPageChange', () => {
    const onChange = vi.fn();
    render(<UIPagination current={3} total={5} onPageChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(onChange).toHaveBeenCalledWith(2);

    onChange.mockReset();
    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('скрывает кнопки при showControls=false', () => {
    render(
      <UIPagination current={3} total={5} onPageChange={() => {}} showControls={false} />,
    );
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
  });

  it('ничего не рендерит при total <= 1', () => {
    const { container } = render(
      <UIPagination current={1} total={1} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('показывает многоточия для большого total', () => {
    render(<UIPagination current={5} total={20} onPageChange={() => {}} />);
    // Should show ellipsis markers
    const ellipses = screen.getAllByText('…');
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it('пробрасывает ref на nav', () => {
    const ref = createRef<HTMLElement>();
    render(<UIPagination ref={ref} current={1} total={5} onPageChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('имеет role="navigation" и aria-label', () => {
    render(<UIPagination current={1} total={5} onPageChange={() => {}} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Pagination');
  });
});
