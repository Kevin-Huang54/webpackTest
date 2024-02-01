const { merge } = require("webpack-merge");
const baseConfig = require("../webpack.base.js");
const { resolve } = require("path");

module.exports = merge(baseConfig, {
  mode: "production", // 开发模式,打包更加快速,省了代码优化步骤
  output: {
    path: resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "js/[name].js",
    clean: true,
  },
});
