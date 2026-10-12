import { getPhoto, PHOTOS } from '@/entities/photo';
import { MAX_PRICE, MIN_PRICE, SERVICES } from '@/entities/service';
import {
  buildImageGalleryJsonLd,
  buildJsonLdGraph,
  buildPersonJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  type IJsonLdImage,
} from '@/shared/lib/seo';
import { PORTRAIT } from '@/widgets/about-section';

const toImage = (photo: (typeof PHOTOS)[number]): IJsonLdImage => ({
  url: photo.src.src,
  caption: photo.alt,
  width: photo.src.width,
  height: photo.src.height,
});

/** Главный кадр страницы — фото hero. */
const HERO = toImage(getPhoto('night-bridge-01'));

/**
 * Structured data страницы — один граф: сайт, страница-профиль, Полина,
 * её услуга с тарифами и портфолио (кадры с автором и копирайтом). Данные
 * берутся из тех же конфигов, что и вёрстка, — разметка не расходится с
 * видимым содержимым.
 */
export const JSON_LD = buildJsonLdGraph([
  buildWebSiteJsonLd(),
  buildWebPageJsonLd(HERO),
  buildPersonJsonLd(PORTRAIT.src),
  buildServiceJsonLd(
    SERVICES.map((service) => ({ name: service.title, price: service.pricePerHour })),
    `${String(MIN_PRICE)}–${String(MAX_PRICE)} RUB`,
    ['/opengraph-image', HERO.url],
  ),
  buildImageGalleryJsonLd(PHOTOS.map(toImage)),
]);
