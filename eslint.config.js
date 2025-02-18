import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      // sourceType: 'module',
      globals: globals.browser,
      // parser: tseslint.parser,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      prettier,
      import: fixupPluginRules(importPlugin),
      'sort-destructure-keys': sortDestructureKeys,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-console': 'warn',
      'no-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'smart'],
      'newline-before-return': 'error',
      'prefer-destructuring': 'error',
      'no-duplicate-imports': ['error', { includeExports: true }],
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      // Import plugin rules
      'import/newline-after-import': 'error',
      'import/first': ['error', 'absolute-first'],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: 'src/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: true,
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': 2,
      'no-relative-import-paths/no-relative-import-paths': 'error',
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierConfig
);
