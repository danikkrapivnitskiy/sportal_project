import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-empty-pattern": "off",
    },
  },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ["node_modules/*", "allure-results/*", "allure-report/*", "dist/*", "logs/*", "playwright-report/*"],
  },
];
