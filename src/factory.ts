import type { Linter } from 'eslint';
import { isPackageExists } from 'local-pkg';

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

  const configs: Linter.Config[] = [];

  // TODO (Phase 2): base JS rules + language options
  // TODO (Phase 2): typescript layer
  // TODO (Phase 2): stylistic layer
  // TODO (Phase 2): imports layer
  // TODO (Phase 2): prettier layer
  // TODO (Phase 3): node / nest layer
  // TODO (Phase 4): react layer
  // TODO (Phase 5): next layer

  void [typescript, node, prettier, stylistic, imports, nest, react, next];

  return configs;
}
