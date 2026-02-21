import type { Linter } from 'eslint';

import type { NextOptions } from '../types';
import { importPlugin } from '../utils';

export async function nextConfigs(
  options: NextOptions,
): Promise<Linter.Config[]> {
  const { rules } = options;

  const pluginNext = await importPlugin('@next/eslint-plugin-next');

  if (!pluginNext) {
    throw new Error(
      '[@bollgade/eslint-config] Next.js support requires "@next/eslint-plugin-next".\n' +
        'Run: npm install -D @next/eslint-plugin-next',
    );
  }

  // Use the plugin's own recommended rules instead of hardcoding them
  const pluginConfigs = pluginNext.configs as
    | Record<string, { rules?: Linter.RulesRecord }>
    | undefined;
  const recommendedRules = pluginConfigs?.recommended?.rules ?? {};

  const configs: Linter.Config[] = [
    {
      plugins: { '@next/next': pluginNext },
      rules: recommendedRules,
    },
  ];

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
