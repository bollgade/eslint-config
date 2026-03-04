# node

Node.js environment globals.

## Options (`NodeOptions`)

```ts
createConfig({
  node: {
    rules: {}, // additional rule overrides
  },
});
```

## What it adds

- `globals.node` — `process`, `Buffer`, `__dirname`, `__filename`, `require`, etc.
- `globals.jest` — `describe`, `it`, `expect`, `beforeEach`, etc.

> **Note:** Jest globals are included here temporarily.
> They will be moved to a dedicated test layer in a future release.

## Implied by `nest: true`

If `nest: true` and `node: false`, Node.js globals are still added automatically
because NestJS requires a Node.js environment.

## Disabling

```ts
createConfig({ node: false });
// Note: if nest: true, node globals will still be added
```
