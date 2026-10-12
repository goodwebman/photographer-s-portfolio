import { describe, expect, it } from 'vitest';

import { filterPhotos, getPhoto, PHOTO_CATEGORIES, PHOTOS } from './photos';

describe('photos', () => {
  it('в портфолио все 13 работ, id уникальны', () => {
    expect(PHOTOS).toHaveLength(13);
    expect(new Set(PHOTOS.map((photo) => photo.id)).size).toBe(PHOTOS.length);
  });

  it('у каждого кадра есть alt и жанр из списка вкладок', () => {
    const categories = new Set(PHOTO_CATEGORIES.map((item) => item.id));

    for (const photo of PHOTOS) {
      expect(photo.alt.length).toBeGreaterThan(10);
      expect(categories.has(photo.category)).toBe(true);
    }
  });

  it('у каждого жанра есть хотя бы один кадр — пустых вкладок нет', () => {
    for (const { id } of PHOTO_CATEGORIES) {
      expect(filterPhotos(id).length).toBeGreaterThan(0);
    }
  });

  it('filterPhotos("all") отдаёт всё в исходном порядке', () => {
    expect(filterPhotos('all')).toEqual(PHOTOS);
  });

  it('getPhoto бросает на неизвестный id', () => {
    expect(getPhoto('kids-01').category).toBe('kids');
    expect(() => getPhoto('nope')).toThrow(/nope/);
  });
});
