# typescript

TypeScript support via [typescript-eslint](https://typescript-eslint.io/).
Requires a `tsconfig.json` in your project root (or a custom path via `tsconfigPath`).

## Options (`TypescriptOptions`)

```ts
createConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',  // string or string[] — default: './tsconfig.json'
    strictTypeChecked: true,           // false → recommended preset — default: true
    rules: {},                         // override any @typescript-eslint/* rule
  },
});
```

## Presets

| `strictTypeChecked` | Preset used |
|---|---|
| `true` (default) | `strictTypeChecked` + `stylisticTypeChecked` |
| `false` | `recommended` |

## Additional rules (on top of preset)

| Rule | Severity |
|---|---|
| `@typescript-eslint/no-unsafe-member-access` | error |
| `@typescript-eslint/no-floating-promises` | warn |
| `@typescript-eslint/no-unused-vars` | warn (vars/args prefixed with `_` are ignored) |

## Test file overrides

`**/*.{test,spec}.{ts,js}`:

| Rule | Override |
|---|---|
| `@typescript-eslint/no-unsafe-assignment` | off |
| `@typescript-eslint/no-unsafe-member-access` | off |

## Disabling

```ts
createConfig({ typescript: false });
// Removes parser, all @typescript-eslint rules, and the TS import resolver
```
