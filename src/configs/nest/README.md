# nest

NestJS-specific rule relaxations.

NestJS is TypeScript + Node.js + decorators. There is no official `eslint-plugin-nestjs`,
so this layer only adjusts rules from other plugins that conflict with NestJS patterns.

## Options (`NestOptions`)

```ts
createConfig({
  nest: {
    rules: {}, // additional rule overrides
  },
});
```

## Auto-detection

Enabled automatically when `@nestjs/core` is found in `node_modules`.

## What it does

- Implies `node: true` — adds Node.js globals even if `node: false`
- Disables `@typescript-eslint/no-extraneous-class` (only when `typescript` is enabled)

### Why `no-extraneous-class: off`?

NestJS modules, controllers, providers, and guards are classes that often have
no instance members — they exist purely as DI tokens or metadata holders:

```ts
@Module({ imports: [TypeOrmModule.forFeature([User])] })
export class UserModule {}  // ← empty class body, valid NestJS pattern
```

## Disabling

```ts
createConfig({ nest: false });
```
