import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('last 2 versions')),
    },
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    // VueRouter(),

    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        // VueRouterAutoImports,
        {
          'naive-ui': ['useMessage'],
        },
      ],
      resolvers: [NaiveUiResolver()],
      dts: true,
      vueTemplate: true,
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      resolvers: [NaiveUiResolver()],
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCss(),
    Icons({ compiler: 'vue3' }),
  ],
})
