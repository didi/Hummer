const path = require('path')
module.exports = {
  type: 'tenon',
  webpack: {
    entries: "src/*/entry.js",
    resolve: {
      alias: {
        "@common": path.join(__dirname, './src/common')
      }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    }
  }
}