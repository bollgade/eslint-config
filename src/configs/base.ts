import eslint from '@eslint/js';
import type { Linter } from 'eslint';
import { globalIgnores } from 'eslint/config';

export function baseConfigs(): Linter.Config[] {
  return [
    globalIgnores([
      'node_modules',
      '.pnp',
      '.pnp.js',
      'coverage',
      'build',
      'dist',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
    ]),
    eslint.configs.recommended,
    {
      languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    {
      rules: {
        'no-trailing-spaces': 'error',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': ['error', 'nofunc'],
        'no-param-reassign': [
          'error',
          { ignorePropertyModificationsForRegex: ['state'] },
        ],
        'no-undef': 'off',
        'no-console': 'warn',
        'max-len': ['error', { ignoreComments: true, code: 120 }],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      },
    },
    // Relax style rules for test files
    {
      files: ['**/*.{test,spec}.{ts,js}'],
      rules: {
        'max-len': 'off',
      },
    },
  ];
}
