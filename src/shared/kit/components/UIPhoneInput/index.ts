import { UIPhoneInputRoot } from './UIPhoneInputRoot';
import { UIPhoneInputCountry } from './UIPhoneInputCountry';
import { UIPhoneInputNumber } from './UIPhoneInputNumber';

/**
 * Compound-инпут телефона: селектор кода страны + поле номера.
 * Маска зависит от страны (см. `PHONE_COUNTRIES`), автоматически применяется к вводу.
 * Пустой ввод не считается ошибкой; частично заполненная маска подсвечивается на blur.
 *
 * @example
 * <UIPhoneInput value={{ dial: '+7', number: '' }} onChange={setValue} />
 */
export const UIPhoneInput = Object.assign(UIPhoneInputRoot, {
  Country: UIPhoneInputCountry,
  Number: UIPhoneInputNumber,
});

export type { IUIPhoneInputProps } from './UIPhoneInputRoot';
export type { PhoneValue, PhoneCountry } from './phone-context';
export {
  PHONE_COUNTRIES,
  applyMask,
  isMaskFilled,
  maskDigitCount,
  onlyDigits,
} from './phone-context';
