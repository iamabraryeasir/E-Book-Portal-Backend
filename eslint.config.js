import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
// Default ESLint configuration
// Includes browser and Node.js globals, and recommended JS rules
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Allow unused vars starting with underscore
    },
  },
  pluginJs.configs.recommended,
];
