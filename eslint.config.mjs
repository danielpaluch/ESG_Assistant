import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:domain',
              onlyDependOnLibsWithTags: [
                'type:domain',
                'type:util',
                'type:contracts',
              ],
            },
            {
              sourceTag: 'type:application',
              onlyDependOnLibsWithTags: ['type:application', 'type:domain'],
            },
            {
              sourceTag: 'type:infrastructure',
              onlyDependOnLibsWithTags: ['type:infrastructure', 'type:application', 'type:domain'],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:api', 'type:application', 'type:domain'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:domain'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'type:shell',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: [
                'type:util',
                'type:domain',
                'type:contracts',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
