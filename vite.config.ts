import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import UnoCss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

export default defineConfig({
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
  server: {
    port: 3000,
    proxy: {
      '/devServer': {
        target: 'https://www.qiyuanyuan.live/bwgapiproxy/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/devServer/, ''),
      },
    },
    fs: {
      strict: false,
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
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
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
