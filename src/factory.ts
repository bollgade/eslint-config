import type { Linter } from 'eslint';
import { isPackageExists } from 'local-pkg';

import { baseConfigs } from './configs/base';
import { importsConfigs } from './configs/imports';
import { prettierConfigs } from './configs/prettier';
import { stylisticConfigs } from './configs/stylistic';
import { typescriptConfigs } from './configs/typescript';
import type { ConfigOptions } from './types';

/**
 * Resolves a boolean | object option into a plain object (or false if disabled).
 * - false            → disabled
 * - true / undefined → enabled with defaults (autoDetect decides if undefined)
 * - object           → enabled with provided options
 */
function resolve<T extends object>(
  option: boolean | T | undefined,
  autoDetect: boolean,
): T | false {
  if (option === false) return false;
  if (option === undefined) return autoDetect ? ({} as T) : false;
  if (option === true) return {} as T;
  return option;
}

export async function createConfig(
  options: ConfigOptions = {},
): Promise<Linter.Config[]> {
  const typescript = resolve(options.typescript, true);
  const node = resolve(options.node, true);
  const prettier = resolve(options.prettier, true);
  const stylistic = resolve(options.stylistic, true);
  const imports = resolve(options.imports, true);
  const nest = resolve(options.nest, isPackageExists('@nestjs/core'));
  const react = resolve(options.react, isPackageExists('react'));
  // next implies react
  const next = resolve(options.next, isPackageExists('next'));

  const configs: Linter.Config[] = [
    ...baseConfigs(),
    ...(typescript ? typescriptConfigs(typescript) : []),
    ...(stylistic ? stylisticConfigs(stylistic) : []),
    ...(imports ? importsConfigs(imports, typescript !== false) : []),
    ...(prettier ? prettierConfigs(prettier) : []),
    // TODO (Phase 3): node / nest layer
    // TODO (Phase 4): react layer
    // TODO (Phase 5): next layer
  ];

  void [node, nest, react, next];

  return configs;
}
