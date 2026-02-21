import type { Linter } from 'eslint';

import type { NestOptions } from '../types';

export function nestConfigs(
  options: NestOptions,
  hasTypescript: boolean,
): Linter.Config[] {
  const { rules } = options;

  const configs: Linter.Config[] = [];

  if (hasTypescript) {
    configs.push({
      rules: {
        // NestJS modules, controllers, and providers are often empty-body classes
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    });
  }

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
