import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * Страж списка `@source not` в `app.css`: компоненты кита из этого списка
 * Tailwind не сканирует, и если сайт начнёт их использовать, их классов не
 * окажется в продовом CSS — компонент молча останется без стилей.
 */

const SRC = join(process.cwd(), 'src');
const KIT_COMPONENTS = join(SRC, 'shared/kit/components');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);

    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const isSource = (path: string) => /\.tsx?$/.test(path) && !/\.(test|stories)\.tsx?$/.test(path);

/** Код без комментариев и строк: упоминание в доке или в `data-name` — не использование. */
const codeOnly = (text: string): string =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, "''");

/** Компоненты кита, исключённые из сканирования в app.css. */
const excludedComponents = (): string[] => {
  const css = readFileSync(join(SRC, 'app/app.css'), 'utf8');
  const match = /@source not "\.\.\/shared\/kit\/components\/\{([^}]+)\}\/\*\*";/.exec(css);
  if (!match) throw new Error('В app.css не найден список исключённых компонентов кита');

  return match[1].split(',').map((name) => name.trim());
};

/** Публичные имена компонента: имя каталога + экспорты его модулей (`buttonVariants`, `Show`…). */
const exportedNames = (component: string): string[] => {
  const names = new Set([component]);
  for (const file of walk(join(KIT_COMPONENTS, component)).filter(isSource)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/export\s+(?:const|function|class)\s+(\w+)/g)) names.add(m[1]);
  }

  return [...names];
};

describe('app.css: источники Tailwind', () => {
  it('список исключённых компонентов кита совпадает с реальными каталогами', () => {
    const existing = new Set(readdirSync(KIT_COMPONENTS));

    expect(excludedComponents().filter((name) => !existing.has(name))).toEqual([]);
  });

  it('сайт не использует компоненты кита, исключённые из сканирования', () => {
    const siteFiles = walk(SRC)
      .filter(isSource)
      .filter((file) => !file.startsWith(join(SRC, 'shared/kit')));
    const sources = siteFiles.map((file) => [relative(SRC, file), codeOnly(readFileSync(file, 'utf8'))]);

    const violations = excludedComponents().flatMap((component) =>
      exportedNames(component).flatMap((name) =>
        sources
          .filter(([, text]) => new RegExp(`\\b${name}\\b`).test(text))
          .map(([file]) => `${component} (${name}) — ${file}`),
      ),
    );

    expect(violations, 'уберите эти компоненты из @source not в src/app/app.css').toEqual([]);
  });
});
