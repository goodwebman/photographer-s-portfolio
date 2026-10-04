import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('разрешает конфликты стоковых утилит — побеждает последняя', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('кастомная типографика не считается цветом и переживает склейку', () => {
    // Регрессия: без регистрации шкалы в tailwind-merge `text-small` попадал в
    // группу text-color и молча вычёркивался цветом — размер терялся.
    expect(cn('text-small font-medium', 'text-brand-emphasis')).toBe(
      'text-small font-medium text-brand-emphasis',
    );
    expect(cn('text-eyebrow uppercase', 'text-brand-foreground')).toBe(
      'text-eyebrow uppercase text-brand-foreground',
    );
    expect(cn('text-caption', 'text-muted-foreground')).toBe(
      'text-caption text-muted-foreground',
    );
  });

  it('размеры кастомной шкалы конфликтуют между собой', () => {
    expect(cn('text-small', 'text-caption')).toBe('text-caption');
    expect(cn('text-h2', 'text-h1')).toBe('text-h1');
    expect(cn('text-display', 'text-hero')).toBe('text-hero');
  });

  it('классы кита переопределяются className потребителя', () => {
    // Китовые компоненты склеивают классы через этот же cn: переданный снаружи
    // className должен перебивать базовые утилиты (радиус, фон, размер шрифта).
    expect(cn('rounded-xl bg-card text-sm', 'rounded-none bg-transparent text-caption')).toBe(
      'rounded-none bg-transparent text-caption',
    );
  });

  it('кастомные радиусы конфликтуют со стоковыми', () => {
    expect(cn('rounded-md', 'rounded-pill')).toBe('rounded-pill');
    expect(cn('rounded-pill', 'rounded-none')).toBe('rounded-none');
  });

  it('условные и falsy-значения отбрасываются', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });
});
