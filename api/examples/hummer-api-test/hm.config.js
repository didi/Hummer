const path = require('path')
const WrapFunctionPlugin = require('./generateFunction')
const HarmonyTemplatePlugin= require('./generateHarmonyTemplate')

module.exports = {
  type: 'hummer',
  webpack: {
    // entries: "src/*/index.ts",
    entries: "src/*.js",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    },

    // devTool: {
    //   devServerPort: 8002, // 静态资源服务端口
    //   webServerPort: 8004  // web模拟器服务端口
    // },

    plugins: [
      // new WrapFunctionPlugin({
      //   wrapFunction: 'renderFunc'
      // }),
      // new HarmonyTemplatePlugin({
      //   outputDir:  './template',
      //   hummerApiDir: path.resolve(__dirname, './dist')
      // }),
    ]
  }
}