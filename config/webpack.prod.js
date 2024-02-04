const { merge } = require("webpack-merge");
const baseConfig = require("../webpack.base.js");
const { resolve } = require("path");

module.exports = merge(baseConfig, {
  mode: "production", // 开发模式,打包更加快速,省了代码优化步骤
  devtool: "source-map",
  output: {
    path: resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name]-[contenthash].js",
    chunkFilename: "static/js/[name]-[contenthash].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[contenthash][ext]", // 图片、字体等资源命名方式（注意用contenthash）
    clean: true,
  },
});
