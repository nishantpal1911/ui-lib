import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '!.storybook'] },
  tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        NodeJS: true,
      },
    },
    extends: [js.configs.recommended],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
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
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
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
