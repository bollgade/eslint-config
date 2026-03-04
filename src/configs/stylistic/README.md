# stylistic

Code style rules via [@stylistic/eslint-plugin](https://eslint.style/).
Handles formatting concerns that Prettier does not cover (spacing, annotation style).

## Options (`StylisticOptions`)

```ts
createConfig({
  stylistic: {
    rules: {}, // override any @stylistic/* rule
  },
});
```

## Preset

Uses `@stylistic/eslint-plugin.configs.customize()` with:

| Setting | Value |
|---|---|
| `semi` | `true` |
| `arrowParens` | `true` |
| `jsx` | `false` |

## Additional rules

| Rule | Value | Notes |
|---|---|---|
| `@stylistic/quote-props` | `as-needed` | No unnecessary quotes on object keys |
| `@stylistic/operator-linebreak` | off | Handled by Prettier |
| `@stylistic/type-annotation-spacing` | error | Space around `:` in type annotations |
| `@stylistic/space-before-blocks` | error | Space before `{` |

## Disabling

```ts
createConfig({ stylistic: false });
```
