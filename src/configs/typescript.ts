import type { Linter } from 'eslint';
import {
  parser as tseslintParser,
  configs as tseslintConfigs,
} from 'typescript-eslint';

import type { TypescriptOptions } from '../types';

export function typescriptConfigs(options: TypescriptOptions): Linter.Config[] {
  const { tsconfigPath, strictTypeChecked = true, rules } = options;

  const project = tsconfigPath
    ? Array.isArray(tsconfigPath)
      ? tsconfigPath
      : [tsconfigPath]
    : ['./tsconfig.json'];

  const presets: Linter.Config[] = strictTypeChecked
    ? [
        ...tseslintConfigs.strictTypeChecked,
        ...tseslintConfigs.stylisticTypeChecked,
      ]
    : [...tseslintConfigs.recommended];

  const configs: Linter.Config[] = [
    {
      languageOptions: {
        parser: tseslintParser,
        parserOptions: {
          project,
          tsconfigRootDir: process.cwd(),
        },
      },
    },
    ...presets,
    {
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
    // Relax type-unsafe rules for test files
    {
      files: ['**/*.{test,spec}.{ts,js}'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ];

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
