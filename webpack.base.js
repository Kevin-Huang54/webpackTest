const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { cpus } = require("os");

// cpu核数
const threads = cpus().length;
module.exports = {
  entry: {
    main: "./src/main.js",
  },
  module: {
    rules: [
      // {
      // oneOf每个文件只能被一个loader处理，只要命中一个文件名，就不再看后面的
      // 实际测试下来并没有什么用，需要使用大项目进一步测试
      // oneOf: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "thread-loader", // 开启多进程
            options: {
              workers: threads, // 数量
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g)/,
        type: "asset",
      },
      // ],
      // },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, "./src"),
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache",
      ),
      threads, // 开启多进程
    }),
    new MiniCssExtractPlugin({ filename: "static/css/main.css" }),
  ],
};
