import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';

/**
 * Ресурсы для картинок из `next/og` (OG-карточка, apple-icon). Генерируются
 * на сборке (статические роуты), поэтому файлы читаются с диска.
 *
 * satori (движок `next/og`) не читает WOFF2 и WebP: шрифты — WOFF-копии
 * сабсетов сайта (`scripts/subset-fonts.py`), фото — через sharp в JPEG.
 *
 * Пути — литералами `join(process.cwd(), '…')`: так Turbopack трассирует
 * ровно эти файлы. Путь из переменной заставил бы его затянуть в серверный
 * бандл весь проект.
 */

/** Playfair Display 400 прямой и курсив — с кириллицей, в отличие от шрифта `next/og`. */
export const loadOgFonts = async () => {
  const [regular, italic] = await Promise.all([
    readFile(join(process.cwd(), 'src/shared/assets/fonts/playfair-display-400.woff')),
    readFile(join(process.cwd(), 'src/shared/assets/fonts/playfair-display-400-italic.woff')),
  ]);

  return [
    { name: 'Playfair Display', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Playfair Display', data: italic, weight: 400 as const, style: 'italic' as const },
  ];
};

/**
 * PNG из `ImageResponse` → JPEG. `next/og` отдаёт только PNG, а с фото
 * внутри карточка весит ~350 КБ: WhatsApp не показывает превью тяжелее
 * ~300 КБ, да и остальным мессенджерам грузить меньше.
 *
 * @param response - результат `new ImageResponse(...)`
 */
export const toJpegResponse = async (response: Response): Promise<Response> => {
  const png = Buffer.from(await response.arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 85, mozjpeg: true }).toBuffer();

  return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg' } });
};

/**
 * Кадр hero (ночной мост) как data URI в JPEG, обрезанный под размер.
 * sharp сам выбирает точку кадрирования по «интересности» (`attention`).
 *
 * @param width - ширина, px
 * @param height - высота, px
 */
export const loadHeroPhotoDataUri = async (width: number, height: number): Promise<string> => {
  const jpeg = await sharp(join(process.cwd(), 'src/entities/photo/assets/night-bridge-01.webp'))
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
};
