/**
 * ЛОКАЛЬНАЯ ПРАВКА (см. ../README.md, п. 4): вместо голого `twMerge` кит
 * использует расширенный `cn` проекта. Голый `twMerge` считает `text-caption` /
 * `text-small` цветом и выкидывает их при встрече с `text-muted-foreground`.
 */
export { cn } from '@/shared/lib/cn';
