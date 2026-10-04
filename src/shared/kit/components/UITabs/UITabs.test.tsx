/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UITabs } from '.';

afterEach(() => {
  cleanup();
});

describe('UITabs', () => {
  it('имеет data-name', () => {
    const { container } = render(
      <UITabs value="a" onValueChange={() => {}}>
        tab content
      </UITabs>,
    );
    expect(container.firstChild).toHaveAttribute('data-name', 'UITabs');
  });

  it('рендерит Tab и Panel', () => {
    render(
      <UITabs value="a" onValueChange={() => {}}>
        <UITabs.List>
          <UITabs.Tab value="a">Tab A</UITabs.Tab>
          <UITabs.Tab value="b">Tab B</UITabs.Tab>
        </UITabs.List>
        <UITabs.Panel value="a">Content A</UITabs.Panel>
        <UITabs.Panel value="b">Content B</UITabs.Panel>
      </UITabs>,
    );
    expect(screen.getByText('Tab A')).toBeInTheDocument();
    expect(screen.getByText('Tab B')).toBeInTheDocument();
    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.queryByText('Content B')).not.toBeInTheDocument();
  });

  it('клик по Tab вызывает onValueChange', () => {
    const onChange = vi.fn();
    render(
      <UITabs value="a" onValueChange={onChange}>
        <UITabs.List>
          <UITabs.Tab value="a">A</UITabs.Tab>
          <UITabs.Tab value="b">B</UITabs.Tab>
        </UITabs.List>
      </UITabs>,
    );
    fireEvent.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('Tab имеет role="tab" и aria-selected', () => {
    render(
      <UITabs value="a" onValueChange={() => {}}>
        <UITabs.List>
          <UITabs.Tab value="a">A</UITabs.Tab>
          <UITabs.Tab value="b">B</UITabs.Tab>
        </UITabs.List>
      </UITabs>,
    );
    const tabA = screen.getByText('A');
    expect(tabA.closest('[role="tab"]')).toHaveAttribute('aria-selected', 'true');
    const tabB = screen.getByText('B');
    expect(tabB.closest('[role="tab"]')).toHaveAttribute('aria-selected', 'false');
  });

  it('Tabs.List имеет role="tablist"', () => {
    const { container } = render(
      <UITabs value="a" onValueChange={() => {}}>
        <UITabs.List />
      </UITabs>,
    );
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument();
  });

  it('Panel имеет role="tabpanel" и data-name', () => {
    render(
      <UITabs value="a" onValueChange={() => {}}>
        <UITabs.Panel value="a">Panel</UITabs.Panel>
      </UITabs>,
    );
    const panel = screen.getByText('Panel');
    expect(panel.closest('[role="tabpanel"]')).toHaveAttribute('data-name', 'UITabPanel');
  });

  it('disabled Tab не реагирует на клик', () => {
    const onChange = vi.fn();
    render(
      <UITabs value="a" onValueChange={onChange}>
        <UITabs.List>
          <UITabs.Tab value="b" disabled>
            B
          </UITabs.Tab>
        </UITabs.List>
      </UITabs>,
    );
    fireEvent.click(screen.getByText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('пробрасывает ref на Tabs', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <UITabs ref={ref} value="a" onValueChange={() => {}} />,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
