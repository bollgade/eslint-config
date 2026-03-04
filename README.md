# @bollgade/eslint-config

[![npm](https://img.shields.io/npm/v/@bollgade/eslint-config)](https://www.npmjs.com/package/@bollgade/eslint-config)
[![downloads](https://img.shields.io/npm/dm/@bollgade/eslint-config)](https://www.npmjs.com/package/@bollgade/eslint-config)

One-stop **ESLint flat config** factory for TypeScript projects: Node.js, NestJS, React, and Next.js.

Inspired by [antfu/eslint-config](https://github.com/antfu/eslint-config): a single package where framework support is opt-in via `optionalDependencies` and auto-detected from your project's installed packages.

## Installation

```bash
npm install -D @bollgade/eslint-config
```

Framework plugins are **optional** — install only what you need:

```bash
# React
npm install -D eslint-plugin-react eslint-plugin-react-hooks

# Next.js
npm install -D @next/eslint-plugin-next

# Accessibility
npm install -D eslint-plugin-jsx-a11y

# i18n
npm install -D eslint-plugin-i18next

# Storybook
npm install -D eslint-plugin-storybook
```

## Usage

Create `eslint.config.mts` (or `.js`):

```ts
import { createConfig } from '@bollgade/eslint-config';

export default createConfig();
```

`createConfig` returns `Promise<Linter.Config[]>` — ESLint flat config supports async exports out of the box.

---

## Presets

### TypeScript + Node.js (backend, default)

```ts
export default createConfig();
// typescript: true, node: true, prettier: true, stylistic: true, imports: true
// react/next/nest: auto-detected from node_modules
```

### NestJS

```ts
export default createConfig({
  nest: true, // disables @typescript-eslint/no-extraneous-class for module classes
});
```

### React

```ts
export default createConfig({
  react: true,
  // auto-detects: jsx-a11y, i18next, storybook, react-component-name
});
```

### Next.js

```ts
export default createConfig({
  next: true, // implies react: true automatically
});
```

### With local overrides

```ts
import { createConfig } from '@bollgade/eslint-config';
import { defineConfig } from 'eslint/config';

const base = await createConfig({ react: true });

export default defineConfig(...base, {
  rules: {
    'no-console': 'off',
  },
});
```

---

## All options

Every option is `boolean | OptionsObject`. Passing `false` disables the layer entirely, passing an object enables it with custom settings.

| Option | Type | Default | Description |
|---|---|---|---|
| `typescript` | `boolean \| TypescriptOptions` | `true` | typescript-eslint with typed linting |
| `node` | `boolean \| NodeOptions` | `true` | Node.js globals |
| `nest` | `boolean \| NestOptions` | auto-detect | NestJS-specific rule relaxations |
| `react` | `boolean \| ReactOptions` | auto-detect | React + hooks plugins |
| `next` | `boolean \| NextOptions` | auto-detect | Next.js plugin (implies `react: true`) |
| `prettier` | `boolean \| PrettierOptions` | `true` | Prettier formatting integration |
| `stylistic` | `boolean \| StylisticOptions` | `true` | @stylistic/eslint-plugin |
| `imports` | `boolean \| ImportsOptions` | `true` | Import ordering and hygiene |

### TypescriptOptions

```ts
createConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',  // or array of paths
    strictTypeChecked: true,           // false → uses recommended preset
    rules: { /* override specific rules */ },
  },
});
```

### ReactOptions

```ts
createConfig({
  react: {
    version: 'detect',     // React version for eslint-plugin-react
    a11y: true,            // jsx-a11y (auto-detect)
    i18n: true,            // eslint-plugin-i18next (auto-detect)
    storybook: true,       // eslint-plugin-storybook (auto-detect)
    componentName: true,   // eslint-plugin-react-component-name (auto-detect)
    rules: { /* override specific rules */ },
  },
});
```

### ReactI18nOptions

```ts
createConfig({
  react: {
    i18n: {
      ignoreAttribute: ['to', 'as', 'name', 'data-testid'],
      rules: {},
    },
  },
});
```

### ReactComponentNameOptions

```ts
createConfig({
  react: {
    componentName: {
      targets: ['memo', 'forwardRef', 'observer'],
    },
  },
});
```

---

## What's included

| Layer | Always on | Plugin(s) | Key rules |
|---|---|---|---|
| **base** | ✓ | `@eslint/js` | `no-console: warn`, `max-len: 120`, `prefer-arrow-callback` |
| **typescript** | ✓ | `typescript-eslint` | `strictTypeChecked`, `no-floating-promises`, `no-unused-vars` |
| **stylistic** | ✓ | `@stylistic/eslint-plugin` | semi, arrowParens, quote-props |
| **imports** | ✓ | `eslint-plugin-import`, `eslint-plugin-unused-imports` | `import/order`, `no-unused-imports` |
| **prettier** | ✓ | `eslint-plugin-prettier` | `singleQuote: true` |
| **node** | ✓ | — | `globals.node`, `globals.jest` |
| **nest** | auto | — | `no-extraneous-class: off` |
| **react** | auto | `eslint-plugin-react`, `eslint-plugin-react-hooks` | hooks rules, JSX rules |
| **react › a11y** | auto | `eslint-plugin-jsx-a11y` | `label-has-associated-control` |
| **react › i18n** | auto | `eslint-plugin-i18next` | `no-literal-string` |
| **react › storybook** | auto | `eslint-plugin-storybook` | story file rules |
| **react › componentName** | auto | `eslint-plugin-react-component-name` | display names for memo/forwardRef |
| **next** | auto | `@next/eslint-plugin-next` | recommended Next.js rules |

---

## Auto-detection

Frameworks are auto-detected by checking your `node_modules`:

| Option | Detected when |
|---|---|
| `nest` | `@nestjs/core` is installed |
| `react` | `react` is installed |
| `next` | `next` is installed |
| `react.a11y` | `eslint-plugin-jsx-a11y` is installed |
| `react.i18n` | `eslint-plugin-i18next` is installed |
| `react.storybook` | `eslint-plugin-storybook` is installed |
| `react.componentName` | `eslint-plugin-react-component-name` is installed |

You can always override auto-detection explicitly:

```ts
createConfig({
  react: true,       // force-enable even if react not in node_modules
  nest: false,       // force-disable even if @nestjs/core is installed
});
```

---

## Implies logic

- `nest: true` → always adds Node.js globals (even if `node: false`)
- `next: true` → always adds React layer (even if `react: false`)

---

## Roadmap

- [ ] **Typed rules** — fully typed `rules` overrides per plugin (currently `Partial<Linter.RulesRecord>`)
- [ ] **`projectService` support** — alternative to `tsconfigPath` in `TypescriptOptions` for monorepos
- [ ] **Separate test layer** — dedicated `test` option with Jest/Vitest globals instead of bundling them in `node`
