import type { Linter } from 'eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import type { PrettierOptions } from '../../types';

export function prettierConfigs(options: PrettierOptions): Linter.Config[] {
  const { rules } = options;

  const configs: Linter.Config[] = [
    eslintPluginPrettierRecommended satisfies Linter.Config,
    {
      rules: {
        'prettier/prettier': ['error', { singleQuote: true }],
      },
    },
  ];

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
