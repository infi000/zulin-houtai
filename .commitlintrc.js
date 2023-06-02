/*
 * @Author: your name
 * @Date: 2021-02-01 11:43:09
 * @LastEditTime: 2021-02-09 11:36:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/.commitlintrc.js
 */

const { types } = require('./.cz-config.js');
const ruleTypes = types.map(item => item.value);
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 50],
    'body-max-length': [2, 'always', 72],
    'footer-max-length': [2, 'always', 72],
    'type-enum': [2, 'always', [...ruleTypes]],
  },
};
