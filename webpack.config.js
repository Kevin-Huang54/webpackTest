const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件夹的绝对路径,__dirname指当前文件所在的目录
    filename: 'main.js' // 输出的文件名
  }
}