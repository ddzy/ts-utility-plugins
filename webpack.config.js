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
      title: '插件库测试'
    }),
    new cleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
};