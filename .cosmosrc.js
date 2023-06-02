/*
 * @Author: 李淳
 * @Date: 2020-07-01 18:05:52
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-02 13:33:23
 * @Description: file content
 */ 

const proxyTable = require('./src/configs/dev.proxy.conf');
const baseConfig = require('./src/configs/base.conf');

module.exports = {
  proxyTable,
  baseConfig,
}