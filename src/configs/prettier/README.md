# prettier

Prettier integration via [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).
Runs Prettier as an ESLint rule so formatting errors appear inline.

## Options (`PrettierOptions`)

```ts
createConfig({
  prettier: {
    rules: {}, // override prettier/prettier rule options
  },
});
```

## Prettier config applied

| Option | Value |
|---|---|
| `singleQuote` | `true` |

All other Prettier options respect your project's `.prettierrc` if present.

## Note

`eslint-config-prettier` is included automatically to disable ESLint rules
that conflict with Prettier formatting.

## Disabling

```ts
createConfig({ prettier: false });
// Also recommended to remove .prettierrc and not run prettier separately
```
