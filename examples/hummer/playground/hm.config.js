const path = require('path')
module.exports = {
  type: 'hummer',
  webpack: {
    entries: "src/*/index.ts",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    },
    plugins: []
  }
}