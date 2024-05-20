import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx"
import path, { resolve } from 'path';
import dts from 'vite-plugin-dts';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import terser from '@rollup/plugin-terser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      include: ['packages/**/*']
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './packages')
    }
  },
  build: {
    outDir: 'dist',
    lib: { // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
      formats: ['es'],
      // __dirname 的值是 vite.config.ts 文件所在目录
      entry: resolve(__dirname, 'packages', 'index.ts'),  // entry 是必需的，因为库不能使用HTML作为入口。
      name: 'MsBpmnJs', // 暴露的全局变量
      fileName: 'index' // 输出的包文件名，默认是 package.json 的 name 选项
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: { // 自定义底层的Rollup打包配置
      plugins: [
        terser()
      ],
      external: ['vue', 'element-plus'],
      output: {
        name: 'MsBpmnJs',
        exports: 'named',
        externalLiveBindings: false,
        globals: {
          vue: 'Vue',
          "element-plus": "ElementPlus"
          // },
          // chunkFileNames: 'js/[name]-[hash].js',  // 引入文件名的名称
          // entryFileNames: '[name].js',  // 包的入口文件名称
          // assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          // inlineDynamicImports: false,
          // manualChunks (id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
          //   }
        }
      }
    },
    reportCompressedSize: false,
  }
})
