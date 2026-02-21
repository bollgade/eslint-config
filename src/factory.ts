import type { Linter } from 'eslint';
import { isPackageExists } from 'local-pkg';

import { baseConfigs } from './configs/base';
import { importsConfigs } from './configs/imports';
import { nestConfigs } from './configs/nest';
import { nodeConfigs } from './configs/node';
import { prettierConfigs } from './configs/prettier';
import { stylisticConfigs } from './configs/stylistic';
import { typescriptConfigs } from './configs/typescript';
import type { ConfigOptions, NodeOptions } from './types';

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

  // nest implies node — if node is explicitly disabled but nest is active,
  // we still add node globals since NestJS requires a Node.js environment
  const effectiveNode: NodeOptions | false =
    node !== false ? node : nest !== false ? {} : false;

  const configs: Linter.Config[] = [
    ...baseConfigs(),
    ...(typescript ? typescriptConfigs(typescript) : []),
    ...(stylistic ? stylisticConfigs(stylistic) : []),
    ...(imports ? importsConfigs(imports, typescript !== false) : []),
    ...(prettier ? prettierConfigs(prettier) : []),
    ...(effectiveNode !== false ? nodeConfigs(effectiveNode) : []),
    ...(nest ? nestConfigs(nest, typescript !== false) : []),
    // TODO (Phase 4): react layer
    // TODO (Phase 5): next layer
  ];

  void [react, next];

  return configs;
}
