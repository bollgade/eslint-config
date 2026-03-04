# imports

Import ordering and hygiene via [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
and [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports).

## Options (`ImportsOptions`)

```ts
createConfig({
  imports: {
    rules: {}, // override any import/* or unused-imports/* rule
  },
});
```

## Import order

Groups (no blank lines between them, alphabetized within each group):

```
builtin + external  →  internal  →  parent + sibling + index
```

```ts
// ✓ correct
import path from 'path';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { formatDate } from './utils';
```

## Rules

| Rule | Value |
|---|---|
| `unused-imports/no-unused-imports` | error |
| `import/order` | error (alphabetized, see above) |
| `import/no-extraneous-dependencies` | error |
| `import/no-unresolved` | error (ignores `eslint/*` subpath exports) |
| `import/extensions` | off |
| `import/prefer-default-export` | off |

## TypeScript resolver

When `typescript` is enabled, adds `eslint-import-resolver-typescript` for
`**/*.{ts,tsx}` files so path aliases from `tsconfig.json` are resolved correctly.

## `devDependencies` allowlist

The following file patterns may import `devDependencies` without error:

- `**/*.config.{ts,js}`
- `**/eslint.config.*`
- `**/*.{test,spec,stories}.{ts,tsx,js}`
- `**/{tests,__tests__,test,stories,config}/**/*.{ts,tsx,js}`
- `**/scripts/**/*.{ts,tsx,js}`

## Disabling

```ts
createConfig({ imports: false });
```
