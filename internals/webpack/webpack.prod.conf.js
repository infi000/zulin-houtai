/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-03-23 21:39:42
 * @Description: dev webpack config
 */
const cosmosCliService = require('cosmos-builder-webpack');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const webpack = require('webpack');
const buildVersion = require('../scripts/buildVersion.js');

const baseConfig = require('../../src/configs/base.conf');
const {
  buildConf,
  serverConf,
  merge
} = cosmosCliService;

const conf = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PROJECT_ENV: JSON.stringify(process.env.PROJECT_ENV),
        BUILD_VERSION: JSON.stringify(buildVersion),
      },
    }),
    new GenerateJsonPlugin('static/buildVersion.json', {
      data: buildVersion,
      errmsg: '',
      errno: 0
    }),
  ],
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',
};

module.exports = merge(buildConf.build, conf);
