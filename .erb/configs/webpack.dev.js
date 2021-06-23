const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const apiMocker = require('mocker-api');
const path = require('path')
const Dotenv = require('dotenv-webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = merge(baseConfig, {
  devtool: 'inline-cheap-module-source-map',

  devServer: {
    port: '3001',
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
      },      
    },
    onBeforeSetupMiddleware({app}){
      apiMocker(app, path.resolve('./mock/mocker.js'))
    }
  },

  plugins: [
    new Dotenv({
      defaults: path.resolve(__dirname, './.env'),
      path: path.resolve(__dirname, './.env.development')
    }),

  ]
})

module.exports = smp.wrap(config)