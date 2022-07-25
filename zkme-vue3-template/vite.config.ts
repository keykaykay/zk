import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Pages(),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core', 'pinia'],
      dts: 'src/types/auto-import.d.ts'
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: 'src/types/vue-components.d.ts'
    }),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          warn: true
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
      '#/': `${resolve(__dirname, 'src/types')}/`
    }
  },
  server: {
    host: '0.0.0.0',
    open: true
  }
})
