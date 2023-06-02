/*
 * @Author: 张宁
 * @Date: 2020-08-07 00:13:47
 * @LastEditTime: 2020-08-07 00:46:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/internals/scripts/plopGenerate.js
 */
const plopAction = require('sofa-cosmos/lib/generators/index');

plopConfig = (plop) => {
    // 做一些其他扩展
    plopAction(plop);
}

module.exports = plopConfig;
