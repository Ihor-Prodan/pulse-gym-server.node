import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
   
  },
});
