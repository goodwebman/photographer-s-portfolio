'use client';

import { createContext, useContext } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PhoneValue {
  /** Код страны, напр. '+7' */
  dial: string;
  /** Номер без кода — только цифры или уже отформатированный по маске */
  number: string;
}

export interface PhoneCountry {
  readonly code: string;
  readonly dial: string;
  readonly flag: string;
  readonly name: string;
  /**
   * Маска в стиле `# ### ### ## ##`, где `#` — обязательная цифра, остальное — литералы.
   * Кол-во `#` определяет требуемую длину номера без кода.
   */
  readonly mask: string;
}

// ─── Список кодов с масками ───────────────────────────────────────────────────
// Маски покрывают самые массовые форматы; для полноценной e164-валидации возьми libphonenumber-js.
export const PHONE_COUNTRIES: readonly PhoneCountry[] = [
  { code: 'RU', dial: '+7',   flag: '🇷🇺', name: 'Россия',           mask: '### ###-##-##' },
  { code: 'KZ', dial: '+7',   flag: '🇰🇿', name: 'Казахстан',        mask: '### ###-##-##' },
  { code: 'US', dial: '+1',   flag: '🇺🇸', name: 'США',              mask: '(###) ###-####' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧', name: 'Великобритания',   mask: '#### ######' },
  { code: 'DE', dial: '+49',  flag: '🇩🇪', name: 'Германия',         mask: '### #######' },
  { code: 'FR', dial: '+33',  flag: '🇫🇷', name: 'Франция',          mask: '# ## ## ## ##' },
  { code: 'ES', dial: '+34',  flag: '🇪🇸', name: 'Испания',          mask: '### ### ###' },
  { code: 'IT', dial: '+39',  flag: '🇮🇹', name: 'Италия',           mask: '### #######' },
  { code: 'PL', dial: '+48',  flag: '🇵🇱', name: 'Польша',           mask: '### ### ###' },
  { code: 'UA', dial: '+380', flag: '🇺🇦', name: 'Украина',          mask: '## ### ## ##' },
  { code: 'BY', dial: '+375', flag: '🇧🇾', name: 'Беларусь',         mask: '## ###-##-##' },
  { code: 'TR', dial: '+90',  flag: '🇹🇷', name: 'Турция',           mask: '### ### ## ##' },
  { code: 'CN', dial: '+86',  flag: '🇨🇳', name: 'Китай',            mask: '### #### ####' },
  { code: 'IN', dial: '+91',  flag: '🇮🇳', name: 'Индия',            mask: '##### #####' },
  { code: 'JP', dial: '+81',  flag: '🇯🇵', name: 'Япония',           mask: '## #### ####' },
  { code: 'BR', dial: '+55',  flag: '🇧🇷', name: 'Бразилия',         mask: '(##) #####-####' },
];

// ─── Утилиты маски ────────────────────────────────────────────────────────────

/** Количество обязательных цифр в маске. */
export const maskDigitCount = (mask: string): number => (mask.match(/#/g) ?? []).length;

/** Оставляет только цифры. */
export const onlyDigits = (raw: string): string => raw.replace(/\D/g, '');

/**
 * Применяет маску: `#` — позиция цифры, все прочие символы вставляются как литералы.
 * Обрезает вход по количеству `#` в маске. Не тянет лишних литералов, если пользователь ещё не дописал.
 */
export function applyMask(raw: string, mask: string): string {
  const digits = onlyDigits(raw);
  if (!mask) return digits;

  let out = '';
  let di = 0;
  for (let i = 0; i < mask.length && di < digits.length; i++) {
    const m = mask[i];
    if (m === '#') {
      out += digits[di];
      di++;
    } else {
      out += m;
    }
  }
  return out;
}

/** Полностью ли заполнена маска (все `#` покрыты цифрами). */
export const isMaskFilled = (value: string, mask: string): boolean =>
  onlyDigits(value).length === maskDigitCount(mask);

// ─── Context ──────────────────────────────────────────────────────────────────

export interface PhoneContextValue {
  readonly dial: string;
  readonly setDial: (dial: string) => void;
  readonly number: string;
  readonly setNumber: (number: string) => void;
  readonly country: PhoneCountry;
  readonly disabled: boolean;
  readonly errorId?: string;
  readonly invalid: boolean;
}

export const PhoneContext = createContext<PhoneContextValue | null>(null);

export function usePhoneContext(): PhoneContextValue {
  const ctx = useContext(PhoneContext);
  if (!ctx) throw new Error('UIPhoneInput sub-components must be used inside <UIPhoneInput>');
  return ctx;
}
