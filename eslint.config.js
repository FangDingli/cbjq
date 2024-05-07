import { sxzz } from '@sxzz/eslint-config'

export default sxzz(
  {
    rules: {
      'prettier/prettier': 'off',
      'unicorn/prefer-query-selector': 'off',
      'no-restricted-syntax': 'off',
      'prefer-template': 'off',
      'unicorn/explicit-length-check': 'off',
      'no-console': 'off',
      'import/no-default-export': 'off',
      'vue/html-self-closing': 'off',
    },
    ignores: [
      '*.sh',
      'node_modules',
      '*.woff',
      '.vscode',
      '.idea',
      '/public',
      '/docs',
      '.local',
      '/bin',
      'Dockerfile',
    ],
  },
  { vue: true, prettier: true, markdown: true, unocss: false },
)
