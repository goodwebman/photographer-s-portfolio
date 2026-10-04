/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { UIToast, useToast } from '.';
import { UIButton } from '../UIButton/UIButton';

afterEach(() => { cleanup(); });

function TestHarness() {
  const { addToast } = useToast();
  return (
    <UIButton onClick={() => { addToast('Hello'); }}>
      Show Toast
    </UIButton>
  );
}

describe('UIToast', () => {
  it('рендерит Provider и добавляет toast', async () => {
    render(
      <UIToast>
        <TestHarness />
      </UIToast>,
    );
    screen.getByText('Show Toast').click();
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('toast имеет role="alert"', async () => {
    render(
      <UIToast>
        <TestHarness />
      </UIToast>,
    );
    screen.getByText('Show Toast').click();
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
