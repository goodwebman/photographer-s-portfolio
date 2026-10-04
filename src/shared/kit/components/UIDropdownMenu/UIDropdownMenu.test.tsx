/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIDropdownMenu } from '.';

afterEach(() => { cleanup(); });

describe('UIDropdownMenu', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UIDropdownMenu trigger={<button>Menu</button>}>
        <UIDropdownMenu.Item>Item</UIDropdownMenu.Item>
      </UIDropdownMenu>,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UIDropdownMenu');
  });

  it('открывается по клику на trigger', () => {
    render(
      <UIDropdownMenu trigger={<button>Menu</button>}>
        <UIDropdownMenu.Item>Item</UIDropdownMenu.Item>
      </UIDropdownMenu>,
    );
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByText('Item')).toBeInTheDocument();
  });
});
