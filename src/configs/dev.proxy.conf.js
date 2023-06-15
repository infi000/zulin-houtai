/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-03-27 17:35:05
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-15 00:13:33
 * @FilePath: /ot-resources/src/configs/dev.proxy.conf.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const dev= 'http://dev.tangguostore.com/';
const mock = 'http://easy-mock.sftcwl.com/mock/647f4ca88988f273dfbd7b8e/zl';
module.exports = {
  // 获取用户信息
  // '/index.php/AdminApi/Lease/orderdetail': mock,
  '/index.php/AdminApi': dev
};
