import { ImageResponse } from 'next/og';

import { SITE } from '@/shared/config';
import { SITE_URL } from '@/shared/lib/seo';

/** Размер карточки для соцсетей (рекомендация Open Graph / Twitter). */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${SITE.nameLatin} — photographer, Omsk`;

const ACCENT = '#8b7bff';
const BACKGROUND = '#0a0a0b';
const FOREGROUND = '#ededed';
const MUTED = '#a1a1aa';

/**
 * OG-картинка страниц: генерируется на билде из разметки, а не хранится файлом,
 * поэтому не расходится с контентом сайта.
 *
 * Текст намеренно латиницей: `ImageResponse` рендерит встроенным шрифтом без
 * кириллического набора — на кириллице получились бы «тофу»-квадраты.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: `linear-gradient(135deg, ${BACKGROUND} 0%, #151b2e 100%)`,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '88px',
              height: '88px',
              borderRadius: '24px',
              background: ACCENT,
              color: BACKGROUND,
              fontSize: '40px',
              fontWeight: 700,
            }}
          >
            {'A.F'}
          </div>
          <div style={{ display: 'flex', color: MUTED, fontSize: '32px' }}>
            {SITE_URL.replace(/^https?:\/\//, '')}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: FOREGROUND,
              fontSize: '96px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE.nameLatin}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '16px',
              color: ACCENT,
              fontSize: '44px',
              fontWeight: 600,
            }}
          >
            photographer, Omsk
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '24px',
              color: MUTED,
              fontSize: '32px',
            }}
          >
            {SITE.brand}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
