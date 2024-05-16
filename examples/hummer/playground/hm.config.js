const path = require('path')
module.exports = {
  type: 'hummer',
  webpack: {
    entries: "src/**/index.ts",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js"
    },
    plugins: []
  },
  devTool: {
    devServerPort: 8030, // 静态资源服务端口
    webServerPort: 8031  // web模拟器服务端口
  },
}