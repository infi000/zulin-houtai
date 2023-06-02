/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-13 11:32:03
 * @Description: dev webpack config
 */
const cosmosCliService = require('cosmos-builder-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { DefinePlugin } = require('webpack');
const { resolve } = require('path');
const baseConfig = require('../../src/configs/base.conf');
const { buildConf, merge } = cosmosCliService;
// const defaultConf = cosmosCliService.;

const conf = {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        PROJECT_ENV: JSON.stringify(process.env.PROJECT_ENV),
      },
    }),
  ],
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-cheap-module-source-map',
};

module.exports = merge(buildConf.dev, conf);
