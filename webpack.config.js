const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'), // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件夹的绝对路径,__dirname指当前文件所在的目录
    filename: '[name].[contenthash].js', // 输出的文件名
    clean: true, // build前删除原有文件夹
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  stats: {
    chunks: true,
    chunkModules: true,
    modules: true,
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/, // 匹配 .css 和 .scss 文件
        use: [
          MiniCssExtractPlugin.loader, // 将 CSS 抽取到单独文件
          {
            loader: 'css-loader', // 解析 CSS 文件
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]', // 保留原始类名并添加哈希值
              },
            },
          },
          'sass-loader', // 编译 SCSS 到 CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true, // 自动注入静态资源
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    // new DashboardPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'], // import 不需要扩展名
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 按需分割所有模块
      // minSize: 20000, // 单个模块大于20KB时才会分割
      // maxSize: 70000, // 单个模块最大为70KB
      // minChunks: 1, // 如果模块被引用多次，则提取该模块
      // maxAsyncRequests: 30, // 最大并发请求数
      // maxInitialRequests: 30, // 最大初始化请求数
      // automaticNameDelimiter: '-', // 自动生成的名称连接符
      // name: true, // 自动生成分割后的文件名
    },
  },
};
