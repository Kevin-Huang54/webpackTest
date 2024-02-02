const { merge } = require("webpack-merge");
const baseConfig = require("../webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  devtool: "cheap-module-source-map",
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    // open: true, // 是否自动打开浏览器
  },
});
