/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIPopover } from '.';

afterEach(() => { cleanup(); });

describe('UIPopover', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UIPopover trigger={<button>Open</button>}>
        Content
      </UIPopover>,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UIPopover');
  });

  it('открывает контент по клику на триггер', () => {
    render(
      <UIPopover trigger={<button>Open</button>}>
        <div>Popover body</div>
      </UIPopover>,
    );
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('помечает триггер aria-expanded при открытии', () => {
    render(<UIPopover trigger={<button>Open</button>}>x</UIPopover>);
    const trigger = screen.getByText('Open');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('закрывается по клику вне', () => {
    render(
      <>
        <UIPopover trigger={<button>Open</button>}>
          <div>Body</div>
        </UIPopover>
        <button>Outside</button>
      </>,
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Body')).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByText('Outside'));
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  it('controlled mode: управляется через open/onOpenChange', () => {
    const onChange = vi.fn();
    render(
      <UIPopover trigger={<button>Open</button>} open={false} onOpenChange={onChange}>
        Body
      </UIPopover>,
    );
    fireEvent.click(screen.getByText('Open'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  it('не закрывается по клику внутри контента', () => {
    render(
      <UIPopover trigger={<button>Open</button>}>
        <button>Inside</button>
      </UIPopover>,
    );
    fireEvent.click(screen.getByText('Open'));
    fireEvent.pointerDown(screen.getByText('Inside'));
    expect(screen.getByText('Inside')).toBeInTheDocument();
  });
});
