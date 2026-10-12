import { ImageResponse } from 'next/og';

import { loadOgFonts } from './_og/assets';

/** Иконка «на экран Домой» в iOS; её же берут как PNG-фавикон Яндекс и мессенджеры. */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Палитра «Ночи» — как у `icon.svg`. */
const BACKGROUND = '#100f0d';
const FOREGROUND = '#eee7db';
const BRAND = '#d9895c';

/**
 * PNG-версия `icon.svg`: курсивная «a» и терракотовая точка. Safari не
 * берёт SVG для apple-touch-icon, поэтому отдельный растр.
 */
export default async function AppleIcon() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BACKGROUND,
          fontFamily: 'Playfair Display',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: FOREGROUND,
            fontSize: '128px',
            fontStyle: 'italic',
            lineHeight: 1,
            marginTop: '-18px',
          }}
        >
          a
        </div>
        <div
          style={{
            display: 'flex',
            width: '18px',
            height: '18px',
            marginLeft: '6px',
            marginTop: '48px',
            borderRadius: '9999px',
            background: BRAND,
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
