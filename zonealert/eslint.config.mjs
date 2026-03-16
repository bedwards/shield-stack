import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Custom ESLint rule: require-data-testid
 *
 * Enforces that interactive JSX elements (button, a, input, select, textarea,
 * Link) include a data-testid attribute. This supports LLM-testable design
 * by ensuring Playwright can target all interactive elements.
 */
const requireDataTestidPlugin = {
  rules: {
    "require-data-testid": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Require data-testid attribute on interactive JSX elements",
        },
        messages: {
          missingTestId:
            'Interactive element <{{element}}> is missing a "data-testid" attribute. All interactive elements must have data-testid for Playwright testing.',
        },
        schema: [],
      },
      create(context) {
        const INTERACTIVE_ELEMENTS = new Set([
          "button",
          "a",
          "input",
          "select",
          "textarea",
          "Link",
        ]);

        return {
          JSXOpeningElement(node) {
            const elementName =
              node.name.type === "JSXIdentifier" ? node.name.name : null;

            if (!elementName || !INTERACTIVE_ELEMENTS.has(elementName)) {
              return;
            }

            const hasTestId = node.attributes.some(
              (attr) =>
                attr.type === "JSXAttribute" &&
                attr.name &&
                attr.name.name === "data-testid",
            );

            if (!hasTestId) {
              context.report({
                node,
                messageId: "missingTestId",
                data: { element: elementName },
              });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
  ),
  {
    plugins: {
      "data-testid": requireDataTestidPlugin,
    },
    rules: {
      "data-testid/require-data-testid": "warn",
    },
  },
];

export default eslintConfig;
