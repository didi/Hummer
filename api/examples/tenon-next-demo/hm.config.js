const path = require('path')
const HarmonyPagePlugin= require('@didi/harmony-page-generator')
const HarmonyRenderFunctionPlugin= require('@didi/harmony-render-function-generator')
module.exports = {
  type: 'tenon',
  webpack: {
    entries: "src/*/entry.js",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    },
    plugins: [
      new HarmonyRenderFunctionPlugin({
        wrapFunction: 'renderFunc'
      }),
      new HarmonyPagePlugin({
        outputDir:  './template',
        hummerApiDir: path.resolve(__dirname, './dist')
      }),
    ]
  },
  buildOptions: {
    tenonLoaderOptions: {
      compilerOptions: {
        runtimeModuleName: "@didi/tenon-vue-next"
      }
    },
    tenonStyleLoaderOptions: {
      packageName:  "@didi/tenon-vue-next"
    }
  }
}
