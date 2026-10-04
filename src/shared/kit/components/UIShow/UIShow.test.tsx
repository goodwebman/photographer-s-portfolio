/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Show, Hide } from './UIShow';

afterEach(() => {
  cleanup();
});

describe('Show', () => {
  it('рендерит children при when=true', () => {
    render(<Show when={true}><span data-testid="child">Visible</span></Show>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('НЕ рендерит children при when=false', () => {
    render(<Show when={false}><span data-testid="child">Hidden</span></Show>);
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('рендерит fallback при when=false', () => {
    render(<Show when={false} fallback={<span data-testid="fb">Fallback</span>}><span>Content</span></Show>);
    expect(screen.getByTestId('fb')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});

describe('Hide', () => {
  it('рендерит children при when=false', () => {
    render(<Hide when={false}><span data-testid="child">Visible</span></Hide>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('НЕ рендерит children при when=true', () => {
    render(<Hide when={true}><span data-testid="child">Hidden</span></Hide>);
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('рендерит fallback при when=true', () => {
    render(<Hide when={true} fallback={<span data-testid="fb">Fallback</span>}><span>Content</span></Hide>);
    expect(screen.getByTestId('fb')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
