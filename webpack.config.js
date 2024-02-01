const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    iconfont: './src/iconfont.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'js/[name]-[contenthash].js',
    filename: 'js/[name].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpe?g)/,
        type: 'asset',
      },{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html')
  })]
}
