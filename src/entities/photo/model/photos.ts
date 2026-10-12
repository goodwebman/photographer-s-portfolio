import gingerFirst from '../assets/ginger-01.webp';
import gingerSecond from '../assets/ginger-02.webp';
import gingerThird from '../assets/ginger-03.webp';
import goldenHourFirst from '../assets/golden-hour-01.webp';
import goldenHourSecond from '../assets/golden-hour-02.webp';
import goldenHourThird from '../assets/golden-hour-03.webp';
import kidsFirst from '../assets/kids-01.webp';
import kidsSecond from '../assets/kids-02.webp';
import loveStoryFirst from '../assets/love-story-01.webp';
import loveStorySecond from '../assets/love-story-02.webp';
import nightBridgeFirst from '../assets/night-bridge-01.webp';
import nightBridgeSecond from '../assets/night-bridge-02.webp';
import nightBridgeThird from '../assets/night-bridge-03.webp';

import type { IPhoto, IPhotoCategory, PhotoCategory } from './types';

/** Жанры в порядке вкладок фильтра. */
export const PHOTO_CATEGORIES: readonly IPhotoCategory[] = [
  { id: 'portrait', label: 'Портрет' },
  { id: 'city', label: 'Ночной город' },
  { id: 'love-story', label: 'Love story' },
  { id: 'kids', label: 'Детская' },
];

/**
 * Все работы в порядке показа в портфолио. Порядок подобран вручную:
 * тёплые дневные кадры чередуются с ночными, чтобы в masonry-колонках не
 * собирались «пятна» одного настроения.
 */
export const PHOTOS: readonly IPhoto[] = [
  {
    id: 'ginger-01',
    src: gingerFirst,
    category: 'portrait',
    alt: 'Рыжеволосая девушка в белой рубашке оглядывается через плечо на фоне старинной часовни',
  },
  {
    id: 'night-bridge-02',
    src: nightBridgeSecond,
    category: 'city',
    alt: 'Девушка в чёрном облокотилась на ограждение моста, за ней огни ночной трассы',
  },
  {
    id: 'golden-hour-02',
    src: goldenHourSecond,
    category: 'portrait',
    alt: 'Смеющаяся девушка в сером жилете и кожаной куртке, солнечный портрет крупным планом',
  },
  {
    id: 'love-story-02',
    src: loveStorySecond,
    category: 'love-story',
    alt: 'Ночная съёмка пары: рыжеволосая девушка смеётся, закрывая ладонями лицо парня',
  },
  {
    id: 'kids-02',
    src: kidsSecond,
    category: 'kids',
    alt: 'Девочка в розовой повязке и кожаной куртке дурачится, держась за фонарный столб на солнечной улице',
  },
  {
    id: 'ginger-03',
    src: gingerThird,
    category: 'portrait',
    alt: 'Портрет рыжеволосой девушки с пирсингом и цепочками на фоне ночного города',
    focal: '50% 30%',
  },
  {
    id: 'golden-hour-01',
    src: goldenHourFirst,
    category: 'portrait',
    alt: 'Девушка с хвостом сидит на парапете у зелёного склона и смотрит в сторону, освещённая солнцем',
  },
  {
    id: 'night-bridge-01',
    src: nightBridgeFirst,
    category: 'city',
    alt: 'Девушка в чёрной кожаной куртке оглядывается через плечо на ночном мосту, вдоль перил тянется линия фонарей',
  },
  {
    id: 'love-story-01',
    src: loveStoryFirst,
    category: 'love-story',
    alt: 'Пара на закате: парень нежно держит лицо рыжеволосой девушки, она улыбается с закрытыми глазами',
  },
  {
    id: 'night-bridge-03',
    src: nightBridgeThird,
    category: 'city',
    alt: 'Девушка с длинными волосами в кожаной куртке поправляет волосы на вечерней улице',
    focal: '50% 35%',
  },
  {
    id: 'kids-01',
    src: kidsFirst,
    category: 'kids',
    alt: 'Девочка в розовой повязке широко улыбается, сидя на скамейке под деревом',
  },
  {
    id: 'ginger-02',
    src: gingerSecond,
    category: 'portrait',
    alt: 'Девушка с рыжими волосами, собранными в пучок, смотрит вниз, за ней вечерняя дорога с фонарями',
    focal: '50% 35%',
  },
  {
    id: 'golden-hour-03',
    src: goldenHourThird,
    category: 'portrait',
    alt: 'Девушка в коричневой кожаной куртке на скамейке в парке поправляет волосы в контровом свете',
  },
];

/**
 * # Кадр по id
 * Бросает на неизвестный id: опечатка в id роли (hero, полоса, контакты)
 * должна падать на сборке, а не тихо рендерить пустоту.
 */
export const getPhoto = (id: string): IPhoto => {
  const photo = PHOTOS.find((item) => item.id === id);
  if (!photo) {
    throw new Error(`Неизвестный кадр: ${id}`);
  }

  return photo;
};

/** Кадры жанра; `'all'` — все работы. Порядок сохраняется. */
export const filterPhotos = (category: PhotoCategory | 'all'): readonly IPhoto[] =>
  category === 'all' ? PHOTOS : PHOTOS.filter((photo) => photo.category === category);
