# next

Next.js support via [@next/eslint-plugin-next](https://www.npmjs.com/package/@next/eslint-plugin-next).

## Required peer dependency

```bash
npm install -D @next/eslint-plugin-next
```

## Options (`NextOptions`)

```ts
createConfig({
  next: {
    rules: {}, // override any @next/next/* rule
  },
});
```

## Auto-detection

Enabled automatically when `next` is found in `node_modules`.

## Implies `react: true`

When `next` is enabled, the full React layer is always added — even if `react: false`.
Next.js is built on React and requires all React rules.

## What it adds

Uses `@next/eslint-plugin-next`'s own `recommended` rule set, so the rules
stay in sync with your installed Next.js version automatically.

Notable rules included:

| Rule | Severity |
|---|---|
| `@next/next/no-html-link-for-pages` | error |
| `@next/next/no-img-element` | warn |
| `@next/next/no-page-custom-font` | warn |
| `@next/next/inline-script-id` | error |
| `@next/next/no-sync-scripts` | error |

## Disabling

```ts
createConfig({ next: false });
// React layer is still active if react: true (or react auto-detected)
```
