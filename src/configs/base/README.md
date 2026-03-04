# base

Always-on layer. Contains foundational JS rules and global ignores.

## What it does

- Sets `ecmaVersion: 2024`, `sourceType: 'module'`
- Global ignores: `node_modules`, `dist`, `build`, `coverage`, log files
- Extends `@eslint/js` recommended

## Rules

| Rule | Severity | Notes |
|---|---|---|
| `no-console` | warn | Allowed in backend, but flagged |
| `no-trailing-spaces` | error | |
| `no-shadow` | off | Handled by TypeScript |
| `no-underscore-dangle` | off | Common in Node.js patterns |
| `no-use-before-define` | error | `nofunc` — functions are exempt |
| `no-param-reassign` | error | Allows mutations matching `/state/` (Redux) |
| `no-undef` | off | Handled by TypeScript |
| `max-len` | error | 120 chars, comments ignored |
| `prefer-arrow-callback` | error | Named function callbacks allowed |

## Test file overrides

`**/*.{test,spec}.{ts,js}` — `max-len` is disabled.

## No options

`baseConfigs()` takes no arguments — these rules are always on.
Override individual rules via the top-level `rules` option of any other layer,
or append your own config block after `createConfig()`.
