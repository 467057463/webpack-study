const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const apiMocker = require('mocker-api');
const path = require('path')

module.exports = merge(baseConfig, {
  devtool: 'inline-cheap-module-source-map',

  devServer: {
    port: '3000',
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
  }
})