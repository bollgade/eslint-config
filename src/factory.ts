import type { Linter } from 'eslint';
import { isPackageExists } from 'local-pkg';

import { baseConfigs } from './configs/base';
import { importsConfigs } from './configs/imports';
import { nestConfigs } from './configs/nest';
import { nodeConfigs } from './configs/node';
import { prettierConfigs } from './configs/prettier';
import { reactConfigs } from './configs/react';
import { stylisticConfigs } from './configs/stylistic';
import { typescriptConfigs } from './configs/typescript';
import type { ConfigOptions, NodeOptions } from './types';
import { resolve } from './utils';

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
  // next implies react — handled in Phase 5
  const next = resolve(options.next, isPackageExists('next'));

  // nest implies node — add node globals even if node: false
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
    ...(react ? await reactConfigs(react, typescript !== false) : []),
    // TODO (Phase 5): next layer
  ];

  void [next];

  return configs;
}
