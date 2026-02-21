import type { Linter } from 'eslint';

/** Collect all plugin keys from a flat config array */
export function getPluginNames(configs: Linter.Config[]): string[] {
  return configs.flatMap((c) => Object.keys(c.plugins ?? {}));
}

/** Merge all rules from a flat config array (later entries win, mirrors ESLint behaviour) */
export function getMergedRules(
  configs: Linter.Config[],
): Partial<Linter.RulesRecord> {
  return configs.reduce<Partial<Linter.RulesRecord>>(
    (acc, c) => ({ ...acc, ...(c.rules ?? {}) }),
    {},
  );
}

/** Collect all global variable names from a flat config array */
export function getGlobalNames(configs: Linter.Config[]): string[] {
  return configs.flatMap((c) =>
    Object.keys(c.languageOptions?.globals ?? {}),
  );
}

/** Collect global ignore patterns (config objects with ignores but no files) */
export function getIgnorePatterns(configs: Linter.Config[]): string[] {
  return configs
    .filter((c) => c.ignores !== undefined && c.files === undefined)
    .flatMap((c) => c.ignores ?? []);
}
