import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  prettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'no-console': 'warn',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
];
