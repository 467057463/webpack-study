const webpack = require('webpack');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const config = require(`./config/${isDev ? 'dev' : 'prod'}.js`)

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: isDev ? "development" : "production",
  
  entry: {
    index: './src/index.js',
  },
  output:{
    path: path.resolve(__dirname, 'dist'), 
    filename: 'index.[chunkhash:6].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.jsx', '.js', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(s)?css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: "sass-loader",
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets' 
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack babel study reop',
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: false
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/static',
          to: 'static'
        }
      ]
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[hash:6].css'
    }),
    new webpack.DefinePlugin(config)
  ],
  
}