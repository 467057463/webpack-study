const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require('dotenv-webpack');


const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config =  merge(baseConfig, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[fullhash:6].css'
    }),
    new BundleAnalyzerPlugin(),
    new Dotenv({
      defaults: path.resolve(__dirname, './.env'),
      path: path.resolve(__dirname, './.env.production')
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new CompressionPlugin()
    ]
  }
})

// module.exports = smp.wrap(config)
module.exports = config