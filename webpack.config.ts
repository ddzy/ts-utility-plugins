import * as path from 'path';

import htmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';


export default {
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
        test: /\.(ts|js)?$/,
        use: 'babel-loader',
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
    open: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'ts插件库测试',
      template: './assets/template/index.ejs',
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
};