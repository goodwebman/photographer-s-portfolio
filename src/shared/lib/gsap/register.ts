import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Регистрирует плагины GSAP (ScrollTrigger) один раз, только в браузере.
 * Вызывать внутри `useGSAP` / клиентского эффекта.
 *
 * @returns инстанс gsap
 */
export const registerGsap = (): typeof gsap => {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return gsap;
};

export { gsap, ScrollTrigger };
