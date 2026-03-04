import type { Linter } from 'eslint';
import { flatConfigs as importPluginFlat } from 'eslint-plugin-import';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

import type { ImportsOptions } from '../../types';

export function importsConfigs(
  options: ImportsOptions,
  hasTypescript: boolean,
): Linter.Config[] {
  const { rules } = options;

  const configs: Linter.Config[] = [
    importPluginFlat.recommended,
    {
      plugins: {
        'unused-imports': eslintPluginUnusedImports,
      },
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'import/order': [
          'error',
          {
            groups: [
              ['builtin', 'external'],
              'internal',
              ['parent', 'sibling', 'index'],
            ],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/*.config.{ts,js}',
              '**/eslint.config.*',
              '**/*.{test,spec,stories}.{ts,tsx,js}',
              '**/{tests,__tests__,test,stories,config}/**/*.{ts,tsx,js}',
              '**/scripts/**/*.{ts,tsx,js}',
            ],
          },
        ],
        'import/no-unresolved': ['error', { ignore: ['^eslint/'] }],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
      },
    },
  ];

  if (hasTypescript) {
    configs.push(importPluginFlat.typescript, {
      files: ['**/*.{ts,tsx}'],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    });
  }

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
