'use client';

import type { FC, ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import type { Theme } from '@/shared/theme';

/**
 * Служебные блоки страницы Foundations в Storybook (не часть публичного API
 * `shared/ui`). Значения токенов читаются из CSS (`getComputedStyle`), а не
 * дублируются здесь — витрина не может разойтись с `globals.css`.
 */

/** Группы токенов палитры в порядке показа. */
export const TOKEN_GROUPS: readonly {
  readonly title: string;
  readonly tokens: readonly string[];
}[] = [
  {
    title: 'Поверхности',
    tokens: ['background', 'card', 'popover', 'muted', 'paper', 'accent'],
  },
  {
    title: 'Текст',
    tokens: ['foreground', 'muted-foreground', 'brand-emphasis', 'accent-foreground'],
  },
  {
    title: 'Действия и бренд',
    tokens: ['primary', 'primary-foreground', 'secondary', 'brand', 'brand-foreground', 'ring'],
  },
  { title: 'Линии', tokens: ['border', 'input'] },
  {
    title: 'Статусы (из кита)',
    tokens: ['destructive', 'success', 'warning', 'info'],
  },
];

/** Пары «текст / фон», для которых считается контраст. */
export const CONTRAST_PAIRS: readonly (readonly [string, string])[] = [
  ['foreground', 'background'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'card'],
  ['muted-foreground', 'muted'],
  ['muted-foreground', 'paper'],
  ['primary-foreground', 'primary'],
  ['brand-foreground', 'brand'],
  ['brand-emphasis', 'background'],
  ['brand-emphasis', 'card'],
  ['brand-emphasis', 'muted'],
  ['brand-emphasis', 'paper'],
];

const parseHex = (value: string): readonly [number, number, number] | null => {
  const match = /^#([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return null;
  const hex = match[1];

  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as unknown as readonly [
    number,
    number,
    number,
  ];
};

const luminance = ([r, g, b]: readonly [number, number, number]): number => {
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

/** WCAG-контраст двух hex-цветов или `null`, если формат не hex. */
export const contrastRatio = (fg: string, bg: string): number | null => {
  const a = parseHex(fg);
  const b = parseHex(bg);
  if (!a || !b) return null;
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);

  return (hi + 0.05) / (lo + 0.05);
};

/** Читает значения CSS-переменных токенов в контексте элемента. */
const useTokenValues = (tokens: readonly string[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const key = tokens.join('|');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const style = getComputedStyle(el);
    setValues(
      Object.fromEntries(
        key.split('|').map((token) => [token, style.getPropertyValue(`--${token}`).trim()]),
      ),
    );
  }, [key]);

  return { ref, values };
};

const ThemePanel: FC<{ readonly theme: Theme; readonly title: string; readonly children: ReactNode }> = ({
  theme,
  title,
  children,
}) => (
  <section
    data-theme={theme}
    className="flex flex-col gap-8 bg-background p-6 font-sans text-foreground sm:p-10"
  >
    <header className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
      <h2 className="font-serif text-h2">{title}</h2>
      <span className="text-eyebrow uppercase text-muted-foreground">data-theme=&quot;{theme}&quot;</span>
    </header>
    {children}
  </section>
);

const Swatch: FC<{ readonly token: string; readonly value: string }> = ({ token, value }) => (
  <div className="flex items-center gap-3">
    <span
      className="size-12 shrink-0 border border-border"
      style={{ backgroundColor: `var(--${token})` }}
    />
    <span className="flex min-w-0 flex-col">
      <span className="text-small font-medium">{token}</span>
      <span className="truncate font-mono text-caption text-muted-foreground">{value || '—'}</span>
    </span>
  </div>
);

const PalettePanel: FC<{ readonly theme: Theme; readonly title: string }> = ({ theme, title }) => {
  const all = [...new Set(TOKEN_GROUPS.flatMap((group) => group.tokens))];
  const { ref, values } = useTokenValues(all);

  return (
    <ThemePanel theme={theme} title={title}>
      <div ref={ref} className="flex flex-col gap-8">
        {TOKEN_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <h3 className="text-eyebrow uppercase text-muted-foreground">{group.title}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.tokens.map((token) => (
                <Swatch key={token} token={token} value={values[token] ?? ''} />
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <h3 className="text-eyebrow uppercase text-muted-foreground">Контраст (WCAG)</h3>
          <ul className="flex flex-col">
            {CONTRAST_PAIRS.map(([fg, bg]) => {
              const ratio = contrastRatio(values[fg] ?? '', values[bg] ?? '');
              const pass = ratio !== null && ratio >= 4.5;

              return (
                <li
                  key={`${fg}/${bg}`}
                  className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0"
                >
                  <span
                    className="px-2 py-1 text-small"
                    style={{ color: `var(--${fg})`, backgroundColor: `var(--${bg})` }}
                  >
                    {fg} / {bg}
                  </span>
                  <span className="font-mono text-caption tabular-nums">
                    {ratio === null ? '—' : `${ratio.toFixed(2)}:1`}{' '}
                    <span className={pass ? 'text-success-emphasis' : 'text-destructive-emphasis'}>
                      {pass ? 'AA' : '< AA'}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ThemePanel>
  );
};

/** Палитра «День» и «Ночь» рядом — независимо от темы в тулбаре. */
export const PaletteBoard: FC = () => (
  <div className="grid lg:grid-cols-2">
    <PalettePanel theme="light" title="День" />
    <PalettePanel theme="dark" title="Ночь" />
  </div>
);

/** Обе темы рядом для произвольного содержимого (превью компонентов кита). */
export const ThemesSideBySide: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <div className="grid lg:grid-cols-2">
    <ThemePanel theme="light" title="День">
      {children}
    </ThemePanel>
    <ThemePanel theme="dark" title="Ночь">
      {children}
    </ThemePanel>
  </div>
);

/** Строка типографической шкалы: имя токена, параметры, образец. */
export const TypeRow: FC<{
  readonly token: string;
  readonly spec: string;
  readonly children: ReactNode;
}> = ({ token, spec, children }) => (
  <div className="grid gap-2 border-b border-border py-6 md:grid-cols-[12rem_1fr] md:gap-8">
    <div className="flex flex-col gap-1">
      <span className="text-small font-medium">{token}</span>
      <span className="font-mono text-caption text-muted-foreground">{spec}</span>
    </div>
    <div className="min-w-0">{children}</div>
  </div>
);
