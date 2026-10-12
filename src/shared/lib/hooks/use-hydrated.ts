'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (): (() => void) => () => {};
const getSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

/**
 * Прошла ли гидратация: на сервере и в первом проходе гидратации — `false`,
 * затем `true`; у компонентов, смонтированных после гидратации, — сразу `true`.
 * Для того, что нельзя отдавать в SSR-разметке: например, лоадер поверх
 * картинки, которая без JS загрузится и так, а лоадер остался бы висеть.
 *
 * @returns `true` на клиенте после гидратации
 */
export const useHydrated = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
