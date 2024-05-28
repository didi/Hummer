const path = require('path')
const WrapFunctionPlugin = require('./generateFunction')
const HarmonyTemplatePlugin = require('./generateHarmonyTemplate')
const Hummer2DistFilePlugin = require('./hm2.plugin')

module.exports = {
  type: 'hummer',
  webpack: {
    // entries: "src/*/index.ts",
    entries: "src/*.js",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    },

    plugins: [
      // new WrapFunctionPlugin({
      //   wrapFunction: 'renderFunc'
      // }),
      // new HarmonyTemplatePlugin({
      //   outputDir:  './template',
      //   hummerApiDir: path.resolve(__dirname, './dist')
      // }),
      new Hummer2DistFilePlugin({
        hummer2: true
      })
    ]
  },

  devTool: {
    devServerPort: 8020, // 静态资源服务端口
    webServerPort: 8021  // web模拟器服务端口
  },
}