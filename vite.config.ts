import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path'
import postCssPxToViewport from 'postcss-px-to-viewport'
import { splitVendorChunkPlugin } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 让手机可以 ip 访问
    port: 5174,
    open: true, // 自动打开浏览器
    cors: true, // 打开跨域
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    // 传统浏览器可以通过插件 @vitejs/plugin-legacy 来支持，
    // 它将自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill。
    // 兼容版的 chunk 只会在不支持原生 ESM 的浏览器中进行按需加载。
    legacy({
      targets: ['defaults'],
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js', //代码块文件名
        entryFileNames: 'assets/js/[name]-[hash].js', //入口文件名
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 资源文件名
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src'),
      },
    ],
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI 设计稿的宽度
          unitPrecision: 3, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的 css 属性单位， * 代表全部 css 属性
          viewportUnit: 'vw', // 指定需要转换成的视窗单位, 默认为 vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认为 vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类
          minPixelValue: 1, // 默认值 1，小于或等于 1px 则不进行转换
          mediaQuery: true, // 是否在媒体查询的 css 代码中也转换，默认为 false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录
          exclude: [],
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
