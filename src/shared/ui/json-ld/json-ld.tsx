import type { FC } from 'react';

import type { JsonLdNode } from '@/shared/lib/seo';

/**
 * # Интерфейс пропсов для компонента JsonLd
 * @interface IJsonLdProps
 * @property {JsonLdNode | readonly JsonLdNode[]} data - один или несколько узлов schema.org
 */
export interface IJsonLdProps {
  readonly data: JsonLdNode | readonly JsonLdNode[];
}

/**
 * Вставляет structured data (`application/ld+json`) в разметку страницы.
 *
 * Данные сериализуются JSON'ом, а `<` экранируется — иначе строка вида
 * `</script>` внутри значения закрыла бы тег и открыла XSS.
 *
 * @component
 */
export const JsonLd: FC<IJsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
);
