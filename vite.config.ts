import react from '@vitejs/plugin-react'
import path from 'path'
import postCssPxToViewport from 'postcss-px-to-viewport'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 让手机可以 ip 访问
    port: 5174,
    open: true, // 自动打开浏览器
    cors: true, // 打开跨域
  },
  plugins: [react()],
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
})
