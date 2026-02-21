import type { Linter } from 'eslint';
import globals from 'globals';

import type { NodeOptions } from '../../types';

export function nodeConfigs(options: NodeOptions): Linter.Config[] {
  const { rules } = options;

  const configs: Linter.Config[] = [
    {
      languageOptions: {
        globals: {
          ...globals.node,
          // TODO: extract to a dedicated test layer once test support is added
          ...globals.jest,
        },
      },
    },
  ];

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
