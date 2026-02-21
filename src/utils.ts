import type { ESLint } from 'eslint';

/**
 * Resolves a boolean | object option into a plain object (or false if disabled).
 * - false            → disabled
 * - true / undefined → enabled with defaults (autoDetect decides if undefined)
 * - object           → enabled with provided options
 */
export function resolve<T extends object>(
  option: boolean | T | undefined,
  autoDetect: boolean,
): T | false {
  if (option === false) return false;
  if (option === undefined) return autoDetect ? ({} as T) : false;
  if (option === true) return {} as T;
  return option;
}

/**
 * Dynamically imports an ESLint plugin by package name.
 * Returns null if the package is not installed (optionalDependency pattern).
 */
export async function importPlugin(name: string): Promise<ESLint.Plugin | null> {
  try {
    const mod = (await import(name)) as { default?: ESLint.Plugin } & ESLint.Plugin;
    return mod.default ?? mod;
  } catch {
    return null;
  }
}
