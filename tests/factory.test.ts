import { describe, expect, it } from 'vitest';

import { createConfig } from '../src/index';
import {
  getGlobalNames,
  getIgnorePatterns,
  getMergedRules,
  getPluginNames,
} from './helpers';

// Disable framework auto-detection in all tests — only test what we explicitly enable
const NO_FRAMEWORKS = { react: false as const, next: false as const, nest: false as const };

describe('createConfig()', () => {
  it('returns a non-empty array', async () => {
    const config = await createConfig(NO_FRAMEWORKS);
    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThan(0);
  });

  // ─── Global ignores ──────────────────────────────────────────────────────────

  describe('global ignores', () => {
    it('ignores dist by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getIgnorePatterns(config)).toContain('dist');
    });

    it('ignores node_modules by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getIgnorePatterns(config)).toContain('node_modules');
    });
  });

  // ─── TypeScript ──────────────────────────────────────────────────────────────

  describe('typescript', () => {
    it('includes @typescript-eslint rules by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      const rules = getMergedRules(config);
      expect(rules).toHaveProperty('@typescript-eslint/no-floating-promises');
    });

    it('excludes @typescript-eslint rules when typescript: false', async () => {
      const config = await createConfig({ ...NO_FRAMEWORKS, typescript: false });
      const rules = getMergedRules(config);
      expect(rules).not.toHaveProperty('@typescript-eslint/no-floating-promises');
    });

    it('uses strictTypeChecked preset by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      const plugins = getPluginNames(config);
      expect(plugins).toContain('@typescript-eslint');
    });

    it('accepts a custom tsconfigPath without throwing', async () => {
      await expect(
        createConfig({
          ...NO_FRAMEWORKS,
          typescript: { tsconfigPath: './tsconfig.custom.json' },
        }),
      ).resolves.not.toThrow();
    });

    it('accepts rules override', async () => {
      const config = await createConfig({
        ...NO_FRAMEWORKS,
        typescript: { rules: { '@typescript-eslint/no-floating-promises': 'error' } },
      });
      const rules = getMergedRules(config);
      expect(rules['@typescript-eslint/no-floating-promises']).toBe('error');
    });
  });

  // ─── Prettier ────────────────────────────────────────────────────────────────

  describe('prettier', () => {
    it('includes prettier/prettier rule by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getMergedRules(config)).toHaveProperty('prettier/prettier');
    });

    it('excludes prettier rules when prettier: false', async () => {
      const config = await createConfig({ ...NO_FRAMEWORKS, prettier: false });
      expect(getMergedRules(config)).not.toHaveProperty('prettier/prettier');
    });
  });

  // ─── Stylistic ───────────────────────────────────────────────────────────────

  describe('stylistic', () => {
    it('includes @stylistic plugin by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getPluginNames(config)).toContain('@stylistic');
    });

    it('excludes @stylistic plugin when stylistic: false', async () => {
      const config = await createConfig({ ...NO_FRAMEWORKS, stylistic: false });
      expect(getPluginNames(config)).not.toContain('@stylistic');
    });
  });

  // ─── Imports ─────────────────────────────────────────────────────────────────

  describe('imports', () => {
    it('includes import/order rule by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getMergedRules(config)).toHaveProperty('import/order');
    });

    it('includes unused-imports plugin by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getPluginNames(config)).toContain('unused-imports');
    });

    it('excludes import rules when imports: false', async () => {
      const config = await createConfig({ ...NO_FRAMEWORKS, imports: false });
      expect(getMergedRules(config)).not.toHaveProperty('import/order');
    });
  });

  // ─── Node ────────────────────────────────────────────────────────────────────

  describe('node', () => {
    it('includes Node.js globals by default', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getGlobalNames(config)).toContain('process');
    });

    it('excludes Node.js globals when node: false and nest: false', async () => {
      const config = await createConfig({ ...NO_FRAMEWORKS, node: false });
      expect(getGlobalNames(config)).not.toContain('process');
    });
  });

  // ─── Nest implies Node ───────────────────────────────────────────────────────

  describe('nest implies node', () => {
    it('adds Node.js globals when nest: true even if node: false', async () => {
      const config = await createConfig({ react: false, next: false, nest: true, node: false });
      expect(getGlobalNames(config)).toContain('process');
    });

    it('disables @typescript-eslint/no-extraneous-class when nest: true', async () => {
      const config = await createConfig({ react: false, next: false, nest: true });
      expect(getMergedRules(config)['@typescript-eslint/no-extraneous-class']).toBe('off');
    });

    it('does not add @typescript-eslint rules from nest when typescript: false', async () => {
      const config = await createConfig({
        react: false,
        next: false,
        nest: true,
        typescript: false,
      });
      // The nest-specific TS rule should NOT be present
      expect(getMergedRules(config)).not.toHaveProperty(
        '@typescript-eslint/no-extraneous-class',
      );
    });
  });

  // ─── React ───────────────────────────────────────────────────────────────────

  describe('react', () => {
    it('adds browser globals when react: true', async () => {
      const config = await createConfig({ next: false, nest: false, react: true });
      expect(getGlobalNames(config)).toContain('window');
    });

    it('registers react plugin when react: true', async () => {
      const config = await createConfig({ next: false, nest: false, react: true });
      expect(getPluginNames(config)).toContain('react');
    });

    it('includes react/react-in-jsx-scope: off when react: true', async () => {
      const config = await createConfig({ next: false, nest: false, react: true });
      expect(getMergedRules(config)['react/react-in-jsx-scope']).toBe('off');
    });

    it('excludes react plugin when react: false', async () => {
      const config = await createConfig(NO_FRAMEWORKS);
      expect(getPluginNames(config)).not.toContain('react');
    });
  });

  // ─── Next implies React ──────────────────────────────────────────────────────

  describe('next implies react', () => {
    it('registers react plugin when next: true even if react: false', async () => {
      const config = await createConfig({ nest: false, next: true, react: false });
      expect(getPluginNames(config)).toContain('react');
    });

    it('registers @next/next plugin when next: true', async () => {
      const config = await createConfig({ nest: false, next: true, react: false });
      expect(getPluginNames(config)).toContain('@next/next');
    });
  });
});
