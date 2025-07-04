import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import configPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', '.react-router'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      configPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-refresh/only-export-components': ['off'],
      'no-empty-pattern': 'off',
    },
  },
);
