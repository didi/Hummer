const path = require('path')
const WrapFunctionPlugin = require('./generateFunction')
const HarmonyTemplatePlugin = require('./generateHarmonyTemplate')

module.exports = {
  type: 'hummer',
  webpack: {
    // entries: "src/*/index.ts",
    entries: "src/*.js",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name]hummer2Tenon.js"
    },
    externals: {
      '@hummer/hummer-front': '__GLOBAL__',
      '@didi/hummer-front': '__GLOBAL__',
      "@didi/hummer-api": '__GLOBAL__',
      "@didi/djdriver-base": '__GLOBAL__',
      "./../../../../api/packages/hummer-api/dist/hummer-api.es":'__GLOBAL__',
      "../../../../api/packages/hummer-api/dist/hummer-api.es":'__GLOBAL__',
    },

    plugins: [
      // new WrapFunctionPlugin({
      //   wrapFunction: 'renderFunc'
      // }),
      // new HarmonyTemplatePlugin({
      //   outputDir:  './template',
      //   hummerApiDir: path.resolve(__dirname, './dist')
      // }),
    ]
  },
  buildOptions: {
    cleanDist: false,
  },
  devTool: {
    enableServer: false,
    // devServerPort: 8020, // 静态资源服务端口
    // webServerPort: 8021  // web模拟器服务端口
  }
}