import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Storybook build output — не линтим минифицированные бандлы.
    "storybook-static/**",
    // Вендоренный UI-кит: правится только по списку локальных правок
    // (src/shared/kit/README.md), у него свои правила линтинга в апстриме.
    "src/shared/kit/**",
  ]),
]);

export default eslintConfig;
