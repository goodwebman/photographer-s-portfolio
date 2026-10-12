/**
 * # Scroll-reveal без JS-рантайма анимаций
 *
 * Раньше ревилы были на motion: SSR-разметка приходила с `opacity:0` в
 * инлайн-стилях, и контент оставался невидимым, пока не загрузится ~40 КБ
 * motion и не пройдёт гидратация. Теперь:
 *
 * - разметка — серверная: элемент помечен `data-reveal="fade" | "pieces"`,
 *   задержка и сдвиг — CSS-переменные (`--reveal-delay`, `--reveal-y`);
 * - анимация — CSS (`globals.css`, блок REVEAL);
 * - этот скрипт инлайнится в `<head>` и ставит `data-revealed`, когда элемент
 *   въезжает во вьюпорт. Новые элементы (React дорисовал плитки после смены
 *   фильтра) подхватывает `MutationObserver`.
 *
 * Прятать контент CSS начинает только после `data-reveal-ready` на `<html>`,
 * который скрипт ставит последним. Без JS, при ошибке в скрипте и при
 * `prefers-reduced-motion` контент виден сразу — краулеры без JS видят всё.
 *
 * Функция сериализуется через `toString()`: без замыканий и импортов.
 */
export function revealBoot(): void {
  const root = document.documentElement;
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  // Порог — доля самого элемента, а не отступ вьюпорта: с `rootMargin -10%`
  // (как было у motion) мелкий элемент у нижнего края первого экрана — CTA
  // hero на 1440×900 — не считался видимым и оставался прозрачным.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 },
  );

  const watch = (node: Node): void => {
    if (!(node instanceof Element)) return;
    if (node.hasAttribute('data-reveal')) observer.observe(node);
    node.querySelectorAll('[data-reveal]').forEach((element) => {
      observer.observe(element);
    });
  };

  new MutationObserver((records) => {
    for (const record of records) record.addedNodes.forEach(watch);
  }).observe(root, { childList: true, subtree: true });
  watch(root);

  root.setAttribute('data-reveal-ready', '');
}

/** Готовый inline-скрипт ревилов. */
export const REVEAL_SCRIPT = `(${revealBoot.toString()})();`;
