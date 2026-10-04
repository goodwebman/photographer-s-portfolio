/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UIDialog } from '.';

afterEach(() => {
  cleanup();
});

describe('UIDialog', () => {
  it('не рендерит контент при open=false', () => {
    render(
      <UIDialog open={false} onOpenChange={() => {}}>
        <UIDialog.Content>Content</UIDialog.Content>
      </UIDialog>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('рендерит контент при open=true', () => {
    render(
      <UIDialog open onOpenChange={() => {}}>
        <UIDialog.Content>Content</UIDialog.Content>
      </UIDialog>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('вызывает onOpenChange(false) при клике на Close', () => {
    const onChange = vi.fn();
    render(
      <UIDialog open onOpenChange={onChange}>
        <UIDialog.Content>
          <UIDialog.Close data-testid="close" />
        </UIDialog.Content>
      </UIDialog>,
    );
    fireEvent.click(screen.getByTestId('close'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('рендерит Title и Description', () => {
    render(
      <UIDialog open onOpenChange={() => {}}>
        <UIDialog.Content>
          <UIDialog.Title>Title</UIDialog.Title>
          <UIDialog.Description>Desc</UIDialog.Description>
        </UIDialog.Content>
      </UIDialog>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('Content имеет role="dialog" и aria-modal', () => {
    render(
      <UIDialog open onOpenChange={() => {}}>
        <UIDialog.Content>Content</UIDialog.Content>
      </UIDialog>,
    );
    const panel = screen.getByRole('dialog');
    expect(panel).toHaveAttribute('aria-modal', 'true');
    expect(panel).toHaveAttribute('data-name', 'UIDialogPanel');
  });
});
