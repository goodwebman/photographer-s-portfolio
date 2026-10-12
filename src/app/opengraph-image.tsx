import { ImageResponse } from 'next/og';

import { COPY, SITE } from '@/shared/config';

import { loadHeroPhotoDataUri, loadOgFonts, toJpegResponse } from './_og/assets';

/** Размер карточки для соцсетей (рекомендация Open Graph / Twitter). */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/jpeg';
export const alt = COPY.meta.title;

/** Палитра «Ночи» из `globals.css`. */
const BACKGROUND = '#100f0d';
const FOREGROUND = '#eee7db';
const MUTED = '#a59c8e';
const BRAND = '#d9895c';
const BORDER = '#2f2b25';

/** Ширина кадра справа — тот же, что в hero (ночной мост). */
const PHOTO_WIDTH = 420;

/**
 * OG-картинка: генерируется на сборке из разметки, а не хранится файлом.
 * Слева имя и подпись на кириллице (Playfair из сабсетов сайта), справа —
 * кадр из hero: карточка в ленте мессенджера сразу показывает, что это
 * фотограф, а не просто текст. Отдаётся JPEG (~в 4 раза легче PNG с фото).
 */
export default async function OpengraphImage() {
  const [fonts, photo] = await Promise.all([
    loadOgFonts(),
    loadHeroPhotoDataUri(PHOTO_WIDTH, size.height),
  ]);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: BACKGROUND,
          fontFamily: 'Playfair Display',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 64px 56px 72px',
            borderBottom: `12px solid ${BRAND}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: MUTED,
              fontSize: '24px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'flex', width: '48px', height: '2px', background: BRAND }} />
            {COPY.hero.eyebrow}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                color: FOREGROUND,
                fontSize: '88px',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              {SITE.name}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '28px',
                paddingTop: '28px',
                borderTop: `1px solid ${BORDER}`,
                flexWrap: 'wrap',
                columnGap: '0.28em',
                color: FOREGROUND,
                fontSize: '34px',
                lineHeight: 1.3,
              }}
            >
              {/* satori раскладывает текст и <span> вперемешку внахлёст — каждый кусок отдельным span */}
              <span>Качественные, эстетичные и</span>
              <span style={{ color: BRAND, fontStyle: 'italic' }}>живые</span>
              <span>снимки</span>
            </div>
          </div>

          <div style={{ display: 'flex', color: MUTED, fontSize: '26px', fontStyle: 'italic' }}>
            {SITE.brand}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- satori рендерит только <img> */}
        <img
          src={photo}
          alt=""
          width={PHOTO_WIDTH}
          height={size.height}
          style={{ width: `${String(PHOTO_WIDTH)}px`, height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size, fonts },
  );

  return toJpegResponse(image);
}
