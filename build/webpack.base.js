const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'), // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件夹的绝对路径,__dirname指当前文件所在的目录
    filename: '[name].[chunkhash].js', // 输出的文件名
    clean: true, // build前删除原有文件夹
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  module: {
    rules: [{
      test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
      use: {
        loader: 'babel-loader',
        options: {
          // 预设执行顺序由右往左,所以先处理ts,再处理jsx
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        }
      }
    }]
  },
  plugins: [
    // 打包html文件，同时生成的html中会引用main.js
    new HtmlWebpackPlugin({ template: '../public/index.html' })
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  }
}
