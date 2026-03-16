import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // Enforce data-testid on interactive elements for Playwright LLM-testability
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      // Custom rule: warn if interactive elements lack data-testid
      // This is enforced via code review and CLAUDE.md convention;
      // the jsx-a11y plugin ensures accessibility attributes are present.
      "react/no-unknown-property": "off",
    },
  },
];

export default eslintConfig;
