import stylisticPlugin from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';

import type { StylisticOptions } from '../types';

export function stylisticConfigs(options: StylisticOptions): Linter.Config[] {
  const { rules } = options;

  const configs: Linter.Config[] = [
    stylisticPlugin.configs.customize({
      semi: true,
      arrowParens: true,
      jsx: false,
    }),
    {
      rules: {
        '@stylistic/quote-props': ['error', 'as-needed'],
        '@stylistic/operator-linebreak': 'off',
        '@stylistic/type-annotation-spacing': 'error',
        '@stylistic/space-before-blocks': 'error',
      },
    },
  ];

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
