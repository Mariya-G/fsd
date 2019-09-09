// basic vars
const path = require('path')
const webpack = require('webpack')

//additional plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin')

const PAGES_DIR = '${PATHS.SRC}/pug/pages'
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin');

//module settings
// обращение к объекту Модуль:
module.exports = {
  // точки входа js
  entry: './src/app/index.js',
  // точки выхода
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
    devServer: {
      contentBase: './src/public',
      compress: true,
      port: 9000
  },
  module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.pug$/,
          use: 'pug-loader'
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }, 
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader'
          ]

        }
      ]
        },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/app/index.pug')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: `assets/images` },
      { from: 'src/fonts', to: `assets/fonts` },
    ]),
  ]
} 