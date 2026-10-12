'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

/** Секретная фраза — вводится подряд с клавиатуры, регистр не важен. */
const SECRET_PHRASE = 'ПИПИДАСТР'.toLowerCase();

/** Сколько секунд держать пасхалку на экране. */
const DISPLAY_SECONDS = 10;

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName);
};

/**
 * Пасхалка: набор фразы «ПИПИДАСТР» с клавиатуры показывает фото
 * и проигрывает звук на {@link DISPLAY_SECONDS} секунд. Буфер ввода хранится
 * в ref — не триггерит ре-рендеры на каждое нажатие клавиши.
 */
export const EasterEgg: FC = () => {
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const hideTimerRef = useRef<number>(undefined);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || event.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + event.key.toLowerCase()).slice(
        -SECRET_PHRASE.length,
      );

      if (bufferRef.current !== SECRET_PHRASE) return;
      bufferRef.current = '';

      // Срабатывает на каждое совпадение, даже пока пасхалка уже показана:
      // перезапускаем звук и таймер вместо того, чтобы полагаться на смену
      // состояния `active` (она не произойдёт, если оно уже true).
      setActive(true);
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => setActive(false), DISPLAY_SECONDS * 1000);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Всегда смонтирован: play() в обработчике клавиш должен находить узел
          сразу на первом срабатывании, до ре-рендера оверлея. */}
      <audio ref={audioRef} src="/easter-egg/arbuzik.mp3" className="hidden" />
      {active && (
        <div
          role="presentation"
          onClick={() => setActive(false)}
          className="fixed inset-0 z-9999 flex cursor-pointer items-center justify-center bg-black/90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- одноразовая пасхалка, next/image тут избыточен */}
          <img
            src="/easter-egg/arbuzik.jpg"
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
};
