const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    index: './src/index.jsx',
    // modules: './src/modules.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件夹的绝对路径,__dirname指当前文件所在的目录
    filename: '[name].[chunkhash].js', // 输出的文件名
    clean: true, // build前删除原有文件夹
  },
  module: {
    rules: [{
      test: /.(jsx)$/, // 匹配.ts, tsx文件
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
          ]
        }
      }
    }]
  },
  plugins: [
    // 打包html文件，同时生成的html中会引用main.js
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
