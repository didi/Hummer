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
    plugins: [
      new WrapFunctionPlugin({
        wrapFunction: 'renderFunc'
      }),
      new HarmonyTemplatePlugin({
        outputDir: path.resolve(__dirname, './template'),
        hummerApiDir: path.resolve(__dirname, './dist')
      }),
    ]
  }
}