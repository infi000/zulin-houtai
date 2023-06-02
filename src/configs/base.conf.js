/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-23 14:45:08
 * @Description: 项目基础配置
 */

const baseTableConf = {
  pageSize: 25,
  showTotal: total => `总计 ${total} 条`,
  pageSizeOptions: ['25', '50', '100']
};

const i18nConf = {
  enable: true,
  defaultLocale: 'zh-CN',
  locales: ['zh-CN', 'en-US'],
  cookieName: 'lang',
};

module.exports = {
  name: 'Cosmos',
  entrance: '/homePage',
  // iconfont项目，如若需要权限，联系李淳
  // https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1870095
  aliIconFontSourceURL: 'http://at.alicdn.com/t/font_1870095_pb7glcp5fgc.js',
  iconFontScriptURL: '/static/js/iconfont.js',
  baseTableConf,
  i18nConf,
};
