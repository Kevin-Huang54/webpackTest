const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件夹的绝对路径,__dirname指当前文件所在的目录
    filename: 'main.js' // 输出的文件名
  },
  module: {
    rules: []
  },
  plugins: [
    // 打包html文件，同时生成的html中会引用main.js
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
}
