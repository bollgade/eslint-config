import type { Linter } from 'eslint';
import globals from 'globals';
import { isPackageExists } from 'local-pkg';

import type {
  ReactA11yOptions,
  ReactComponentNameOptions,
  ReactI18nOptions,
  ReactOptions,
  ReactStorybookOptions,
} from '../types';
import { importPlugin, resolve } from '../utils';

const DEFAULT_I18N_IGNORE_ATTRIBUTES = [
  'to',
  'as',
  'name',
  'data-testid',
  'target',
  'direction',
  'justify',
  'align',
  'gap',
  'border',
];

const DEFAULT_COMPONENT_NAME_TARGETS = ['memo', 'forwardRef', 'observer'];

export async function reactConfigs(
  options: ReactOptions,
  hasTypescript: boolean,
): Promise<Linter.Config[]> {
  const {
    version = 'detect',
    rules,
  } = options;

  const a11y = resolve(
    options.a11y,
    isPackageExists('eslint-plugin-jsx-a11y'),
  ) as ReactA11yOptions | false;

  const i18n = resolve(
    options.i18n,
    isPackageExists('eslint-plugin-i18next'),
  ) as ReactI18nOptions | false;

  const storybook = resolve(
    options.storybook,
    isPackageExists('eslint-plugin-storybook'),
  ) as ReactStorybookOptions | false;

  const componentName = resolve(
    options.componentName,
    isPackageExists('eslint-plugin-react-component-name'),
  ) as ReactComponentNameOptions | false;

  // Core plugins — required when react is enabled
  const [pluginReact, pluginReactHooks] = await Promise.all([
    importPlugin('eslint-plugin-react'),
    importPlugin('eslint-plugin-react-hooks'),
  ]);

  if (!pluginReact || !pluginReactHooks) {
    throw new Error(
      '[@bollgade/eslint-config] React support requires "eslint-plugin-react" and ' +
        '"eslint-plugin-react-hooks".\n' +
        'Run: npm install -D eslint-plugin-react eslint-plugin-react-hooks',
    );
  }

  const configs: Linter.Config[] = [
    // Browser globals for frontend
    {
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
    },
    // JSX parser support
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: true },
        },
      },
    },
    // Plugin registration + React version setting
    {
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
      },
      settings: {
        react: { version },
      },
    },
    // React rules
    {
      rules: {
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': [
          'warn',
          { html: 'ignore', exceptions: [] },
        ],
        'react/function-component-definition': 'off',
        'react/no-array-index-key': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
    // Overrides for test and story files
    {
      files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
      rules: {
        'max-len': 'off',
        ...(hasTypescript && {
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
        }),
      },
    },
    {
      files: ['**/*.stories.{ts,tsx,js,jsx}'],
      rules: {
        'max-len': 'off',
        'no-console': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ];

  // Optional: jsx-a11y
  if (a11y !== false) {
    const pluginA11y = await importPlugin('eslint-plugin-jsx-a11y');
    if (pluginA11y) {
      configs.push({
        plugins: { 'jsx-a11y': pluginA11y },
        rules: {
          'jsx-a11y/label-has-associated-control': ['error', {}],
          ...(a11y.rules ?? {}),
        },
      });
    }
  }

  // Optional: i18next
  if (i18n !== false) {
    const pluginI18n = await importPlugin('eslint-plugin-i18next');
    if (pluginI18n) {
      const ignoreAttribute =
        i18n.ignoreAttribute ?? DEFAULT_I18N_IGNORE_ATTRIBUTES;

      configs.push(
        {
          plugins: { i18next: pluginI18n },
          rules: {
            'i18next/no-literal-string': [
              'error',
              { markupOnly: true, ignoreAttribute },
            ],
            ...(i18n.rules ?? {}),
          },
        },
        // Disable i18n check in test and story files
        {
          files: [
            '**/*.{test,spec}.{ts,tsx,js,jsx}',
            '**/*.stories.{ts,tsx,js,jsx}',
          ],
          rules: {
            'i18next/no-literal-string': 'off',
          },
        },
      );
    }
  }

  // Optional: react-component-name
  if (componentName !== false) {
    const pluginComponentName = await importPlugin(
      'eslint-plugin-react-component-name',
    );
    if (pluginComponentName) {
      const targets =
        componentName.targets ?? DEFAULT_COMPONENT_NAME_TARGETS;

      configs.push({
        plugins: { 'react-component-name': pluginComponentName },
        rules: {
          'react-component-name/react-component-name': [
            'error',
            { targets },
          ],
          ...(componentName.rules ?? {}),
        },
      });
    }
  }

  // Optional: storybook
  if (storybook !== false) {
    const pluginStorybook = await importPlugin('eslint-plugin-storybook');
    if (pluginStorybook) {
      configs.push({
        plugins: { storybook: pluginStorybook },
        files: ['**/*.stories.{ts,tsx,js,jsx}'],
        rules: {
          ...(storybook.rules ?? {}),
        },
      });
    }
  }

  if (rules) {
    configs.push({ rules });
  }

  return configs;
}
