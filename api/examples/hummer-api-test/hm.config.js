const path = require('path')
const WrapFunctionPlugin = require('./generateFunction')
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
      })
    ]
  }
}