# react

React support via [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
and [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks).

## Required peer dependencies

```bash
npm install -D eslint-plugin-react eslint-plugin-react-hooks
```

## Options (`ReactOptions`)

```ts
createConfig({
  react: {
    version: 'detect',       // React version — default: 'detect'
    a11y: true,              // jsx-a11y — default: auto-detect
    i18n: true,              // eslint-plugin-i18next — default: auto-detect
    storybook: true,         // eslint-plugin-storybook — default: auto-detect
    componentName: true,     // eslint-plugin-react-component-name — default: auto-detect
    rules: {},               // override any react/* or react-hooks/* rule
  },
});
```

## Auto-detection

Enabled automatically when `react` is found in `node_modules`.

## What it adds

- `globals.browser` — `window`, `document`, `fetch`, etc.
- `parserOptions.ecmaFeatures.jsx: true` — JSX parsing
- `eslint-plugin-react` + `eslint-plugin-react-hooks` plugins

## Rules

| Rule | Value | Notes |
|---|---|---|
| `react/prop-types` | off | TypeScript handles prop validation |
| `react/react-in-jsx-scope` | off | Not needed in React 17+ |
| `react/require-default-props` | off | Optional props handled by TypeScript |
| `react/jsx-filename-extension` | error | Only `.js`, `.jsx`, `.tsx` |
| `react/jsx-props-no-spreading` | warn | `html: ignore`, disabled in stories |
| `react/function-component-definition` | off | Any component style allowed |
| `react/no-array-index-key` | off | Sometimes acceptable |
| `react-hooks/rules-of-hooks` | error | |
| `react-hooks/exhaustive-deps` | error | |

## Test and story file overrides

| Files | Rules disabled |
|---|---|
| `**/*.{test,spec}.*` | `max-len`, TS unsafe rules |
| `**/*.stories.*` | `max-len`, `no-console`, `react/jsx-props-no-spreading` |

---

## Sub-plugins

### `a11y` — eslint-plugin-jsx-a11y

```bash
npm install -D eslint-plugin-jsx-a11y
```

```ts
react: { a11y: { rules: {} } }
```

Adds accessibility rules. Enabled automatically when `eslint-plugin-jsx-a11y` is installed.

Key rule: `jsx-a11y/label-has-associated-control: error`

---

### `i18n` — eslint-plugin-i18next

```bash
npm install -D eslint-plugin-i18next
```

```ts
react: {
  i18n: {
    ignoreAttribute: ['to', 'as', 'name', 'data-testid', 'target'],
    rules: {},
  },
}
```

Prevents hardcoded strings in JSX (`i18next/no-literal-string`).
Automatically disabled in `*.test.*` and `*.stories.*` files.

---

### `componentName` — eslint-plugin-react-component-name

```bash
npm install -D eslint-plugin-react-component-name
```

```ts
react: {
  componentName: {
    targets: ['memo', 'forwardRef', 'observer'],
    rules: {},
  },
}
```

Enforces display names on wrapped components so they appear correctly in React DevTools.

---

### `storybook` — eslint-plugin-storybook

```bash
npm install -D eslint-plugin-storybook
```

```ts
react: { storybook: { rules: {} } }
```

Applies storybook-specific rules scoped to `**/*.stories.*` files.

## Disabling

```ts
createConfig({ react: false });
```
