/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { Show } from './show';

afterEach(() => {
  cleanup();
});

describe('Show', () => {
  it('рендерит children при when=true', () => {
    render(
      <Show when fallback={<span>fb</span>}>
        <span>children</span>
      </Show>,
    );
    expect(screen.getByText('children')).toBeInTheDocument();
    expect(screen.queryByText('fb')).toBeNull();
  });

  it('рендерит fallback при when=false', () => {
    render(
      <Show when={false} fallback={<span>fb</span>}>
        <span>children</span>
      </Show>,
    );
    expect(screen.getByText('fb')).toBeInTheDocument();
    expect(screen.queryByText('children')).toBeNull();
  });

  it('без fallback при when=false ничего не рендерит', () => {
    const { container } = render(
      <Show when={false}>
        <span>children</span>
      </Show>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
