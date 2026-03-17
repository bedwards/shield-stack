import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  prettier,
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXElement[openingElement.name.name=/^(a|button|input|select|textarea|Link)$/]:not(:has(JSXAttribute[name.name='data-testid']))",
          message: "Interactive elements must have a data-testid attribute.",
        },
      ],
    },
  },
];

export default eslintConfig;
