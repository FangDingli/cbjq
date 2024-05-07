import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        'node_modules',
        'dist',
        '.git',
        '.husky',
        '.vscode',
        'public',
        'build',
        'mock',
        './stats.html',
      ],
    },
  },
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
    },
  ],
  rules: [],
  theme: {},
  presets: [presetUno(), presetAttributify()],
})
