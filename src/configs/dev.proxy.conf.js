/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-03-27 17:35:05
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-29 17:10:33
 * @FilePath: /ot-resources/src/configs/dev.proxy.conf.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const yapi = 'http://yapi.sftcwl.com/mock/2303/';
const uat = 'https://tsic.sftcwl.com.cn/';
const online = 'https://ts-rmp.sf-express.com/';
const weihong = 'http://10.189.72.160:8403/';
const shaobo = 'http://10.189.65.25:8777';
const kangli = 'http://10.189.72.130:8777';
const shaobo2 = 'http://10.98.0.89:8555/';
const cos_dev = 'http://10.189.72.130:8522/';
const target = online;
const cos_target = cos_dev;
module.exports = {
  // 获取用户信息
  '/tsResource': weihong,
  // '/tsResource': target,
  '/excel':cos_target,
  '/cos/getUploadSigned':cos_target,
  '/cos/getDownloadSigned':cos_target,
  '/20230209':'https://ts-bms-1254389369.cos.ap-guangzhou.myqcloud.com/',
  '/20230210':'https://ts-bms-1254389369.cos.ap-guangzhou.myqcloud.com/',
  // '/cos-api/cos/getUploadSigned': {
  //   target: 'http://10.189.72.130:8522/',
  //   pathRewrite: { '^/cos-api': '' },
  // },
  // '/cos-myqcloud/': {
  //   target: 'https://ts-bms-1254389369.cos.ap-guangzhou.myqcloud.com/',
  //   pathRewrite: { '^/cos-myqcloud': '' },
  // },
};
