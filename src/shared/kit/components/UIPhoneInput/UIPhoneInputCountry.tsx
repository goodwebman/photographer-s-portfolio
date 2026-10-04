'use client';

import { forwardRef, memo, useEffect, useId, useMemo, useRef, useState } from 'react';

// autoFocus на search-поле оправдан (внутри popup-поиска, всегда под рукой)
/* eslint-disable jsx-a11y/no-autofocus */
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';
import { PHONE_COUNTRIES, usePhoneContext } from './phone-context';

/**
 * Селектор кода страны: кнопка-триггер (флаг + dial) + выпадающий список.
 * Поиск по названию/коду внутри dropdown. Закрытие по клику вне (подписка на document).
 */
const UIPhoneInputCountryBase = forwardRef<HTMLButtonElement, { readonly className?: string }>(
  ({ className }, ref) => {
    const { dial, setDial, disabled, invalid, country } = usePhoneContext();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const listboxId = useId();
    const wrapRef = useRef<HTMLDivElement>(null);

    const current = country;

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return PHONE_COUNTRIES;
      return PHONE_COUNTRIES.filter(
        (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q),
      );
    }, [query]);

    // close-on-outside: подписка на document — легитимный случай внешней системы
    useEffect(() => {
      if (!open) return;
      const onDocClick = (e: MouseEvent) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('mousedown', onDocClick);
      return () => { document.removeEventListener('mousedown', onDocClick); };
    }, [open]);

    const choose = (d: string) => {
      setDial(d);
      setOpen(false);
      setQuery('');
    };

    return (
      <div ref={wrapRef} className="relative shrink-0">
        <button
          ref={ref}
          type="button"
          data-name="UIPhoneInputCountry"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          // ссылка только пока список в DOM — иначе aria-controls указывает в пустоту
          aria-controls={open ? listboxId : undefined}
          data-invalid={invalid || undefined}
          onClick={() => { setOpen((o) => !o); }}
          className={cn(
            'flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-input bg-card px-3 text-sm shadow-sm transition-[border-color,box-shadow]',
            'hover:border-ring/50 focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:outline-none',
            'data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive/30 data-[invalid=true]:focus-visible:ring-destructive/40',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        >
          <span className="text-base leading-none">{current.flag}</span>
          <span className="font-medium tabular-nums">{current.dial}</span>
          <UIIcons.ChevronDown
            className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')}
          />
        </button>

        {open && (
          <div className="absolute left-0 z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
            {/* поле поиска — вне listbox: тот допускает только option/group в потомках */}
            <input
              autoFocus
              type="search"
              value={query}
              aria-label="Поиск страны"
              onChange={(e) => { setQuery(e.target.value); }}
              placeholder="Поиск страны…"
              className="mb-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {filtered.length === 0 && (
              <p className="px-2 py-3 text-center text-sm text-muted-foreground">Не найдено</p>
            )}
            <div id={listboxId} role="listbox" aria-label="Код страны" className="max-h-56 overflow-y-auto">
              {filtered.map((c) => (
                <button
                  key={`${c.code}-${c.dial}`}
                  type="button"
                  role="option"
                  aria-selected={c.dial === dial}
                  onClick={() => { choose(c.dial); }}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    c.dial === dial ? 'bg-accent text-accent-foreground' : 'hover:bg-muted',
                  )}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="tabular-nums text-muted-foreground">{c.dial}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
UIPhoneInputCountryBase.displayName = 'UIPhoneInput.Country';

export const UIPhoneInputCountry = memo(UIPhoneInputCountryBase);
