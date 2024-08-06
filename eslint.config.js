import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node 
      }
    },
    env: {
      node: true,
      browser: true,
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-multi-spaces": "error",
      "no-empty": "error",
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "newline-before-return": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }
      ]
    },
  },
];
