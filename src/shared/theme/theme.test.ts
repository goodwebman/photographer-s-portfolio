/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { THEME_SCRIPT, themeBoot } from './theme-script';
import { applyTheme, readTheme, subscribeTheme } from './theme-store';
import { THEME_STORAGE_KEY } from './types';

afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
  document.cookie = `${THEME_STORAGE_KEY}=;path=/;max-age=0`;
});

describe('themeBoot', () => {
  it('ставит тему из cookie на <html>', () => {
    document.cookie = `${THEME_STORAGE_KEY}=light;path=/`;
    themeBoot(THEME_STORAGE_KEY);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('без cookie и с мусором в cookie — атрибут не трогает', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.cookie = `${THEME_STORAGE_KEY}=purple;path=/`;
    themeBoot(THEME_STORAGE_KEY);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('THEME_SCRIPT — самодостаточный валидный JS', () => {
    document.cookie = `${THEME_STORAGE_KEY}=light;path=/`;
    // ровно то, что уйдёт в inline-скрипт
    new Function(THEME_SCRIPT)();

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});

describe('theme-store', () => {
  it('applyTheme: атрибут, cookie и синхронное оповещение подписчиков', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeTheme(listener);

    applyTheme('light');

    expect(readTheme()).toBe('light');
    expect(document.cookie).toContain(`${THEME_STORAGE_KEY}=light`);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    applyTheme('dark');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('readTheme: всё, кроме light, — тёмная тема по умолчанию', () => {
    expect(readTheme()).toBe('dark');
  });
});
