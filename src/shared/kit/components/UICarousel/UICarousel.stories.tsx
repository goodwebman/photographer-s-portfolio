import { useRef } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UICarousel, type UICarouselHandle } from './UICarousel';
import { UIButton } from '../UIButton';
import { UIBadge } from '../UIBadge';

const meta = {
  component: UICarousel,
  tags: ['autodocs'],
  title: 'Kit/Lists/UICarousel',
} satisfies Meta<typeof UICarousel>;

export default meta;

// ─── Моковые данные фильмов ─────────────────────────────────────────────────
interface Movie {
  id: number;
  title: string;
  year: number;
  duration: string;
  rating: number;
  ageLimit: string;
  genres: string[];
  overview: string;
  poster: string; // tailwind-градиент как заглушка постера
}

const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Начало',
    year: 2010,
    duration: '2 ч 28 мин',
    rating: 8.7,
    ageLimit: '12+',
    genres: ['Фантастика', 'Триллер', 'Боевик'],
    overview:
      'Дом Кобб — талантливый вор, специализирующийся на извлечении секретов из подсознания во время сна. Ему предлагают невозможное: не украсть идею, а внедрить её.',
    poster: 'from-slate-800 via-indigo-900 to-slate-950',
  },
  {
    id: 2,
    title: 'Интерстеллар',
    year: 2014,
    duration: '2 ч 49 мин',
    rating: 8.6,
    ageLimit: '16+',
    genres: ['Фантастика', 'Драма', 'Приключения'],
    overview:
      'Когда засуха приводит человечество к продовольственному кризису, команда исследователей отправляется сквозь червоточину, чтобы превзойти прежние ограничения космических полётов.',
    poster: 'from-neutral-900 via-amber-950 to-black',
  },
  {
    id: 3,
    title: 'Бегущий по лезвию 2049',
    year: 2017,
    duration: '2 ч 44 мин',
    rating: 8.0,
    ageLimit: '18+',
    genres: ['Фантастика', 'Драма', 'Детектив'],
    overview:
      'Молодой бластер Кей раскрывает давно похороненную тайну, способную ввергнуть остатки общества в хаос. Находка приводит его к поискам Рика Декарда, пропавшего 30 лет назад.',
    poster: 'from-orange-900 via-rose-900 to-neutral-950',
  },
  {
    id: 4,
    title: 'Дюна',
    year: 2021,
    duration: '2 ч 35 мин',
    rating: 8.1,
    ageLimit: '12+',
    genres: ['Фантастика', 'Приключения', 'Драма'],
    overview:
      'Пол Атрейдес — одарённый юноша, которому суждено отправиться на самую опасную планету во вселенной, чтобы обеспечить будущее своей семьи и народа.',
    poster: 'from-amber-800 via-orange-950 to-stone-950',
  },
  {
    id: 5,
    title: 'Тёмный рыцарь',
    year: 2008,
    duration: '2 ч 32 мин',
    rating: 9.0,
    ageLimit: '16+',
    genres: ['Боевик', 'Триллер', 'Криминал'],
    overview:
      'Бэтмен поднимает ставки в войне с преступностью. С помощью лейтенанта Гордона и прокурора Харви Дента он намерен очистить улицы, пока на сцену не выходит Джокер.',
    poster: 'from-neutral-950 via-slate-900 to-black',
  },
  {
    id: 6,
    title: 'Гравитация',
    year: 2013,
    duration: '1 ч 31 мин',
    rating: 7.7,
    ageLimit: '12+',
    genres: ['Фантастика', 'Триллер', 'Драма'],
    overview:
      'Во время выхода в открытый космос доктор Стоун и астронавт Ковальски остаются один на один с космосом после катастрофы, уничтожившей их шаттл.',
    poster: 'from-blue-950 via-slate-900 to-black',
  },
  {
    id: 7,
    title: 'Марсианин',
    year: 2015,
    duration: '2 ч 24 мин',
    rating: 8.0,
    ageLimit: '16+',
    genres: ['Фантастика', 'Приключения', 'Драма'],
    overview:
      'Астронавта Марка Уотни считают погибшим и оставляют на Марсе. Ему предстоит выжить на враждебной планете, полагаясь лишь на смекалку и научные знания.',
    poster: 'from-red-900 via-orange-950 to-neutral-950',
  },
  {
    id: 8,
    title: 'Прибытие',
    year: 2016,
    duration: '1 ч 56 мин',
    rating: 7.9,
    ageLimit: '16+',
    genres: ['Фантастика', 'Драма', 'Детектив'],
    overview:
      'Когда над Землёй зависают загадочные космические корабли, лингвист Луиза Бэнкс должна найти способ общения с пришельцами, пока мир балансирует на грани войны.',
    poster: 'from-teal-950 via-slate-900 to-neutral-950',
  },
];

const StarIcon = (): React.ReactNode => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 text-amber-400" aria-hidden>
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
  </svg>
);

// ─── Полноценная карточка фильма (постер + метаданные) ──────────────────────
const MovieCard = ({ movie }: { movie: Movie }): React.ReactNode => (
  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
    <div className={`relative h-40 shrink-0 bg-linear-to-br ${movie.poster}`}>
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 backdrop-blur">
        <StarIcon />
        <span className="text-xs font-semibold tabular-nums text-white">
          {movie.rating.toFixed(1)}
        </span>
      </div>
      <UIBadge className="absolute right-3 top-3 bg-black/55 text-white backdrop-blur">
        {movie.ageLimit}
      </UIBadge>
      <div className="absolute inset-x-3 bottom-3">
        <h3 className="text-lg font-bold leading-tight text-white drop-shadow">{movie.title}</h3>
        <p className="text-xs text-white/80">
          {movie.year} · {movie.duration}
        </p>
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="flex flex-wrap gap-1.5">
        {movie.genres.map((g) => (
          <span
            key={g}
            className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {g}
          </span>
        ))}
      </div>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {movie.overview}
      </p>

      <div className="flex gap-2 pt-1">
        <UIButton size="sm" className="flex-1">
          ▶ Смотреть
        </UIButton>
        <UIButton size="sm" variant="outline">
          + В избранное
        </UIButton>
      </div>
    </div>
  </article>
);

// Компактный постер для «ленты подборки»
const PosterCard = ({ movie }: { movie: Movie }): React.ReactNode => (
  <div className="group cursor-pointer">
    <div
      className={`relative aspect-[2/3] overflow-hidden rounded-lg bg-linear-to-br ${movie.poster} shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/55 px-1.5 py-0.5 backdrop-blur">
        <StarIcon />
        <span className="text-[11px] font-semibold tabular-nums text-white">
          {movie.rating.toFixed(1)}
        </span>
      </div>
      <div className="absolute inset-x-2 bottom-2">
        <p className="truncate text-sm font-semibold text-white drop-shadow">{movie.title}</p>
        <p className="text-[11px] text-white/70">{movie.year}</p>
      </div>
    </div>
  </div>
);

// Hero-баннер во всю ширину слайда
const HeroSlide = ({ movie }: { movie: Movie }): React.ReactNode => (
  <div className={`relative h-full overflow-hidden rounded-2xl bg-linear-to-br ${movie.poster}`}>
    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-1 backdrop-blur">
          <StarIcon />
          <span className="text-sm font-bold tabular-nums text-amber-300">
            {movie.rating.toFixed(1)}
          </span>
        </div>
        <UIBadge className="bg-white/15 text-white backdrop-blur">{movie.ageLimit}</UIBadge>
        <span className="text-sm text-white/70">
          {movie.year} · {movie.duration}
        </span>
      </div>
      <h2 className="max-w-lg text-4xl font-black leading-none tracking-tight text-white drop-shadow-lg">
        {movie.title}
      </h2>
      <p className="line-clamp-2 max-w-xl text-sm leading-relaxed text-white/80">{movie.overview}</p>
      <div className="flex gap-3 pt-1">
        <UIButton>▶ Смотреть</UIButton>
        <UIButton
          variant="outline"
          className="border-white/30 bg-white/10 text-white hover:bg-white/20"
        >
          Подробнее
        </UIButton>
      </div>
    </div>
  </div>
);

// ─── Stories ────────────────────────────────────────────────────────────────

/** Карточки фильмов с постером, рейтингом, жанрами и описанием. Стрелки — снаружи, по бокам. */
export const MovieCards = {
  parameters: {
    docs: {
      source: {
        code: `<UICarousel<Movie>
  items={movies}
  getItemKey={(m) => m.id}
  renderItem={(m) => <MovieCard movie={m} />}
  itemWidth={320}
  gap={16}
  height={400}
/>`,
      },
    },
  },
  render: () => (
    <div className="w-[820px] px-14">
      <h2 className="mb-3 text-lg font-semibold">Рекомендуем сегодня</h2>
      <UICarousel<Movie>
        items={MOVIES}
        getItemKey={(m) => m.id}
        renderItem={(m) => <MovieCard movie={m} />}
        itemWidth={320}
        gap={16}
        height={400}
      />
    </div>
  ),
};

/** Hero-баннер во всю ширину слайда с автопрокруткой. */
export const HeroBanner = {
  parameters: {
    docs: {
      source: {
        code: `<UICarousel<Movie>
  items={movies}
  getItemKey={(m) => m.id}
  renderItem={(m) => <HeroSlide movie={m} />}
  itemWidth={820}
  gap={0}
  height={340}
  autoplayMs={4000}
  loop
/>`,
      },
    },
  },
  render: () => (
    <div className="w-[820px] px-14">
      <UICarousel<Movie>
        items={MOVIES.slice(0, 5)}
        getItemKey={(m) => m.id}
        renderItem={(m) => <HeroSlide movie={m} />}
        itemWidth={820}
        gap={0}
        height={340}
        autoplayMs={4000}
        loop
      />
    </div>
  ),
};

/** Лента постеров — как строка «продолжить просмотр» в стриминге. */
export const PosterRow = {
  parameters: {
    docs: {
      source: {
        code: `<UICarousel<Movie>
  items={movies}
  getItemKey={(m) => m.id}
  renderItem={(m) => <PosterCard movie={m} />}
  itemWidth={170}
  gap={14}
  height={270}
  showDots={false}
/>`,
      },
    },
  },
  render: () => (
    <div className="w-[820px] px-14">
      <h2 className="mb-3 text-lg font-semibold">Научная фантастика</h2>
      <UICarousel<Movie>
        items={[...MOVIES, ...MOVIES.map((m) => ({ ...m, id: m.id + 100 }))]}
        getItemKey={(m) => m.id}
        renderItem={(m) => <PosterCard movie={m} />}
        itemWidth={170}
        gap={14}
        height={270}
        showDots={false}
      />
    </div>
  ),
};

/** Ручное управление через imperative handle. */
export const ImperativeControls = {
  parameters: {
    docs: {
      source: {
        code: `const ref = useRef<UICarouselHandle>(null);

return (
  <>
    <UIButton onClick={() => ref.current?.prev()}>← Назад</UIButton>
    <UIButton onClick={() => ref.current?.next()}>Вперёд →</UIButton>
    <UIButton onClick={() => ref.current?.scrollToIndex(0, 'smooth')}>К началу</UIButton>
    <UIButton onClick={() => ref.current?.scrollToIndex(7, 'smooth')}>К последнему</UIButton>

    <UICarousel<Movie>
      ref={ref}
      items={movies}
      getItemKey={(m) => m.id}
      renderItem={(m) => <MovieCard movie={m} />}
      itemWidth={320}
      gap={16}
      height={400}
      loop
    />
  </>
);`,
      },
    },
  },
  render: () => {
    const ref = useRef<UICarouselHandle>(null);
    return (
      <div className="w-[820px] space-y-3 px-14">
        <div className="flex gap-2">
          <UIButton size="sm" variant="outline" onClick={() => ref.current?.prev()}>
            ← Назад
          </UIButton>
          <UIButton size="sm" variant="outline" onClick={() => ref.current?.next()}>
            Вперёд →
          </UIButton>
          <UIButton
            size="sm"
            variant="outline"
            onClick={() => ref.current?.scrollToIndex(0, 'smooth')}
          >
            К началу
          </UIButton>
          <UIButton
            size="sm"
            variant="outline"
            onClick={() => ref.current?.scrollToIndex(7, 'smooth')}
          >
            К последнему
          </UIButton>
        </div>
        <UICarousel<Movie>
          ref={ref}
          items={MOVIES}
          getItemKey={(m) => m.id}
          renderItem={(m) => <MovieCard movie={m} />}
          itemWidth={320}
          gap={16}
          height={400}
          loop
        />
      </div>
    );
  },
};
