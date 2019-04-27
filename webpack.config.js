const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.html?$/,
        use: 'html-loader',
      },
      {
        test: /.ejs?$/,
        use: 'ejs-loader',
      }
    ],
  },
  devServer: {
    contentBase: './lib',
    hot: true,
    port: 3000,
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'ts插件库测试',
      template: './sources/template/index.ejs',
    }),
    new cleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
};