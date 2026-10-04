/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UICard } from '.';

afterEach(() => {
  cleanup();
});

describe('UICard', () => {
  it('имеет data-name', () => {
    const { container } = render(<UICard />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UICard');
  });

  it('рендерит children', () => {
    render(<UICard>Content</UICard>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UICard ref={ref}>Card</UICard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('testId в data-name', () => {
    const { container } = render(<UICard testId="profile" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UICard-profile');
  });
});

describe('UICard.Header', () => {
  it('рендерит и имеет data-name', () => {
    const { container } = render(<UICard.Header />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UICardHeader');
  });
});

describe('UICard.Title', () => {
  it('рендерит h3', () => {
    render(<UICard.Title>Title</UICard.Title>);
    const el = screen.getByText('Title');
    expect(el.tagName).toBe('H3');
    expect(el).toHaveAttribute('data-name', 'UICardTitle');
  });
});

describe('UICard.Description', () => {
  it('рендерит p', () => {
    render(<UICard.Description>Desc</UICard.Description>);
    const el = screen.getByText('Desc');
    expect(el.tagName).toBe('P');
    expect(el).toHaveAttribute('data-name', 'UICardDescription');
  });
});

describe('UICard.Content', () => {
  it('рендерит div', () => {
    const { container } = render(<UICard.Content />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UICardContent');
  });
});

describe('UICard.Footer', () => {
  it('рендерит div', () => {
    const { container } = render(<UICard.Footer />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UICardFooter');
  });
});
