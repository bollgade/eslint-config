import type { Linter } from 'eslint';

// TODO: replace with typed rule maps per plugin once we lock down all rule sets
type RulesOverride = Partial<Linter.RulesRecord>;

// ─── Per-category option objects ─────────────────────────────────────────────

export interface TypescriptOptions {
  /** Path(s) to tsconfig used for typed linting. Default: './tsconfig.json' */
  tsconfigPath?: string | string[];
  /**
   * Use strictTypeChecked + stylisticTypeChecked presets.
   * Set to false to fall back to the lighter recommended preset.
   * Default: true
   */
  strictTypeChecked?: boolean;
  // TODO: typed map of @typescript-eslint rule overrides
  rules?: RulesOverride;
}

export interface NodeOptions {
  // TODO: typed map of node rule overrides
  rules?: RulesOverride;
}

export interface NestOptions {
  // NestJS = TypeScript + Node + decorator support
  // TODO: typed map of nest-specific rule overrides
  rules?: RulesOverride;
}

export interface ReactOptions {
  /**
   * React version passed to eslint-plugin-react settings.
   * Default: 'detect'
   */
  version?: string;
  // TODO: typed map of eslint-plugin-react + react-hooks rule overrides
  rules?: RulesOverride;
}

export interface NextOptions {
  // TODO: typed map of @next/eslint-plugin-next rule overrides
  rules?: RulesOverride;
}

export interface PrettierOptions {
  // TODO: typed map of prettier rule overrides
  rules?: RulesOverride;
}

export interface StylisticOptions {
  // TODO: typed map of @stylistic/eslint-plugin rule overrides
  rules?: RulesOverride;
}

export interface ImportsOptions {
  // TODO: typed map of eslint-plugin-import + unused-imports rule overrides
  rules?: RulesOverride;
}

// ─── Main config options ──────────────────────────────────────────────────────

export interface ConfigOptions {
  /**
   * Enable TypeScript support (typed linting via typescript-eslint).
   * Pass an object to customize tsconfig path(s) or rule overrides.
   * Default: true
   */
  typescript?: boolean | TypescriptOptions;

  /**
   * Enable Node.js globals and environment.
   * Default: true
   */
  node?: boolean | NodeOptions;

  /**
   * Enable NestJS support (Node globals + decorator metadata).
   * Default: auto-detect (@nestjs/core in node_modules)
   */
  nest?: boolean | NestOptions;

  /**
   * Enable React support (eslint-plugin-react + eslint-plugin-react-hooks).
   * Requires eslint-plugin-react and eslint-plugin-react-hooks to be installed.
   * Default: auto-detect (react in node_modules)
   */
  react?: boolean | ReactOptions;

  /**
   * Enable Next.js support (@next/eslint-plugin-next).
   * Requires @next/eslint-plugin-next to be installed.
   * Implies react: true.
   * Default: auto-detect (next in node_modules)
   */
  next?: boolean | NextOptions;

  /**
   * Enable Prettier integration via eslint-plugin-prettier.
   * Default: true
   */
  prettier?: boolean | PrettierOptions;

  /**
   * Enable @stylistic/eslint-plugin rules.
   * Default: true
   */
  stylistic?: boolean | StylisticOptions;

  /**
   * Enable import ordering and hygiene rules
   * (eslint-plugin-import + eslint-plugin-unused-imports).
   * Default: true
   */
  imports?: boolean | ImportsOptions;
}
