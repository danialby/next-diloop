import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [tsconfigPaths(), react(),svgr({
  svgrOptions: {
    ref: true,
    svgo: false,
    titleProp: true,
    exportType: 'named',
  },
  include: '**/*.svg',
})],
  test: {
    environment: 'jsdom',
   // globals:true,
    //  setupFiles: ["./src/__tests__/testUtils/setupTests.js"],
  },
  resolve: {
      alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      // {
      //   find: /\.svg$/,
      //   replacement: path.resolve(__dirname, './src/__tests__/testUtils/SvgTransformMock.js'),
      // },
    ],
    //    alias: {
    //     '@': path.resolve(__dirname, './src'),
    //       '\\.svg$': path.resolve(__dirname, './src/__tests__/testUtils/SvgTransformMock.js'),
    // },
  },
})
